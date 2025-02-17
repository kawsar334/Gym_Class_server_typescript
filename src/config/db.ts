import { Schema, model, } from 'mongoose';

import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;


const MONGOURI: string ="mongodb+srv://kawsar:kawsar@cluster0.qbufs.mongodb.net/"

class Database {
    private mongouri:string;    

    constructor(){
        this.mongouri = MONGOURI;
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