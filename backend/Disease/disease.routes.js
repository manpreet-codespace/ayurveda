import express from "express";
import {
    deleteDisease,
    getDiseaseAndCategoryData,
    getDiseaseDescription,
    saveDiseaseAndCategory,
    updateDisease,
    updateDiseaseDescription
} from "./disease.controller.js";

const diseaseRouter = express.Router();

diseaseRouter.get("/disease-category-data", getDiseaseAndCategoryData);
diseaseRouter.post("/save-disease-category", saveDiseaseAndCategory);
diseaseRouter.post("/save-category-disease", saveDiseaseAndCategory);
diseaseRouter.put("/update-disease/:d_id", updateDisease);
diseaseRouter.put("/update-disease-description/:d_id", updateDiseaseDescription);
diseaseRouter.delete("/delete-disease/:d_id", deleteDisease);
diseaseRouter.get("/disease/:slug", getDiseaseDescription);


export default diseaseRouter;
