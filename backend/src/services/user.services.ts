import { UserModel, IUser } from "../models/user.model";
import bcrypt from "bcrypt";

interface CreateUserInput {
  username: string;
  email: string;
  password: string;
}

export const getUsersService = async (): Promise<IUser[]> => {
  return UserModel.find().exec();
};

export const createUserService = async (
  data: CreateUserInput
): Promise<IUser | null> => {
  // dont go with a duplicate email
  const existingUser = await UserModel.findOne({ email: data.email }).exec();
  if (existingUser) return null;
  const hashedpassword = await bcrypt.hash(data.password, 10);
  return UserModel.create({
    ...data,
    password: hashedpassword,
  });
};

export const getUserByIdService = async (
  id: string
): Promise<{ username: string; email: string } | null> => {
  const user = await UserModel.findById(id).exec();
  if (!user) return null;
  return { username: user.username, email: user.email };
};
export const deleteUserByIdService = async (
  id: number
): Promise<IUser | null> => {
  return UserModel.findByIdAndDelete(id).exec();
};

export const LoginService = async (data: {
  email: string;
  password: string;
}): Promise<IUser | null> => {
  const user = await UserModel.findOne({ email: data.email }).exec();
  if (!user) return null;
  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) return null;
  return user;
};

export const partiallyUpdateUserService = async (
  data: any,
  userId: string
): Promise<IUser | null> => {
  const updates: Partial<IUser> = {};
  if (typeof data.username === "string") {
    const user = await UserModel.exists({
      username: data.username,
      _id: { $ne: userId },
    });
    if (user) return null;
    updates.username = data.username;
  }
  if (typeof data.email === "string") {
    const user = await UserModel.exists({
      email: data.email,
      _id: { $ne: userId },
    });
    if (user) return null;
    updates.email = data.email;
  }
  if (typeof data.password === "string") {
    updates.password = await bcrypt.hash(data.password, 10);
  }
  if (!Object.keys(updates).length) {
    return null;
  }

  return UserModel.findByIdAndUpdate(
    userId,
    { $set: updates },
    { new: true, runValidators: true }
  ).exec();
};
