import sequelize from "../db/pg_db.js";
import Cart from "./cart.model.js";
import { addToCart, cartCount, createCartIfNotExists, getCartService, removeCartItemService, updateCartItemQuantityService } from "./cart.service.js";

export const addToCartController = async (req, res) => {

    const transaction = await sequelize.transaction();

    try {
        const userId = req.user.id;
        const { p_id, quantity } = req.body;


        const result = await addToCart(userId, p_id, quantity,
            { transaction }
        );


        await transaction.commit();

        return res.status(201).json({
            success: true,
            message: "Product added to cart",
            result
        })
    }
    catch (err) {
        await transaction.rollback();

        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const getCartController = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const userId = req.user.id;

        const cart = await getCartService(userId, { transaction });

        if (!cart) {
            await transaction.rollback();

            return res.status(400).json({
                success: false,
                message: "Cart doesn't exists"
            })
        }

        await transaction.commit();

        return res.status(200).json({
            success: true,
            cart
        })

    }
    catch (err) {
        await transaction.rollback();

        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const updateCartItemQuantityController = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const userId = req.user.id;

        const { ci_id } = req.params;

        const { quantity } = req.body;

        const updateCart = await updateCartItemQuantityService(userId, ci_id, quantity, { transaction });

        await transaction.commit();

        return res.status(200).json({
            success: true,
            message: updateCart ? "Cart is updated" : "Cart item ",
            cartItem: updateCart,
        });


    }
    catch (err) {
        await transaction.rollback();

        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


export const removeCartItemController = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const userId = req.user.id;
        const {ci_id} = req.params;

        const removeCart = await removeCartItemService(userId,ci_id,{transaction});

        await transaction.commit();

        return res.status(201).json({
            success:true,
            removeCart
        })

    }
    catch(err) {
        await transaction.rollback();

        return res.status(500).json({
            success: false,
            message: err.message
        })

    }
}

export const getCartCountController = async(req,res)=>{
    try{
        const userId = req.user.id;

        const count = await cartCount(userId);

        if(!count)
        {
            return res.status(404).json({
                success:false,
                message:"Product not found in cart",
            })
        }

        return res.status(200).json({
            success: true,
            count
        })

    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            message:err.message
       })
    }
}
