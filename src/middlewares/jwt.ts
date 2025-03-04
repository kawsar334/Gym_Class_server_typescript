

import { Request, Response, NextFunction } from "express";
import Jwt ,{JwtPayload}  from "jsonwebtoken";
import { unauthorizedResponse } from "../utils/Messages";

interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload;
};


// verify Login user
export const authenticateJWT= (req:AuthenticatedRequest,res:Response, next:NextFunction)=>{
    const token = req.cookies?.token;

    if(!token){
        res.status(401).json(unauthorizedResponse("Access Denied: No Token Provided","authentication"))
        return;
    };    
    try{
        const verified = Jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user= verified;
        // if (req.user._doc?.role !== "trainee") {
        if (!req.user._doc) {
            res.status(403).json({error: "Access Denied: You are Not authenticated"})
            return;
        }
        next();

    }catch(err){
        res.status(400).json(unauthorizedResponse("Invalid Token","authentication"))
        return ;
    }

}



// verify admin

export const authenticatedADMIN = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;
    if (!token) {
        res.status(401).json(unauthorizedResponse("Access Denied: No Token Provided", "authentication"))
        return;
    };
    try {
        const verified = Jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = verified;
        if (req.user._doc?.role !== "admin") {
            res.status(403).json({ error: "Access Denied: Only Admin can access " })
            return;
        }
        next();

    } catch (err) {
        res.status(400).json(unauthorizedResponse("Invalid Token", "authentication"))
        return;
    }

}




// verify trainer
export const authenticatedTRAINER = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if (!token) {
        res.status(401).json(unauthorizedResponse("Access Denied: No Token Provided", "authentication"))
        return;
    };
    try {
        const verified = Jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = verified;
        if (req.user._doc?.role !== "trainer") {
            res.status(403).json({ error: "Access Denied:Only traner can access " })
            return;
        }
        next();

    } catch (err) {
        res.status(400).json(unauthorizedResponse("Invalid Token", "authentication"))
        return;
    }

}