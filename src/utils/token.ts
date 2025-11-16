import jwt from "jsonwebtoken";

export const generateAccessToken = (userId:string) => {
    return jwt.sign({id: userId}, process.env.JWT_ACCESS_SECRET!,{
        expiresIn:process.env.JWT_ACCESS_EXPIRES,
    });
};