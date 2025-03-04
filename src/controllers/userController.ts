


import { Request, Response } from "express";

import User from "../models/User";
class UserController {



    public async getSingleUser(req:Request,res:Response):Promise<void>{
            try{
                const user = await User.find({});


                 res.json(user)
                return
            }catch(err){
                console.log(err)
               
            }
    };

}


const user = new UserController();


export const getSingleUser = user.getSingleUser.bind(user);

