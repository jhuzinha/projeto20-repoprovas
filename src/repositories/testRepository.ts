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

export async function getByCategories() {
    return await prisma.terms.findMany(
        {
            distinct: ['id'],
            select:
            {
                number: true,
                diciplines:
                {
                    select:
                    {
                        name: true,
                        Terms:
                        {
                            select: {
                                number: true,
                                diciplines: {
                                    select: {
                                        teacherDiciplines: {
                                            select: {
                                                tests: {
                                                    select: {
                                                        name: true,
                                                        pdfUrl: true,
                                                        TeacherDiciplines: {
                                                            select: {
                                                                Teachers: {
                                                                    select: {
                                                                        name: true
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
            }
        }


    )
}

export async function getByTeachers() {
    return await prisma.teachers.findMany({
        distinct: ['name'],
        select: {
            name: true,
            teacherDiciplines: {
                select: {
                    Diciplines: {
                        select: {
                            name: true,
                            Terms: {
                                select: {
                                    number: true,
                                    diciplines: {
                                        select: {
                                            teacherDiciplines: {
                                                select: {
                                                    tests:
                                                    {
                                                        select: {
                                                            name: true,
                                                            pdfUrl: true,
                                                            id: true
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}