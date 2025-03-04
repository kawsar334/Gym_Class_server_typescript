
import { Request, Response } from "express";
import User from "../models/User";
import { errorResponse, successResponse } from "../utils/Messages";
import bcrypt from 'bcryptjs';
class UserController {
    public async updateUser(req: Request, res: Response): Promise<void> {
        try {
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json(successResponse(200, "User updated succesfully", user));
            return;
        } catch (err) {
            console.log(err)
            res.status(500).json(errorResponse(500, "Internal Server Error", err));
            return;
        }
    }

    // get all users
    public async getUsers(req: Request, res: Response): Promise<void> {
        let users;
        try {
            users = await User.aggregate([
                { $match: {} }
            ]);
            res.status(200).json(successResponse(200, "Users fetched successfully", users))
            return
        } catch (err) {
            res.status(500).json(errorResponse(500, "Internal Server Error", err));
            return;
        }
    };

    public async getUserDetails(req: Request, res: Response): Promise<void> {
        try {

            const user = await User.findById(req.params.id);
            if (!user) {
                res.status(404).json(errorResponse(404, "User Not found", null));
                return;
            }
            res.status(200).json(successResponse(200, "User fetched successfully", user));
            return;

        } catch (err) {
            res.status(500).json(errorResponse(500, "Internal Server Error", err));
            console.log(err);
            return
        }
    }



    // tranee specefic routes ===================
    // -----------------------------traner specefic routes----------------------------------------
    // ************************admin specefic routes *****************************************************
    // delete single  user by Id 
    public async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                res.status(404).json(errorResponse(404, "User Not found", null));
                return;
            }
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json(successResponse(200, "User deleted successfully", null));
            return;
        } catch (err) {
            res.status(500).json(errorResponse(500, "Internal Server Error", err));
        }
    }




}


const user = new UserController();
export const getUsers = user.getUsers.bind(user);
export const updateUser = user.updateUser.bind(user);
export const deleteUser = user.deleteUser.bind(user)
export const getUserDetails = user.getUserDetails.bind(user)

