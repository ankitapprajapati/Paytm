import express from 'express'
export const mainRouter = express.Router();
import {userRouter} from './userRouter'
import { accountRouter } from './accountRouter';

mainRouter.use("/user",userRouter)
mainRouter.use("/account",accountRouter)
