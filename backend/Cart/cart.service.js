import { where } from "sequelize";
import sequelize from "../db/pg_db.js";
import Product from "../Product/product.model.js";
import Cart from "./cart.model.js";
import CartItem from "./cartItem.model.js";
import User from "../auth/User/user.model.js";


export const createCartIfNotExists = async(userId) =>{

        let cart = await Cart.findOne({
            where:{
                u_id:userId
            }
        })

        if(!cart)
        {
            cart = await Cart.create({
                u_id:userId
            })
        }
        return cart;
    }


    export const addToCart = async(userId, p_id,quantity) =>{

        const cart = await createCartIfNotExists(userId);

        const product = await Product.findByPk(p_id);


        if(!product)
        {
            throw new Error("Product not found");

        }

        let cartItem = await CartItem.findOne({where:
            {

                cart_id:cart.cart_id,
                p_id
            }
        })

        if(cartItem){
    
            cartItem.quantity += Number(quantity);
            await cartItem.save();
            return cartItem;
        }

        cartItem = await CartItem.create({
            cart_id : cart.cart_id,
            p_id,
            quantity
        })
        return cartItem;

    }

export const getCartService = async (userId, options = {}) => {
    return Cart.findOne({
        where: { u_id: userId },
        include: [
            {
                model: CartItem,
                include: [{ model: Product }],
            },
        ],
        ...options,
    });
};

export const updateCartItemQuantityService = async (userId, ci_id, quantity, options = {}) => {
    const nextQuantity = Number(quantity);

    if (!Number.isInteger(nextQuantity) || nextQuantity < 0) {
        throw new Error("Quantity must be a whole number greater than or equal to 0");
    }

    const cart = await Cart.findOne({
        ...options,
        where: { u_id: userId },
    });

    if (!cart) {
        throw new Error("Cart doesn't exist");
    }

    const cartItem = await CartItem.findOne({
        ...options,
        where: { ci_id, cart_id: cart.cart_id },
    });

    if (!cartItem) {
        throw new Error("Cart item not found");
    }

    if (nextQuantity === 0) {
        await cartItem.destroy(options);
        return null;
    }

    cartItem.quantity = nextQuantity;
    await cartItem.save(options);
    return cartItem;
}


export const removeCartItemService = async(userId,ci_id,options ={}) => {
      const cart = await Cart.findOne({
        ...options,
        where: { u_id: userId },
    });

    if (!cart) {
        throw new Error("Cart doesn't exist");
    }

    const cartItem = await CartItem.findOne({
        ...options,
        where: { ci_id, cart_id: cart.cart_id },
    });

     if (!cartItem) {
        throw new Error("Cart item not found");
    }

    await cartItem.destroy(options);
    return cartItem;
    
}


export const cartCount = async(userId) =>{

    const cart =await  Cart.findOne({
        where:{
            u_id: userId
        }
    })

    if(!cart)
    {
        throw new Error("cart doesn't exist");

    }

    const cartItems = await CartItem.findAll({
        where: {
            cart_id : cart.cart_id
        }
    })
     const count = await cartItems.reduce((total,item)=>total + item.quantity,0);


    return count;
    

}



// COMMON FUNCTIONS TO ADD TO CART

// ✅ createCartIfNotExists()-- if user_id exists then cart exists 
// ✅ addToCart()-- cart created or not if yes then check product exists then check is any item already in cart or not if not then create else cart item added to previous one.
// ✅ getCart() -- findOne cartId , then include their cartItems, and then include products
// ✅ updateCartItemQuantity()-- 
// ✅ removeCartItem()
// ✅ clearCart()
