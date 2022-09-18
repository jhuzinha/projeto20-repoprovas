import { prisma } from "../src/database";

export async function main() {
    await prisma.terms.createMany({ data: [{ "number": 1 }, { "number": 2 }, { "number": 3 }, { "number": 4 }, { "number": 5 }, { "number": 6 }] })
    await prisma.categories.createMany({ data: [{ "name": 'Projeto' }, { "name": 'Prática' }, { "name": 'Recuperação' }] })
    await prisma.teachers.createMany({ data: [{ "name": 'Diego Pinho' }, { "name": 'Bruna Hamori' }] })
    await prisma.diciplines.createMany({
        data: [{ "name": 'HTML e CSS', termsId: 1 },
        { "name": 'JavaScript', termsId: 2 },
        { "name": 'React', termsId: 3 },
        { "name": 'Humildade', termsId: 4 },
        { "name": 'Planejamento', termsId: 2 },
        { "name": 'Autoconfiança', termsId: 3 }]
    })
    await prisma.teacherDiciplines.createMany({
        data: [{ teachersId: 1, diciplinesId: 1 },
        { teachersId: 1, diciplinesId: 2 },
        { teachersId: 1, diciplinesId: 3 },
        { teachersId: 2, diciplinesId: 4 },
        { teachersId: 2, diciplinesId: 5 },
        { teachersId: 2, diciplinesId: 6 }]
    })

}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})