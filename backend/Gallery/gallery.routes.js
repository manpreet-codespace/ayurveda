import express from "express";
import {
    deleteGalleryImage,
    getUploadedImages,
    updateGalleryImage,
    uploadGalleryImage
} from "./gallery.controller.js";
import upload from './../Config/uploadConfig.js';



const galleryRouter = express.Router();


galleryRouter.post("/gallery",upload.single("image"),uploadGalleryImage);
galleryRouter.get("/gallery" , getUploadedImages)
galleryRouter.put("/gallery/:g_id",upload.single("image"),updateGalleryImage);
galleryRouter.delete("/gallery/:g_id",deleteGalleryImage);

export default galleryRouter;
