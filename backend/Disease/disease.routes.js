import express from "express";
import { deleteDisease, getDiseaseAndCategoryData, saveDiseaseAndCategory, updateDisease } from "./disease.controller.js";

const diseaseRouter = express.Router();

diseaseRouter.get("/disease-category-data", getDiseaseAndCategoryData);
diseaseRouter.post("/save-disease-category", saveDiseaseAndCategory);
diseaseRouter.post("/save-category-disease", saveDiseaseAndCategory);
diseaseRouter.put("/update-disease/:d_id", updateDisease);
diseaseRouter.delete("/delete-disease/:d_id", deleteDisease);

export default diseaseRouter;
