import { Op } from "sequelize";
import sequelize from "../../db/pg_db.js";
import User from "./user.model.js";
import { savedUserService } from "./user.service.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

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

export const loginUserController = async(req,res) =>{
    const transaction = await sequelize.transaction();
    try{

        const {identifier,password} = req.body;

        const user = await User.findOne({
            where:{
                [Op.or]:[
                    {email:identifier},
                    {phonenumber:identifier}
                ]
            },
            transaction

        })

        if(!user)
        {
            await transaction.rollback();

            return res.status(404).json({
                success:false,
                message: "User not found"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch)
        {
            await transaction.rollback();

            return res.status(401).json({
                success:false,
                message: "Invalid Password"
            })
        }

        const token = jwt.sign(
            {
                id:user.u_id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "30min"
            }
        )
        await transaction.commit();


        return res.status(200).json({
            success:true,
            user,
            token
        })

    }
    catch(err)
    {
        await transaction.rollback();

        return res.status(500).json({
            success:false,
            message: err.message
        })
    }
}