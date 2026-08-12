import express from 'express';
import { addToCartController, getCartController, getCartCountController, removeCartItemController, updateCartItemQuantityController } from './cart.controller.js';
import { authMiddleware } from '../Config/authMiddleware.js';

const cartRouter = express.Router();

cartRouter.post('/cart',authMiddleware, addToCartController);
cartRouter.get('/get-cart', authMiddleware,getCartController);
cartRouter.patch('/update-cart/:ci_id',authMiddleware, updateCartItemQuantityController);
cartRouter.delete('/delete-cart/:ci_id',authMiddleware,removeCartItemController);
cartRouter.get('/cart-count',authMiddleware,getCartCountController);


export default cartRouter;
