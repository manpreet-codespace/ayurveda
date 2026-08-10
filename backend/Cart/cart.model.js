import sq from 'sequelize';
import sequelize from '../db/pg_db.js';

const {DataTypes} = sq;

const Cart = sequelize.define("Cart",{
    cart_id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true

    },
    u_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'User',
            key:'u_id'
        }
    }

}
,{
    tableName:"cart",
    timestamps:true,
    createdAt:"created_at",
    updatedAt:'updated_at'
})

export default Cart;

