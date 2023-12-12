import mongoose from 'mongoose';
import { config } from "dotenv";
config();
async function connectDB() : Promise<void> {

    if(!process.env.MONGO_URI) throw new Error("no uri")
    const uri: string  = process.env.MONGO_URI;

    try{

        await mongoose.connect(uri)
        console.log(`Successfully connected to db`);
    }   
    catch(err){
        console.log(`Faild to connect to db, ${err}`);
        process.exit(1);
    }
    
}


export default connectDB;