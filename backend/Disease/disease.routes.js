import express from "express";
import { getDiseaseAndCategoryData, saveDiseaseAndCategory } from "./disease.controller.js";

const diseaseRouter = express.Router();

diseaseRouter.get("/disease-category-data", getDiseaseAndCategoryData);
diseaseRouter.post("/save-disease-category", saveDiseaseAndCategory);
diseaseRouter.post("/save-category-disease", saveDiseaseAndCategory);

export default diseaseRouter;
