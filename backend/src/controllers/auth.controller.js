import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userService from "../services/user.service";
import { generate_token } from "../utils/token";

class AuthController {
  async signup(req, res) {
    try {
      const userByEmail = await userService.findByEmail(req.body.email);
      if (userByEmail) {
        return res.status(400).json({
          success: false,
          error: "User already exists with this email",
        });
      }
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
      const password = generate_token(6);
      req.body.password = await bcrypt.hash(password, saltRounds);
      req.body.token = generate_token(32);

      await userService.create({
        ...req.body,
        role: req.body.role || "user",
      });

      res.status(201).json({
        success: true,
        data: { token: req.body.token, password: req.body.password },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Something went wrong" });
    }
  }

  async login(req, res) {
    try {
      const userByToken = await userService.findByToken(req.body.token);
      if (!userByToken) {
        return res
          .status(401)
          .json({ success: false, error: "Authentication failed" });
      }

      res.status(200).json({ success: true, user: userByToken });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Something went wrong" });
    }
  }

  async me(req, res) {
    try {
      res.status(200).json({ success: true, user: req.user });
    } catch (err) {
      res.status(500).json({ success: false, error: "Something went wrong" });
    }
  }
}

export default new AuthController();
