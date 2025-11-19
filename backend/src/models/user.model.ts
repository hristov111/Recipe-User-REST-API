import mongoose, {Schema, Document, Model,Types} from "mongoose";


export interface IUser extends Document{
    _id: Types.ObjectId,
    username:string,
    email:string,
    password:string,
    createdAt: Date,
    updateAt: Date,
}


const UserSchema : Schema<IUser> = new Schema(
    {
        username: {type:String, required:true},
        email: {type:String, required:true},
        password: {type:String, required:true},
    },
    {
        timestamps:true,
    }
)

export const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

