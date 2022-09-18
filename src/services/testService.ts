import { ITestsType } from "../controllers/testController";
import * as testsFunctions from "../repositories/testRepository";

export async function createTest(test: ITestsType) {
    const existCategory = await testsFunctions.verifyCategory(Number(test.categoryId))
    if (!existCategory) {
        throw { type: "Not Acceptable", message: "Categoria not found" }
    }
    const existTeacherAndDiscipline = await testsFunctions.verifyTeacherAndDicipline(Number(test.teacherId), Number(test.diciplineId))
    if (!existTeacherAndDiscipline) {
        throw { type: "Not Acceptable", message: "Teacher or Dicipline not found" }
    }
    const data = {
        name: test.name,
        pdfUrl: test.pdfUrl,
        categoriesId: Number(test.categoryId),
        teacherDiciplinesId: Number(existTeacherAndDiscipline.id)
    }

    await testsFunctions.create(data)
    return
}

export async function findTestByCategories() {
    const tests = await testsFunctions.getByCategories()
    return tests
}

export async function findTestByTeachers() {
    const tests = await testsFunctions.getByTeachers()
    return tests
}