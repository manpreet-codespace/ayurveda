import sequelize from "../db/pg_db.js";
import sq from 'sequelize';

const {DataTypes} = sq;

const Gallery = sequelize.define("Gallery",{
    g_id: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false
    }
},

    {
        tableName : "Gallery",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false
    }
)

export default Gallery;
