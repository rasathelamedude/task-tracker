import mongoose from "mongoose";
import { CONNECTION_STRING } from "../config/env.js";

const connectToDatabase = async () => {
    await mongoose.connect(CONNECTION_STRING);

    console.log("Successfully connected to database!");
}

export default connectToDatabase;