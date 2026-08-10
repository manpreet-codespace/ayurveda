import sequelize from "../db/pg_db.js";
import Cart from "./cart.model.js";
import { addToCart, createCartIfNotExists } from "./cart.service.js";

export const addToCartController = async(req,res) =>{

    const transaction = await sequelize.transaction();

    try{
        const userId = req.user.id;
        const {p_id,quantity} = req.body;


        const result = await addToCart(userId,p_id,quantity,
            {transaction}
        );


        await transaction.commit();

        return res.status(201).json({
            success: true,
            message: "Product added to cart",
            result
        })
    }
    catch(err)
    {
        await transaction.rollback();

        return res.status(500).json({
            success:false,
            message: err.message
        })
    }
}