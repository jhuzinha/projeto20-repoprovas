import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import Validate from "../middlewares/joiValidate.js";

const authRouter = Router();

authRouter.post('/signup', Validate('register'), registerUser)
authRouter.post('/signin', Validate('login'), loginUser)

export default authRouter;