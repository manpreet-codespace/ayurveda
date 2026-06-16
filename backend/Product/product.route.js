import express from 'express';
import { deleteProductController, getProductCategory, saveProductCategoryController, saveProductController, updateProductController, updateProductStockController } from './product.controller.js';
import upload from '../Config/uploadConfig.js';

const productRouter = express.Router();

productRouter.post("/product", upload.array('images', 5), saveProductController);
productRouter.put("/product/:p_id", upload.array('images', 5), updateProductController);
productRouter.delete("/product/:p_id",deleteProductController);
productRouter.post("/save-product-category", saveProductCategoryController)
productRouter.get("/product-category-data",getProductCategory);
productRouter.put("/product/:p_id/stock",updateProductStockController);

export default productRouter;
