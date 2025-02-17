import express ,{Request, Response,Router} from "express";
const router:Router = express();
import { createUser, LoginUser } from "../controllers/authController";
router.post("/register", createUser);
router.post("/login", LoginUser);


export default router
