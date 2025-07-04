import { signUp, signIn } from "../controllers/auth.controller.js";
import express from 'express'

const authRouter = express.Router();


authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);

export default authRouter;