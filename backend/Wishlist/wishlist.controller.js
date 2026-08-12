import sequelize from "../db/pg_db.js"
import { addToWishlist, getWishlist, removeWishlistItem, wishlistCount } from "./wishlist.service.js";



export const addToWishlistController = async(req,res)=>{
    const transaction = await sequelize.transaction();

    try{
        const userId = req.user.id;
        const {p_id}  = req.body;

        const productId = Number(p_id);

        if (!Number.isInteger(productId) || productId < 1)
        {
            await transaction.rollback();

            return res.status(400).json({
                success:false,
                message:"A valid product ID is required"
            })
        }

        const wishlist = await addToWishlist(userId, productId, { transaction });

        if(!wishlist){
            await transaction.rollback();

            return res.status(404).json({
                success:false,
                message: "Wishlist Item not found"
            })
        }

        await transaction.commit();

        return res.status(wishlist.alreadyAdded ? 200 : 201).json({
            success:true,
            message: wishlist.alreadyAdded ? "Product is already in the wishlist" : "Product added to wishlist",
            wishlist: wishlist.wishlistItem,
            alreadyAdded: wishlist.alreadyAdded,
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


export const getWishlistController = async(req,res) =>{
    const transaction = await sequelize.transaction();

    try{
        const userId = req.user.id;

        const wishlist = await getWishlist(userId, { transaction });

        if(!wishlist)
        {
            await transaction.rollback();

            return res.status(400).json({
                success: false,
                message: "Wishlist does't exist"
            })
        }

        await transaction.commit();

        return res.status(200).json({
            success:true,
            wishlist
        })
    }
    catch(err)
    {
        await transaction.rollback();

        return res.status(500).json({
            success: false,
            message: err.message
        })

    }
}

export const removeWishlistItemController = async(req,res) =>{
    const transaction = await sequelize.transaction();
    try{
        const userId = req.user.id;
        const { wi_id } = req.params;

        if (!Number.isInteger(Number(wi_id)) || Number(wi_id) < 1) {
            await transaction.rollback();
            return res.status(400).json({
                success: false,
                message: "A valid wishlist item ID is required",
            });
        }

        const wishlist = await removeWishlistItem(userId, Number(wi_id), { transaction });

        if(!wishlist)
        {
            await transaction.rollback();
            return res.status(400).json({
                success: false,
                message: " Wishlist doesn't exists"
            })
        }

        await transaction.commit();

        return res.status(200).json({
            success:true,
            message:"Removed successfully"
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

export const getWishlistCountController = async(req,res)=>{
    try{
        const userId = req.user.id;

        const count = await wishlistCount(userId);

        if(!count)
        {
            return res.status(404).json({
                success:false,
                message:"Product not found in wishlist"
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

