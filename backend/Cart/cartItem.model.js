import sequelize from "../db/pg_db.js";
import sq from "sequelize";

const {DataTypes} = sq;

const CartItem = sequelize.define("CartItem",{
    ci_id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    cart_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"Cart",
            key:'cart_id'
        }
    },
    p_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Product',
            key:'p_id'
        }

    },
    quantity:{

        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:1,
        validate:{
            min:1
        }
    },

    
},{
    tableName:"cartitem",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
})

export default CartItem;

