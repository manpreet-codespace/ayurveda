import sq from 'sequelize';
import sequelize from '../db/pg_db.js';

const {DataTypes} = sq;

const InquiryUsers = sequelize.define("InquiryUsers", {
    u_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }

    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        validate:{
            isEmail:true
        }

    },
    subject:{
        type:DataTypes.STRING
    },
    phNumber:{
        type:DataTypes.STRING
    },
    message:{
        type:DataTypes.STRING,
        allowNull:false
    }
},
{
    tableName:"inquiry-users",
    timestamps: true,
    createdAt:"created_at",
    updatedAt:false
})

export default InquiryUsers;
