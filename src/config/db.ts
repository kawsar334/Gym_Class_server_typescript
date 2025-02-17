import { Schema, model, } from 'mongoose';

import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URL as string;




class Database {
    private mongouri:string;    

    constructor(){
        this.mongouri = MONGO_URI;
    }
    public async connect():Promise<void>{
        try{
         await mongoose.connect(this.mongouri, {});
         console.log("db connection successfull, ");
        }catch(err){
            console.error("something went wrong on db", err);
            process.exit(1);
        }
    }
}

const db = new Database();

export default db