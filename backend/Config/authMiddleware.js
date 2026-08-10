import jwt from 'jsonwebtoken';

export const authMiddleware = async(req,res,next) =>{
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader)
        {
            return res.status(401).json({
                success:false,
                message:"Authorization header is missing"
            })
        }

        if(!authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                success:false,
                message:"Invalid token format"
            })
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();


    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            message: `Invalid token ${err.message}`
        })
    }
}