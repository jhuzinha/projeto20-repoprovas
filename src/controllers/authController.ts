import { Request, Response } from "express";
import * as userService from '../services/authService'
import { IUsersType } from "../types/userType";

export async function loginUser(req: Request, res: Response) {
    const { password, email }: IUsersType = req.body;
    const token = await userService.loginUser({ password, email })
    return res.status(200).send({ token })
}

export async function registerUser(req: Request, res: Response) {
    const { password, email }: IUsersType = req.body;
    await userService.createUser({ password, email })
    return res.status(201).send("User created successfully!")
}
