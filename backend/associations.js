import User from "./auth/User/user.model.js";
import Cart from "./Cart/cart.model.js";
import CartItem from "./Cart/cartItem.model.js";
import Product from "./Product/product.model.js";

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
