import express from 'express';
import { deleteProductController, getProductCategory, saveProductCategoryController, saveProductController, updateProductController, updateProductStockController } from './product.controller.js';

const productRouter = express.Router();

productRouter.post("/product",saveProductController);
productRouter.put("/product/:p_id",updateProductController);
productRouter.delete("/product/:p_id",deleteProductController);
productRouter.post("/save-product-category", saveProductCategoryController)
productRouter.get("/product-category-data",getProductCategory);
productRouter.put("/product/:p_id/stock",updateProductStockController);

export default productRouter;
