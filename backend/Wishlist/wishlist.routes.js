import express from 'express';
import { authMiddleware } from '../Config/authMiddleware.js';
import { addToWishlistController, getWishlistController, removeWishlistItemController } from './wishlist.controller.js';

const wishlistRouter = express.Router();

wishlistRouter.post('/wishlist',authMiddleware,addToWishlistController);
wishlistRouter.get('/get-wishlist',authMiddleware,getWishlistController);
wishlistRouter.delete('/delete-wishlist/:wi_id',authMiddleware,removeWishlistItemController);



export default wishlistRouter;

