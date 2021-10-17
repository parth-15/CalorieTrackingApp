import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import User from '../models/user.model';
import Meal from '../models/meal.model';

const seedAdmin = async () => {
  const adminName = process.env.DEFAULT_ADMIN_NAME;
  const adminEmail = process.env.DETAULT_ADMIN_EMAIL;
  const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD;
  const adminMaxCalories = process.env.DEFAULT_ADMIN_CALORIES;
  const adminToken = process.env.DEFAULT_ADMIN_TOKEN;
  const admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
    const passwordHash = await bcrypt.hash(adminPassword, saltRounds);
    await User.create({
      name: adminName,
      email: adminEmail,
      password: passwordHash,
      maxCalories: adminMaxCalories,
      token: adminToken,
      role: 'admin',
    });
  }
};

const seedUser = async () => {
  const userName = process.env.DEFAULT_USER_NAME;
  const userEmail = process.env.DETAULT_USER_EMAIL;
  const userPassword = process.env.DEFAULT_USER_PASSWORD;
  const userMaxCalories = process.env.DEFAULT_USER_CALORIES;
  const userToken = process.env.DEFAULT_USER_TOKEN;
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
    const passwordHash = await bcrypt.hash(userPassword, saltRounds);
    await User.create({
      name: userName,
      email: userEmail,
      password: passwordHash,
      maxCalories: userMaxCalories,
      token: userToken,
      role: 'user',
    });
  }
};

const seedMeals = async () => {
  const breakFastMeal = await Meal.findOne({ type: 'breakfast' });
  if (!breakFastMeal) {
    await Meal.create({
      type: 'breakfast',
      maxAllowed: 3,
    });
  }
  const lunchMeal = await Meal.findOne({ type: 'lunch' });
  if (!lunchMeal) {
    await Meal.create({
      type: 'lunch',
      maxAllowed: 5,
    });
  }
  const dinnerMeal = await Meal.findOne({ type: 'dinner' });
  if (!dinnerMeal) {
    await Meal.create({
      type: 'dinner',
      maxAllowed: 2,
    });
  }
};

const connectDb = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const applyDatabaseSetup = async () => {
  await connectDb();
  await seedAdmin();
  await seedUser();
  await seedMeals();
};

export default applyDatabaseSetup;
