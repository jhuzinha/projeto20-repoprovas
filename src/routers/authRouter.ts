import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController";
import Validate from "../middlewares/joiValidate";

const authRouter = Router();

authRouter.post('/signup', Validate('register'), registerUser)
authRouter.post('/signin', Validate('login'), loginUser)

export default authRouter;