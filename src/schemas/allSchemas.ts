import { ObjectSchema } from 'joi';
import loginSchema from './loginSchema'
import registerSchema from './registerSchema'
import testSchema from './testSchema'

interface AllSchemas {
    [key: string]: ObjectSchema
}

const allSchema: AllSchemas = {
    'register': registerSchema,
    'login': loginSchema,
    'test': testSchema
}

export default allSchema;