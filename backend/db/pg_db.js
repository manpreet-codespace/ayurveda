import sq from "sequelize";

import dotenv from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../.env") });

const { DataTypes, QueryTypes, Sequelize } = sq;

const slugify = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

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

async function ensureDiseaseSlugColumn() {
  const queryInterface = sequelize.getQueryInterface();
  const tableName = "Diseases";
  const tableDefinition = await queryInterface.describeTable(tableName);

  if (!tableDefinition.slug) {
    await queryInterface.addColumn(tableName, "slug", {
      type: DataTypes.STRING,
      allowNull: true,
    });
  }

  if (!tableDefinition.description) {
    await queryInterface.addColumn(tableName, "description", {
      type: DataTypes.TEXT,
      allowNull: true,
    });
  }

  const diseases = await sequelize.query(
    `SELECT d_id, disease_name, slug FROM "${tableName}" ORDER BY d_id ASC`,
    { type: QueryTypes.SELECT }
  );

  const usedSlugs = new Set(
    diseases
      .map((disease) => disease.slug)
      .filter((slug) => typeof slug === "string" && slug.trim() !== "")
  );

  for (const disease of diseases) {
    if (typeof disease.slug === "string" && disease.slug.trim() !== "") {
      continue;
    }

    const baseSlug = slugify(disease.disease_name) || `disease-${disease.d_id}`;
    let nextSlug = baseSlug;
    let suffix = 1;

    while (usedSlugs.has(nextSlug)) {
      nextSlug = `${baseSlug}-${suffix}`;
      suffix += 1;
    }

    usedSlugs.add(nextSlug);

    await sequelize.query(
      `UPDATE "${tableName}" SET slug = :slug WHERE d_id = :d_id`,
      {
        replacements: { slug: nextSlug, d_id: disease.d_id },
        type: QueryTypes.UPDATE,
      }
    );
  }

  const indexes = await queryInterface.showIndex(tableName);
  const hasSlugUniqueIndex = indexes.some(
    (index) =>
      index.unique &&
      Array.isArray(index.fields) &&
      index.fields.some((field) => field.attribute === "slug")
  );

  if (!hasSlugUniqueIndex) {
    await queryInterface.addIndex(tableName, ["slug"], {
      unique: true,
      name: "diseases_slug_unique",
    });
  }
}

export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL is connected successfully");
    await ensureDiseaseSlugColumn();
    console.log("Database models synchronized successfully");

    
  } catch (err) {
    console.error("Database connection error", err.message);
    throw err;
  }
}


export default sequelize;
