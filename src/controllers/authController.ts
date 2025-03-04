

import { Request, response, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from "jsonwebtoken";
import { HydratedDocument } from 'mongoose';

import User, { IUser, UserRole } from "../models/User";
import { errorResponse, successResponse, validationErrorResponse } from "../utils/Messages";
const jwtSecret: string = process.env.JWT_SECRET as string || "kawsarfiroz";






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
                    // password: hashedPassword,
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


    // Login functionality
    public async LoginUser(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body;
            if (!email) {
                 res.status(400).json(validationErrorResponse("email", "User Not found please Register"));
                return
                }  
            const user: HydratedDocument<IUser> | null = await User.findOne({ email });
            if (!user || !user._id) {
                res.status(404).json(validationErrorResponse("user", "User not found, please register"));
            return
            }
            const jwtOptions: SignOptions = {
                expiresIn: "1h",
            };
            const userInfo = {
                ...user
            } 
            const token: string = jwt.sign(userInfo, jwtSecret, jwtOptions);
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            });

            res.status(200).json(successResponse(200, "User Login succefully", {user, token}));

        } catch (err) {
            console.log(err)
            res.status(500).json(errorResponse(500, "Internal Server Error", err));
        }
    }
    
}



const auth = new UserController();
export const createUser = auth.createUser.bind(auth); 
export const LoginUser = auth.LoginUser.bind(auth); 

