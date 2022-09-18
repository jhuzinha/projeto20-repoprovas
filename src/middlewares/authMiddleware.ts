import jwt from 'jsonwebtoken';
import * as userFunctions from '../repositories/authRepository';
import { NextFunction, Request, Response } from 'express';

interface TokenPayload {
    id: number,
    iat: number,
    exp: number
}

export async function validateAuthUser(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if (!token) {
        throw { type: "Unauthorized", message: "Token Invalid" }
    }
    const data = jwt.verify(token, process.env.SECRET_TOKEN!);
    const { id } = data as TokenPayload
    const user = await userFunctions.findById(id)
    if (!user) {
        throw { type: "Unauthorized", message: "Invalid Token" }
    }
    next()
}