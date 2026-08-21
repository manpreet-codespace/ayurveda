import { loginUserController, refreshAccessTokenController, savedUserController } from "./user.controller.js";
import express from 'express';

const userRouter = express.Router();

userRouter.post('/user-login', savedUserController);
userRouter.post("/login",loginUserController);
userRouter.post('/refresh-token',refreshAccessTokenController);


export default userRouter;
