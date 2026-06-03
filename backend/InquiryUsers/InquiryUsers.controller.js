import { saveInquiryService } from "./InquiryUsers.service.js"

export const saveInquiryController = async(req,res) =>{
    try{
        const inquiry = await saveInquiryService(req.body);

        if(!inquiry){
            return res.status(400).json({
                success:false,
                message:"Inquiry is required"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Inquiry Submitted",
            data: inquiry
        })
    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
