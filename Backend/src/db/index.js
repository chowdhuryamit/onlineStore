import mongoose from 'mongoose';
import {DB_NAME} from "../constants.js";

const connectionDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("mongodb connected successfully.Db_host:",connectionInstance.connection.host);
    } catch (error) {
        console.log("mongodb connection error:",error);
    }
}

export default connectionDB;