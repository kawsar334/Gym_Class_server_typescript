
import express, { Router } from "express";
import { getUsers, updateUser, deleteUser, getUserDetails } from "../controllers/userController";
import { authenticatedADMIN, authenticateJWT } from "../middlewares/jwt";
const router:Router=express(); 



router.get("/",authenticateJWT, getUsers);
router.get("/find/:id", authenticateJWT, getUserDetails);
router.put("/:id", authenticateJWT,  updateUser);


//only admin can delete a trainee & traner..----------------------------
router.delete("/:id", authenticatedADMIN, deleteUser);





export default router;