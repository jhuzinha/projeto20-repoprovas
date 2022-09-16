import { prisma } from "../database";
import { IUsersType } from "../types/userType";

export async function insert(data: IUsersType) {
    await prisma.users.create({ data })
    return
}

export async function findOne(email: string) {
    const user = await prisma.users.findFirst({ where: { email } })
    return user
}

export async function findById(id: number) {
    const user = await prisma.users.findFirst({ where: { id } })
    return user
}