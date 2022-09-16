import { faker } from '@faker-js/faker';
import { prisma } from '../../src/database'

export async function createUser() {
    const { email, password } = await user()
    const userCreated = await prisma.users.create({ data: { email, password } })
    return userCreated
}

export async function user() {
    return {
        email: faker.internet.email(),
        password: faker.internet.password(10, true, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{10,}$/, 'Jh1')
    }
}