import { prisma } from "../database"
import { Tests } from "@prisma/client"

export type ITestsCreate = Omit<Tests, 'id'>


export async function create(data: ITestsCreate) {
    return await prisma.tests.create({ data })
}

export async function verifyTeacherAndDicipline(teachersId: number, diciplinesId: number) {
    return await prisma.teacherDiciplines.findFirst({ where: { teachersId, diciplinesId } })
}

export async function verifyCategory(id: number) {
    return await prisma.categories.findUnique({ where: { id } })
} 