// import pg from "pg";
import sq from "sequelize";

import dotenv from "dotenv";

dotenv.config({ path: new URL("../.env", import.meta.url).pathname });

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

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: Number(process.env.DB_PORT),
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
