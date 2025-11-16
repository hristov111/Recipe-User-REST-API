import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config()

const MONGO_URI = process.env.MONGO_URI as string;

if(!MONGO_URI){
    throw new Error("Database connection not defined");
}
export const connectDB = async () =>{
    try{
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");
    }catch(error){
        console.error("Couldnt connect to database");
        process.exit(1);
    }
}


