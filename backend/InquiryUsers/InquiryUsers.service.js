import InquiryUsers from "./InquiryUsers.model.js";

export const saveInquiryService = async({name,email,phNumber,subject,message},transaction) =>{
    try{


        const inquiry = await InquiryUsers.create({
            name,
            email,
            phNumber,
            subject,
            message
        },
    {transaction})

        return inquiry;
    }
    catch(err)
    {
        throw new Error(err.message);

    }
}
