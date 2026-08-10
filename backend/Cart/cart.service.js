import Product from "../Product/product.model.js";
import Cart from "./cart.model.js";
import CartItem from "./cartItem.model.js";


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

// COMMON FUNCTIONS TO ADD TO CART

// ✅ createCartIfNotExists()-- if user_id exists then cart exists 
// ✅ addToCart()-- 
// ✅ getCart()
// ✅ updateCartItemQuantity()
// ✅ removeCartItem()
// ✅ clearCart()