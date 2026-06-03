import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./db/pg_db.js";
import diseaseRouter from "./Disease/disease.routes.js";
import bodyParser from "body-parser";
import "./Category/category.model.js";
import "./Disease/disease.model.js";
import Gallery from "./Gallery/gallery.model.js";
import galleryRouter from "./Gallery/gallery.routes.js";
import { uploadsDir } from "./Config/uploadConfig.js";
import InquiryUsers from "./InquiryUsers/InquiryUsers.model.js";
import inquiryRouter from "./InquiryUsers/InquiryUsers.routes.js";


const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, ".env") });

const app = express();
const port = Number(String(process.env.PORT || "5000").trim());

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  
  next();
});
app.use(express.json());


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api",diseaseRouter,galleryRouter,inquiryRouter);
app.use("/api/uploads", express.static(uploadsDir));


app.listen(port, async () => {
  console.log(`Server is listening on ${port}`);

  try {
    await connectDB();
    await Gallery.sync();
    await InquiryUsers.sync();
  } catch (err) {
    console.error("Server started, but database connection failed:", err.message);
  }
});
