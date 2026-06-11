import { saveProductService } from "./product.service.js";
import { saveProductCategoryServices } from "../Category/category.service.js";
import sequelize from "../db/pg_db.js";
import productCategory from "../Category/productCategory.model.js";
import Product from "./product.model.js";


export const saveProductCategoryController = async(req,res) =>{
    const transaction = await sequelize.transaction();

    try{

        const {product_category_name} = req.body;

        if(!product_category_name)
        {
            await transaction.rollback();

            return res.status(400).json({
                success:false,
                message:"Product category name is required"
            })
        }

        const category = await saveProductCategoryServices({
            product_category_name
        },transaction)

        await transaction.commit();

        return res.status(201).json({
            success:true,
            message:"Product category saved successfully",
            category
        })
        
    }
    catch(err)
    {
        await transaction.rollback();

        return res.status(err.statusCode || 500).json({
            success:false,
            message:err.message
        })
    }
}

export const saveProductController = async(req,res) =>{
    const transaction = await sequelize.transaction();
    try{    

        const {c_id, p_name,price,sku, variant} = req.body;

        if(!c_id || !p_name || !price || !sku ||!variant){
            await transaction.rollback();

            return res.status(400).json({
                success:false,
                message:"Product details are required"
            })
        }
        const product = await saveProductService(req.body, transaction);

     
        await transaction.commit();

        return  res.status(201).json({
            success:true,
            message:"Product saved",
            product
        })
    }
        catch(err)
        {
            await transaction.rollback();

            return res.status(500).json({
                success:false,
                message:err.message
            })
        }
}

export const getProductCategory = async(req,res)=>{
    try{
        const categories = await productCategory.findAll({
            order:[["c_id","ASC"]]
        }
        )

        const product = await Product.findAll({
            include: [
                {
                    model: productCategory,
                    attributes: ["c_id", "product_category_name"]
                }
            ],
            order:[["p_id","ASC"]]

        })

        return res.status(200).json({
            success:true,
            categories,
            product
        });
    }
    catch(err)
    {
        
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }


}
