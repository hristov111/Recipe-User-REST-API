import { UserModel, IUser } from "../models/user.model";
import bcrypt from "bcrypt";


interface CreateUserInput {
    username:string,
    email:string,
    password:string,
}

export const getUsersService = async(): Promise<IUser[]> => {
    return UserModel.find().exec();
}

export const createUserService = async(data:CreateUserInput): Promise<IUser|null> => {
    // dont go with a duplicate email
    const existingUser= await UserModel.findOne({email:data.email}).exec();
    if(existingUser) return null;
    const hashedpassword = bcrypt.hash(data.password,10);
    return UserModel.create({
        ...data,
        password:hashedpassword
    });
}

export const getUserByIdService = async(id:number): Promise<IUser | null> => {
    return UserModel.findById(id).exec();
}
export const deleteUserByIdService = async(id:number): Promise<IUser | null> => {
    return UserModel.findByIdAndDelete(id).exec();
}


export const LoginService = async(data:{email:string, password:string}): Promise<IUser | null> => {
    const user =await UserModel.findOne({email:data.email}).exec();
    if(!user)return null;   
    const isMatch = await bcrypt.compare(data.password,user.password);
    if(!isMatch)return null;
    return user;
}


