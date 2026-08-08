import { loginUserController, savedUserController } from "./user.controller.js";
import express from 'express';

const userRouter = express.Router();

userRouter.post('/user-login', savedUserController);
userRouter.post("/login",loginUserController);


export default userRouter;
