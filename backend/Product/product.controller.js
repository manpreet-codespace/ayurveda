import { saveProductImages, saveProductService } from "./product.service.js";
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

        const {c_id, p_name,price,sku, variant,description} = req.body;
        const files = req.files || [] ;

        if(!c_id || !p_name || !price || !sku || !variant){
            await transaction.rollback();

            return res.status(400).json({
                success:false,
                message:"Product details are required"
            })
        }

        const imageURLs = await saveProductImages(files);

        const payload = {
            c_id: Number(c_id),
            p_name,
            price: Number(price),
            sku,
            variant: Number(variant),
            discount: req.body.discount || null,
            image: imageURLs ,// service will stringify
            description
        };

        const product = await saveProductService(payload, transaction);

     
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

export const updateProductController = async(req,res) =>{
    const transaction = await sequelize.transaction();
    try{
        const {p_id} = req.params;
        const {c_id, p_name,price,sku, variant,description} = req.body;
        const files = req.files || [];

        if(!c_id || !p_name || !price || !sku ||!variant){
            await transaction.rollback();

            return res.status(400).json({
                success:false,
                message:"Product details are required"
            })
        }

        const product = await Product.findByPk(p_id, {transaction});

        if(!product){
            await transaction.rollback();

            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }

        let imagePayload = product.image;

        if(files.length > 0){
            const imageURLs = await saveProductImages(files);
            imagePayload = JSON.stringify(imageURLs);
        }

        await product.update({
            c_id: Number(c_id),
            p_name,
            price: Number(price),
            sku,
            variant: Number(variant),
            discount: req.body.discount ?? product.discount,
            image: imagePayload,
            description
        }, {transaction});

        await transaction.commit();

        return res.status(200).json({
            success:true,
            message:"Product updated",
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

export const deleteProductController = async(req,res) =>{
    const transaction = await sequelize.transaction();
    try{
        const {p_id} = req.params;

        const product = await Product.findByPk(p_id, {transaction});

        if(!product){
            await transaction.rollback();

            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }

        await product.destroy({transaction});

        await transaction.commit();

        return res.status(200).json({
            success:true,
            message:"Product deleted"
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

export const updateProductStockController =async(req,res) =>{

    const transaction = await sequelize.transaction();

    try{
        const {p_id} = req.params;
        const {stock} = req.body;

        if(stock === undefined || stock === "")
        {
            await transaction.rollback();

            return res.status(400).json({
                success:false,
                message:"Stock is required"
            });
        }

        const product = await Product.findByPk(p_id,{transaction});

        if(!product)
        {
            await transaction.rollback();

            return res.status(400).json({
                success:false,
                message:"product not found"
            })
        }

        const newStock = Number(product.stock || 0) + Number(stock)

        await product.update(
            {stock:newStock},
            {transaction}
        )
        await transaction.commit();

        return res.status(200).json(
            {
                success:true,
                message:"Product Stock is updated",
                product
            }
        )
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


 export const getProductById = async(req,res) =>{
    const transaction = await sequelize.transaction();

    try{
        const {p_id} = req.params;
        
        const product  = await Product.findByPk(p_id, {transaction});
        if(!product)
        {
            await transaction.rollback();

            return res.status(404).json({
                success: false,
                message: "Product not found"
            })

        }
        await transaction.commit();

        return res.status(200).json({
            success: true,
            product
        })
    }
    catch(err){
        await transaction.rollback();

        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}