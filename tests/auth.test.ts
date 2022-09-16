import supertest from 'supertest';
import app from '../src';
import * as fractoryFunctions from './Fractories/fractory'
import { prisma } from '../src/database'

beforeEach(() => {
    prisma.$executeRaw`
    TRUNCATE TABLE items; `
})
describe("ROUTE /signup", () => {
    it("Valid Credentials - /signup - Status 201 ", async () => {
        const user = await fractoryFunctions.user()
        user["confirmPassword"] = user.password
        const result = await supertest(app).post('/signup').send(user)
        expect(result.status).toEqual(201)
    });
    it("Repeat Credentials - /signup - Status 409 ", async () => {
        const user = await fractoryFunctions.user()
        user["confirmPassword"] = user.password
        await supertest(app).post('/signup').send(user)
        const result = await supertest(app).post('/signup').send(user)
        expect(result.status).toEqual(409)
    })
})

describe("ROUTE /signin", () => {
    it("Valid Credentials - /signin - Status 200 ", async () => {
        const user = await fractoryFunctions.user()
        const newUser = { ...user, "confirmPassword": user.password }
        await supertest(app).post('/signup').send(newUser)
        const result = await supertest(app).post('/signin').send(user)
        expect(result.status).toEqual(200)
        expect(result.body).toBeInstanceOf(Object)
    });
    it("Wrong Credentials - /signin - Status 401 ", async () => {
        const user = await fractoryFunctions.user()
        const result = await supertest(app).post('/signin').send(user)
        expect(result.status).toEqual(401)
    })
})

afterAll(async () => {
    await prisma.$disconnect();
});