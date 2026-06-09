import sq from 'sequelize';
import sequelize from '../db/pg_db.js';
import Category from '../Category/category.model.js';

const {DataTypes }= sq;

const Disease = sequelize.define("Disease",{
        d_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        }  ,
   
        
        disease_name:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true,
            }
        },
        c_id:{
            type:DataTypes.INTEGER,
            allowNull:true,
            references:{
                model:Category,
                key:"c_id",
            },
            onDelete:"SET NULL",
            onUpdate:"CASCADE"
        },
        slug:{
            type:DataTypes.STRING,
            unique:true
        },
        description:{
            type:DataTypes.TEXT("long")
        }
        },
 
        {
            tableName:"Diseases",
            timestamps:true,
            createdAt:"created_at",
            updatedAt:false
        }

);

Disease.belongsTo(Category,{foreignKey: "c_id"});
Category.hasMany(Disease,{foreignKey:"c_id"});

export default Disease;
