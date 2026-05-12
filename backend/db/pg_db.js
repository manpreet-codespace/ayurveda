// import pg from "pg";
import sq from "sequelize";

import dotenv from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../.env") });

const { Sequelize } = sq;

// const { Pool } = pg;

// const pool = new Pool({
//   user: process.env.DB_USER,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
// });

// pool.on("connect", () => {
//   console.log("PostgreSQL is connected successfully");
// });

// pool.on("error", (err) => {
//   console.error("Unexpected PostgreSQL pool error", err.message);
// });

// export async function connectDB() {
//   try {
//     const client = await pool.connect();
//     client.release();
//   } catch (err) {
//     console.error("Database connection error", err.message);
//     throw err;
//   }
// }

// const requiredEnv = ["DB_NAME", "DB_USER", "DB_PASSWORD", "DB_HOST", "DB_PORT"];
// const missingEnv = requiredEnv.filter((key) => !process.env[key]);

// if (missingEnv.length > 0) {
//   throw new Error(`Missing required database environment variables: ${missingEnv.join(", ")}`);
// }

const sequelize = new Sequelize(
  String(process.env.DB_NAME).trim(),
  String(process.env.DB_USER).trim(),
  String(process.env.DB_PASSWORD),
  {
    host: String(process.env.DB_HOST).trim(),
    dialect: "postgres",
    port: Number(String(process.env.DB_PORT).trim()),
  }
);

export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL is connected successfully");
    await sequelize.sync();
    console.log("Database models synchronized successfully");

    
  } catch (err) {
    console.error("Database connection error", err.message);
    throw err;
  }
}


export default sequelize;
