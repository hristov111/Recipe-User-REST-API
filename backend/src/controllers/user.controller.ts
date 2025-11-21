import { Request, Response } from "express";
import {
  getUsersService,
  createUserService,
  deleteUserByIdService,
  getUserByIdService,
  LoginService,
  partiallyUpdateUserService,
} from "../services/user.services";
import { generateAccessToken, generateRefreshToken } from "../utils/token";
import { ref } from "process";

const isProduction = process.env.NODE_ENV === "production";

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getUsersService();
    return res.status(201).json(users);
  } catch (error) {
    return res.status(500).json({ message: `Internal server error:${error}` });
  }
};

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);
    const user = await createUserService({
      username,
      email,
      password,
    });
    if (!user) return res.status(400).json({ message: "Email already exists" });
    res.status(200).json({
      message: "User created",
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error:${error}` });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!req.userId || req.userId !== id)
      return res.status(401).json({ message: "Unauthorized" });

    const user = await deleteUserByIdService(parseInt(req.userId));
    if (!user) return res.status(400).json({ message: "User not found" });

    return res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error:${error}` });
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await getUserByIdService(req.userId);
    if (!user) return res.status(400).json({ message: "User not found" });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await LoginService({ email: email, password: password });
    if (!user) return res.status(400).json({ message: "User does not exist" });

    // make jwt token

    const access_token = generateAccessToken(user._id.toString());
    const refresh_token = generateRefreshToken(user._id.toString());

    res.cookie("refreshToken", refresh_token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60000,
    });

    return res.status(200).json({
      message: "Login Successfull",
      access_token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};

export const logOutUserController = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(200).json({ message: "Logged out" });
  }

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
  });
  return res.status(200).json({ message: "Logged Out" });
};

export const partiallyUpdateUserController = async (
  req: Request,
  res: Response
) => {
  const updates = req.body;

  try {
    const result = await partiallyUpdateUserService(updates, req.userId!);
    if (!result)
      return res
        .status(400)
        .json({ message: "Username or email already exitsts!" });
    return res.status(200).json({ message: "Successfully updated record" });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};
