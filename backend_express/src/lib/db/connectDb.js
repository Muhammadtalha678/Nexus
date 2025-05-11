import {mongoose} from "mongoose";
import { env_config} from "../configs/env.config.js";

export const connectDb = async () => {
    try {
        await mongoose.connect(env_config.mongo_uri)
        console.log("Db connected Successfully");
    } catch (error) {
        console.log("error => ",error);
        process.exit(1)
    }
}