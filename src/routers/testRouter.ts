import { Router } from "express";
import Validate from "../middlewares/joiValidate";
import * as testFunctions from "../controllers/testController"
import { validateAuthUser } from "../middlewares/authMiddleware";

const testRouter = Router();

testRouter.use(validateAuthUser)
testRouter.post(`/test-create`, Validate('test'), testFunctions.addTest)
testRouter.get(`/test-diciplines`, testFunctions.getByDiciplines)
testRouter.get(`/test-teachers`, testFunctions.getByTeachers)

export default testRouter;