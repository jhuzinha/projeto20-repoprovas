import supertest from 'supertest';
import app from '../src';
import * as fractoryFunctions from './Fractories/fractory'
import { prisma } from '../src/database'


beforeEach(() => {
    prisma.$executeRaw`
    TRUNCATE TABLE tests RESTART IDENTITY; `;
    prisma.$executeRaw`
    TRUNCATE TABLE users RESTART IDENTITY;
    `;
})
describe("ROUTE /signup POST", () => {
    it("Valid Credentials - /signup - Status 201 ", async () => {
        const user = await fractoryFunctions.user('register')
        const result = await supertest(app).post('/signup').send(user)
        expect(result.status).toEqual(201)
    });
    it("Repeat Credentials - /signup - Status 409 ", async () => {
        const user = await fractoryFunctions.user('register')
        await supertest(app).post('/signup').send(user)
        const result = await supertest(app).post('/signup').send(user)
        expect(result.status).toEqual(409)
    })
    it("Error Credentials - /signup - Status 422 ", async () => {
        const user = await fractoryFunctions.user('register')
        const result = await supertest(app).post('/signup').send({ email: user.email })
        expect(result.status).toEqual(422)
    })
})

describe("ROUTE /signin POST", () => {
    it("Valid Credentials - /signin - Status 200 ", async () => {
        const user = await fractoryFunctions.user('login')
        const newUser = { ...user, "confirmPassword": user.password }
        await supertest(app).post('/signup').send(newUser)
        const result = await supertest(app).post('/signin').send(user)
        expect(result.status).toEqual(200)
        expect(result.body).toBeInstanceOf(Object)
    });
    it("Wrong Credentials - /signin - Status 401 ", async () => {
        const user = await fractoryFunctions.user('login')
        const result = await supertest(app).post('/signin').send(user)
        expect(result.status).toEqual(401)
    })
    it("Wrong Credentials - /signin - Status 422 ", async () => {
        const user = await fractoryFunctions.user('login')

        const result = await supertest(app).post('/signin').send({ email: user.email })
        expect(result.status).toEqual(422)
    })
})

describe("ROUTE /test-create POST", () => {
    it("Valid Credentials - /test-create - Status 201", async () => {
        const user = await fractoryFunctions.user('login')
        const newUser = { ...user, "confirmPassword": user.password }
        await supertest(app).post('/signup').send(newUser)
        const token = await supertest(app).post('/signin').send(user)
        const test = await fractoryFunctions.testValid()
        const result = await supertest(app).post('/test-create').send(test).set('Authorization', token.body.token)
        expect(result.status).toEqual(201)
    })
    it("Unauthorized - /test-create - Status 401", async () => {
        const user = await fractoryFunctions.user('login')
        const newUser = { ...user, "confirmPassword": user.password }
        await supertest(app).post('/signup').send(newUser)
        const test = await fractoryFunctions.testValid()
        const result = await supertest(app).post('/test-create').send(test)
        expect(result.status).toEqual(401)
    })

    it("Wrong Credentials  - /test-create - Status 401", async () => {
        const user = await fractoryFunctions.user('login')
        const newUser = { ...user, "confirmPassword": user.password }
        await supertest(app).post('/signup').send(newUser)
        const token = await supertest(app).post('/signin').send(user)
        const test = await fractoryFunctions.testInvalidCategory()
        const result = await supertest(app).post('/test-create').send(test).set('Authorization', token.body.token)
        expect(result.status).toEqual(406)
    })
    it("Wrong Credentials  - /test-create - Status 401", async () => {
        const user = await fractoryFunctions.user('login')
        const newUser = { ...user, "confirmPassword": user.password }
        await supertest(app).post('/signup').send(newUser)
        const token = await supertest(app).post('/signin').send(user)
        const test = await fractoryFunctions.testInvalidTeacher()
        const result = await supertest(app).post('/test-create').send(test).set('Authorization', token.body.token)
        expect(result.status).toEqual(406)
    })
})

describe("ROUTE /test GET", () => {
    it("Test By Diciplines - /test-diciplines - Status 200", async () => {
        const user = await fractoryFunctions.user('login')
        const newUser = { ...user, "confirmPassword": user.password }
        await supertest(app).post('/signup').send(newUser)
        const token = await supertest(app).post('/signin').send(user)
        const result = await supertest(app).get('/test-diciplines').set('Authorization', token.body.token)
        expect(result.status).toEqual(200)
        expect(result.body).toBeInstanceOf(Object)
    })
    it("Unauthorized Test By Diciplines - /test-diciplines - Status 401", async () => {
        const result = await supertest(app).get('/test-diciplines')
        expect(result.status).toEqual(401)
    })

    it("Test By Teachers - /test-teachers - Status 200", async () => {
        const user = await fractoryFunctions.user('login')
        const newUser = { ...user, "confirmPassword": user.password }
        await supertest(app).post('/signup').send(newUser)
        const token = await supertest(app).post('/signin').send(user)
        const result = await supertest(app).get('/test-teachers').set('Authorization', token.body.token)
        expect(result.status).toEqual(200)
        expect(result.body).toBeInstanceOf(Object)
    })

    it("Unauthorized Test By Teachers - /test-teachers - Status 401", async () => {
        const result = await supertest(app).get('/test-teachers')
        expect(result.status).toEqual(401)
    })

})

afterAll(async () => {
    await prisma.$disconnect();
});