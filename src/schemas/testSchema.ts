import joi from 'joi';


const testSchema = joi.object({
    name: joi.string().required(),
    pdfUrl: joi.string().uri().required(),
    categoryId: joi.number().required(),
    teacherId: joi.number().required(),
    diciplineId: joi.number().required()
});

export default testSchema;