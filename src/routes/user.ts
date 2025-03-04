
import express, { Router } from "express";
import { getSingleUser } from "../controllers/userController";
import { authenticateJWT } from "../middlewares/jwt";


const router:Router=express(); 

router.get("/",authenticateJWT, getSingleUser);




export default router;