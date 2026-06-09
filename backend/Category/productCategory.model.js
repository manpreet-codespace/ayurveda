import sq from "sequelize";
import sequelize from "../db/pg_db.js";

const {DataTypes} = sq;

const productCategory = sequelize.define("productCategory",
    {
        c_id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        product_category_name:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
                notEmpty:true
            }
        }
    },
    {
        tableName: "productCategory",
        timestamps:true,
        createdAt:"created_at",
        updatedAt:false
    }
)

export default productCategory;

