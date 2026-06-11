import express from 'express';
import { getProductCategory, saveProductCategoryController, saveProductController } from './product.controller.js';

const productRouter = express.Router();

productRouter.post("/product",saveProductController);
productRouter.post("/save-product-category", saveProductCategoryController)
productRouter.get("/product-category-data",getProductCategory);

export default productRouter;
