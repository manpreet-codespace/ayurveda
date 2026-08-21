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

        const { identifier, email, phonenumber, password } = req.body;
        const loginIdentifier = String(identifier || email || phonenumber || "").trim();

        if (!loginIdentifier || !password) {
            await transaction.rollback();
            return res.status(400).json({
                success: false,
                message: "Email or phone number and password are required"
            });
        }

        const user = await User.findOne({
            where:{
                [Op.or]:[
                    {email:loginIdentifier},
                    {phonenumber:loginIdentifier}
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

        const accessToken = jwt.sign(
            {
                id:user.u_id
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "15m"
            }
        )

        const refreshToken = jwt.sign(
            {
                id:user.u_id
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: "7d"
            }
        )

        await transaction.commit();

        res.cookie("refreshToken", refreshToken,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict"
        })


        return res.status(200).json({
            success:true,
            user,
            accessToken
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

export const refreshAccessTokenController = async (req, res) => {
    try {

        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token not found"
            });
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const accessToken = jwt.sign(
            {
                id: decoded.id
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "15m"
            }
        );

        return res.status(200).json({
            success: true,
            accessToken
        });

    } catch (err) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired refresh token"
        });
    }
};
