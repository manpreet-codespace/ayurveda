import { saveInquiryController } from "./InquiryUsers.controller.js";

import express from "express";

const inquiryRouter = express.Router();

inquiryRouter.post("/contact",saveInquiryController);


export default inquiryRouter;
