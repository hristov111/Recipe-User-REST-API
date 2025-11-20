import { Request, Response, NextFunction } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";
import { decode } from "punycode";

interface DecodedToken extends JwtPayload {
  id: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(401).json({ message: "jwt expired" });

    const token = authHeader.split(" ")[1]!;

    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) {
      console.error("JWT_ACCESS_SECRET is not set");
      return res.status(500).json({ message: "Server config error" });
    }
    const decoded = jwt.verify(token, secret);
    if (!decoded || typeof decoded === "string") {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    const { id } = decoded as DecodedToken;
    if (!id) {
      return res.status(401).json({ message: "Invalid Token payload" });
    }
    console.log(id);
    req.userId = id;

    return next();
  } catch (error) {
    return res.status(500).json({ message: `Internal server error: ${error}` });
  }
};
