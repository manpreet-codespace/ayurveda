import User from "./auth/User/user.model.js";
import Cart from "./Cart/cart.model.js";
import CartItem from "./Cart/cartItem.model.js";
import Product from "./Product/product.model.js";
import Wishlist from "./Wishlist/wishlist.model.js";
import WishlistItem from "./Wishlist/wishlistItem.model.js";

User.hasOne(Cart, {
  foreignKey: "u_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Cart.belongsTo(User, { foreignKey: "u_id" });

Cart.hasMany(CartItem, {
  foreignKey: "cart_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

CartItem.belongsTo(Cart, { foreignKey: "cart_id" });

Product.hasMany(CartItem, {
  foreignKey: "p_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

CartItem.belongsTo(Product, { foreignKey: "p_id" });


User.hasOne(Wishlist, {
  foreignKey: "u_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Wishlist.belongsTo(User, { foreignKey: "u_id" });

Wishlist.hasMany(WishlistItem, {
  foreignKey: "w_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

WishlistItem.belongsTo(Wishlist, { foreignKey: "w_id" });

Product.hasMany(WishlistItem, {
  foreignKey: "p_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

WishlistItem.belongsTo(Product, { foreignKey: "p_id" });
