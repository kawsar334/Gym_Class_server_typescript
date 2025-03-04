

import { Request, Response, NextFunction } from "express";
import Jwt ,{JwtPayload}  from "jsonwebtoken";
import { unauthorizedResponse } from "../utils/Messages";

interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload;
}

export const authenticateJWT= (req:AuthenticatedRequest,res:Response, next:NextFunction)=>{
    const token = req.cookies?.token;
    if(!token){
        res.status(401).json(unauthorizedResponse("Access Denied: No Token Provided","authentication"))
        return;
    }
    
    try{
        const verified = Jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user= verified;
        console.log(req.user._doc?.role)
        if (req.user._doc?.role !== "trainee") {
            res.status(403).json({error: "Access Denied: You are Not authenticated"})
           
            return;
        }
        next();

    }catch(err){
        res.status(400).json(unauthorizedResponse("Invalid Token","authentication"))
        return ;
    }

}