import { ObjectSchema } from 'joi';
import loginSchema from './loginSchema'
import registerSchema from './registerSchema'

interface AllSchemas {
    [key: string]: ObjectSchema
}

const allSchema: AllSchemas = {
    'register': registerSchema,
    'login': loginSchema
}

export default allSchema;