import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';
import errorHandler from './middlewares/errorHandle';
import router from './routers/index';

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json())
app.use(router)
app.use(errorHandler)

export default app;