import joi from 'joi';


const testSchema = joi.object({
    nome: joi.string().email().required(),
    pdfUrl: joi.string().uri().required()
});

export default testSchema;