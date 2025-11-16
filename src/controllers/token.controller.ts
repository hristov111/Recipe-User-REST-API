import { Request , Response} from "express";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/token";
import { decode } from "punycode";

export const refreshController = async (req:Request, res:Response) => {
    const token = req.cookies.refreshToken;

    if(!token){
        // here user is logged out from frontend
        return res.status(401).json({message: "Token expired"});
    }

    const secret = process.env.JWT_REFRESH_SECRET as string;

    try{
        const decoded = jwt.verify(token,secret);
        const {id} = decoded as {id:string};

        const newAccessToken = generateAccessToken(id);

        return res.status(200).json({access_token:newAccessToken});

    }catch(error){
        return res.status(500).json({message: `Internal Server Error:${error}`});
    }
}