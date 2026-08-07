import sq from 'sequelize';
import sequelize from '../db/pg_db';

const {DataTypes} = sq;

const Cart = sequelize.define("Cart",{
    cart_id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true

    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull:false,

    }
})

