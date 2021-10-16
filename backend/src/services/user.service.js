import User from "../models/user.model";
import { generate_token } from "../utils/token";
import mongoose from "mongoose";

class UserService {
  async list() {
    const users = await User.find({});
    return {
      rows: users,
    };
  }

  async readById(userId) {
    if (!mongoose.isValidObjectId(userId)) {
      return null;
    }
    const user = await User.findById(userId);
    return user;
  }

  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async findByToken(token) {
    const user = await User.findOne({ token });
    return user;
  }

  async create(userData) {
    const randomPassword = generate_token(6);
    const randomToken = generate_token(32);
    const user = new User({
      name: userData.name,
      email: userData.email,
      password: userData.password || randomPassword,
      maxCalories: userData.maxCalories || 2100,
      token: userData.token || randomToken,
      role: userData.role || "user",
    });
    const savedUser = await user.save();
    return savedUser.id;
  }

  async putById(userId, userData) {
    const randomPassword = generate_token(6);
    const randomToken = generate_token(32);
    const updatedUserId = await User.findByIdAndUpdate(
      userId,
      {
        name: userData.name,
        email: userData.email,
        password: userData.password || randomPassword,
        maxCalories: userData.maxCalories || 2100,
        token: userData.token || randomToken,
        role: userData.role,
      },
      { new: true }
    );
    return updatedUserId.id;
  }

  async deleteById(userId) {
    await User.findByIdAndDelete(userId);
    return userId;
  }
}

export default new UserService();
