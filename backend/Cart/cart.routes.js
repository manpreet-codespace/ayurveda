import express from 'express';
import { addToCartController } from './cart.controller.js';
import { authMiddleware } from '../Config/authMiddleware.js';

const cartRouter = express.Router();

cartRouter.post('/cart',authMiddleware, addToCartController);


export default cartRouter;
