import User from '../models/user.model';

class UserService {
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async findByToken(token) {
    const user = await User.findOne({ token });
    return user;
  }

  async create(userData) {
    const user = new User({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      maxCalories: userData.maxCalories || 2100,
      role: userData.role,
    });
    const savedUser = await user.save();
    return savedUser.id;
  }
}

export default new UserService();
