import sq from 'sequelize';
import sequelize from '../db/pg_db.js';

const {DataTypes} = sq;

const Category = sequelize.define("Category",
    {
        c_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        category_name:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
                notEmpty:true,
            }
        }

    },
    {
        tableName:"Categories",
        timestamps:true,
        createdAt:"created_at",
        updatedAt:false
    }
)


export default Category;
