import sq from 'sequelize';
import sequelize from '../db/pg_db.js';

const {DataTypes} = sq;

const Wishlist = sequelize.define("Wishlist", {
    w_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true        
    },
    u_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"users",
            key:"u_id"
        }
    }
},{
    tableName:"wishlist",
    timestamps:true,
    createdAt:"created_at",
    updatedAt:"updated_at"
})

export default Wishlist;

