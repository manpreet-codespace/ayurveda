import sq from "sequelize";
import sequelize from "../db/pg_db.js";

const {DataTypes} = sq;

const WishlistItem = sequelize.define("WishlistItem",{
    wi_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    w_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"wishlist",
            key:"w_id"
        }
    },
    p_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"product",
            key:'p_id'
        }
    }
},
{
    tableName:"wishlist_item",
    timestamps:true,
    createdAt:"created_at",
    updatedAt:"updated_at"
})

export default WishlistItem;
