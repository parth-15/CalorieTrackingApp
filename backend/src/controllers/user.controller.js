import userService from '../services/user.service';
import bcrypt from 'bcrypt';

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await userService.list();

      res.status(200).json({ success: true, data: users });
    } catch (e) {
      console.error(e);
      res.status(500).json({ success: false, error: 'Something went wrong' });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await userService.readById(req.params.userId);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: 'User does not exist' });
      }

      res.status(200).json({ success: true, data: user });
    } catch (e) {
      console.error(e);
      res.status(500).json({ success: false, error: 'Something went wrong' });
    }
  }

  async createUser(req, res) {
    try {
      const userByEmail = await userService.findByEmail(req.body.email);
      if (userByEmail) {
        return res.status(400).json({
          success: false,
          error: 'User with this email already exist',
        });
      }
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
      if (req.body.password)
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
      const userId = await userService.create(req.body);
      res.status(201).json({ success: true, data: { id: userId } });
    } catch (e) {
      console.error(e);
      res.status(500).json({ success: false, error: 'Something went wrong' });
    }
  }

  async updateUserById(req, res) {
    try {
      const user = await userService.readById(req.params.userId);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: 'User does not exist' });
      }
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);

      if (req.body.password)
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);

      await userService.putById(req.params.userId, req.body);
      res.status(204).json({});
    } catch (e) {
      console.error(e);
      res.status(500).json({ success: false, error: 'Something went wrong' });
    }
  }

  async removeUser(req, res) {
    try {
      const user = await userService.readById(req.params.userId);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: 'User does not exist' });
      }

      await userService.deleteById(req.params.userId);
      res.status(204).json({});
    } catch (e) {
      console.error(e);
      res.status(500).json({ success: false, error: 'Something went wrong' });
    }
  }
}

export default new UserController();
