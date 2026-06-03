import {
    createGalleryService,
    deleteGalleryImageService,
    getUploadedImageService,
    updateGalleryImageService
} from "./gallery.service.js"


export const  uploadGalleryImage= async(req,res) =>{
    try{
        if(!req.file)
        {
            return res.status(400).json({
                success:false,
                message:"Image is required"
            })
        }

        const gallery = await createGalleryService(
            req.file
        );

        return res.status(201).json({
            success:true,
            data:gallery,
            message:"Image uploaded successfully"
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


export const getUploadedImages = async(req,res)=> {
try{
    const images = await getUploadedImageService();

    return res.status(200).json({
        success:true,
        message: "Image shown successfully",
        data: images
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

export const updateGalleryImage = async(req,res)=> {
    try{
        const { g_id } = req.params;

        if(!req.file)
        {
            return res.status(400).json({
                success:false,
                message:"Image is required"
            })
        }

        const gallery = await updateGalleryImageService(g_id, req.file);

        if(!gallery)
        {
            return res.status(404).json({
                success:false,
                message:"Image not found"
            })
        }

        return res.status(200).json({
            success:true,
            data:gallery,
            message:"Image updated successfully"
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

export const deleteGalleryImage = async(req,res)=> {
    try{
        const { g_id } = req.params;
        const gallery = await deleteGalleryImageService(g_id);

        if(!gallery)
        {
            return res.status(404).json({
                success:false,
                message:"Image not found"
            })
        }

        return res.status(200).json({
            success:true,
            data:gallery,
            message:"Image deleted successfully"
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
