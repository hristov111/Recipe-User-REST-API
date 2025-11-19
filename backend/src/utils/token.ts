import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

const envPathCandidates = [
  path.resolve(process.cwd(), ".env"),
  path.resolve(__dirname, "../.env"),
  path.resolve(__dirname, "../../.env"),
];

const envPath = envPathCandidates.find((candidate) => fs.existsSync(candidate));

dotenv.config(envPath ? { path: envPath } : undefined);

const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

if (!accessSecret || !refreshSecret) {
  throw new Error("JWT secrets are not defined");
}

export const generateAccessToken = (userId: string) => {
  return jwt.sign(
    { id: userId },
    accessSecret,
    process.env.JWT_ACCESS_EXPIRES
      ? { expiresIn: process.env.JWT_ACCESS_EXPIRES }
      : undefined
  );
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign(
    { id: userId },
    refreshSecret,
    process.env.JWT_REFRESH_EXPIRES
      ? { expiresIn: process.env.JWT_REFRESH_EXPIRES }
      : undefined
  );
};
