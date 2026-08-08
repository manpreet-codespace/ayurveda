import sequelize from "../../db/pg_db.js";
import { savedUserService } from "./user.service.js";
import bcrypt from 'bcrypt';


export const savedUserController =async(req,res) =>{
        const transaction = await sequelize.transaction();
    try{
        const {name,email,phonenumber,password} = req.body;

        if(!email) 
        {
            await transaction.rollback();

            return res.status(400).json({
                success:false,
                message: "email is required"
            })
        }

        if(!phonenumber) 
        {
            await transaction.rollback();

            return res.status(400).json({
                success:false,
                message: "Phone Number is required"
            })
        }
        
        const user = await savedUserService({
            name,email,phonenumber,password
        }, transaction);

        await transaction.commit();

        return res.status(200).json({
            success:true,
            message:"User successfully created"
        })

    }
    catch(err)
    {
        await transaction.rollback();

        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}