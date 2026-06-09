import sq from "sequelize";
import sequelize from "../db/pg_db.js";import productCategory from "../Category/productCategory.model.js";
a

const {DataTypes} = sq;

const Product = sequelize.define("Product" , {
    p_id: {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    p_name:{
        type:DataTypes.STRING,
        allowNull:false,

    },
    price:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    sku:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    variant:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true
    },
    discount:{
        type:DataTypes.INTEGER,

    },
    stocks:{
        type:DataTypes.INTEGER,
        
    }

},

{
    tableName:"product",
    timestamps:true,
    createdAt:"created_at",
    updatedAt:false
})

Product.belongsTo(productCategory,{foreignKey:"c_id"});
productCategory.hasMany(Product,{foreignKey:"c_id"});



export default Product;
