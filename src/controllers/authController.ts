

import { Request, response, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { HydratedDocument } from 'mongoose';

import User, { IUser, UserRole } from "../models/User";
import { errorResponse, successResponse, validationErrorResponse } from "../utils/Messages";
const jwtSecret: string = process.env.JWT_SECRET as string;
interface JwtPayload {
    userId: string;
    name: string;
    email: string;
}

const options: {
    httpOnly: boolean;
    secure: boolean;
    sameSite: "strict" | "lax" | "none";
} = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
};


class UserController {
    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, name } = req.body
            const existUser = await User.findOne({ email: req.body.email });
            if (!req.body.password){
                res.status(400).json(validationErrorResponse("password", "password is required"));
            }
            if (!email) {
                res.status(400).json(validationErrorResponse("email", "Email is required"));
            }
            if (!name) {
                res.status(400).json(validationErrorResponse("name", "Name is required"));
            }
            if (existUser) {
                res.status(400).json(validationErrorResponse("email", "Email already exists"));
            }
            const salt = await bcrypt.genSalt(10); 
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const userInfo = new User(
                {
                    ...req.body,
                    role: UserRole.TRAINEE,
                    password: hashedPassword,
                }
            )
            const user = await userInfo.save();
            res.status(200).json(successResponse(200, "Registration succefully", user))

        } catch (err) {
            console.log(err)
            if (!res.headersSent) {
                res.status(500).json(errorResponse(500, "Internal Server Error", err));
            }
        }
    }

    public async LoginUser(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body;
            const user: HydratedDocument<IUser> | null = await User.findOne({ email });
          
            if (!email) { res.status(400).json(validationErrorResponse("email", "User Not found please Register"));}  
            if (!user || !user._id) {
                 res.status(404).json(validationErrorResponse("email", "User not found, please register"));
            }

            const tokenPayload = {
                user: (user as IUser)
            };
            const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn: '5h' });
             res.cookie(
                "token",
                token,
                options
            ).status(201).json({})
             res.cookie('auth_token', 'yourAuthTokenHere', {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 24 * 60 * 60 * 1000,
    });      
            res.status(200).json(successResponse(200, "User Login succefully", user));

        } catch (err) {
            res.status(500).json(errorResponse(500, "Internal Server Error", err));
        }
    }
}



const auth = new UserController();
export const createUser = auth.createUser.bind(auth); 
export const LoginUser = auth.LoginUser.bind(auth); 

