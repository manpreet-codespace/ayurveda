import Product from "../Product/product.model.js";
import Wishlist from "./wishlist.model.js";
import WishlistItem from "./wishlistItem.model.js";

export const createWishlistIfNotExists = async (userId, options = {}) => {

    let wishlist = await Wishlist.findOne({
        ...options,
        where:{
            u_id:userId
        }
    })
    if(!wishlist)
    {
        wishlist = await Wishlist.create({
            u_id:userId
        }, options) 
    }
    return wishlist;

}

export const addToWishlist = async(userId,p_id,options = {}) =>{
    const wishlist = await createWishlistIfNotExists(userId, options);

    const product = await Product.findByPk(p_id,options);

    if(!product)
    {
        throw new Error("Product not found");
    }

    let wishlistItem = await WishlistItem.findOne({
        ...options,
        where:{
            w_id: wishlist.w_id,
            p_id
        }
    })

    if(wishlistItem)
    {
        return { wishlistItem, alreadyAdded: true };
    }

    wishlistItem = await WishlistItem.create({
        w_id: wishlist.w_id,
        p_id
    },options)

    return { wishlistItem, alreadyAdded: false };


}


export const getWishlist = async(userId,options={}) =>{

    return Wishlist.findOne({
        ...options,
        where:{
            u_id : userId
        },
        include:[{
            model:WishlistItem,
            include:[{model:Product}]

        }]
    })
}

export const removeWishlistItem = async(userId,wi_id,options ={}) =>{

    const wishlist = await Wishlist.findOne({
        ...options,
        where:{
            u_id:userId
        }
    })

    if(!wishlist)
    {
        throw new Error("Wishlist doesn't exist");

    }

    const wishlistItem = await WishlistItem.findOne({
        ...options,
        where:{
            wi_id,
            w_id:wishlist.w_id
        }
    })

    if(!wishlistItem)
    {
        throw new Error("Wishlist Items are not found")
    }


    await wishlistItem.destroy(options);
    return wishlistItem;

}


export const wishlistCount = async(userId) =>{

    const wishlist =await  Wishlist.findOne({
        where:{
            u_id: userId
        }
    })

    if(!wishlist)
    {
        throw new Error("Wishlist doesn't exist");

    }

     const count = await WishlistItem.count({
        where:{
            w_id:wishlist.w_id
        }
    })

    return count;

}




// ├── createWishlistIfNotExists()  done
// ├── addToWishlist() done
// ├── getWishlist()  done
// ├── removeWishlistItem()   done 
// ├── clearWishlist()          (Optional)
// ├── moveToCart()             (Optional)
// └── getWishlistCount()       (Optional)
