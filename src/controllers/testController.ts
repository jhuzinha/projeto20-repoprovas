import { Request, Response } from "express";
import * as testsFunctions from '../services/testService'

export type ITestsType = {
    id: number,
    name: string,
    pdfUrl: string,
    categoryId: number,
    teacherId: number,
    diciplineId: number
}

export async function addTest(req: Request, res: Response) {
    const test: ITestsType = req.body;
    await testsFunctions.createTest(test)
    return res.sendStatus(201)
}

export async function getByDiciplines(req: Request, res: Response) {
    const tests = await testsFunctions.findTestByCategories()
    return res.status(200).send(tests)
}

export async function getByTeachers(req: Request, res: Response) {
    const tests = await testsFunctions.findTestByTeachers()
    return res.status(200).send(tests)
}