import { faker } from '@faker-js/faker';

type User = {
    email: string,
    password: string,
    confirmPassword?: string
}

export async function user(type: string) {
    let data: User = {
        email: faker.internet.email(),
        password: faker.internet.password(10, true, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{10,}$/, 'Jh1')
    }
    if (type === 'register') {
        data['confirmPassword'] = data.password
    }
    return data
}

export async function testValid() {
    return {
        "name": faker.name.fullName(),
        "pdfUrl": faker.internet.avatar(),
        "categoryId": "1",
        "teacherId": "1",
        "diciplineId": "2"
    }
}

export async function testInvalidCategory() {
    return {
        "name": faker.name.fullName(),
        "pdfUrl": faker.internet.avatar(),
        "categoryId": "10000",
        "teacherId": "1",
        "diciplineId": "1"
    }
}

export async function testInvalidTeacher() {
    return {
        "name": faker.name.fullName(),
        "pdfUrl": faker.internet.avatar(),
        "categoryId": "1",
        "teacherId": "100000",
        "diciplineId": "1"
    }
}