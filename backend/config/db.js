import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({path: '../.env'});
const mongoURI = process.env.MONGO_URI;

const connectMongoose = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(mongoURI)
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.error("MongoDB connection error:", err));
};

export default connectMongoose;
