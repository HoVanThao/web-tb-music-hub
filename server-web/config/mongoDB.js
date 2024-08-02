import mongoose from "mongoose";
import * as dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log("connection established")
    })

    await mongoose.connect(process.env.MONGO_URL);
}

export default connectDB;



