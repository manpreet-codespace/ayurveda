import { Op } from "sequelize";
import Disease from "./disease.model.js";

const slugify = (text = "") =>
    text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");

const buildUniqueSlug = async (diseaseName, excludeId, transaction) => {
    const baseSlug = slugify(diseaseName) || "disease";
    let nextSlug = baseSlug;
    let suffix = 1;

    while (true) {
        const where = { slug: nextSlug };

        if (excludeId) {
            where.d_id = { [Op.ne]: excludeId };
        }

        const existingDisease = await Disease.findOne({
            where,
            transaction
        });

        if (!existingDisease) {
            return nextSlug;
        }

        nextSlug = `${baseSlug}-${suffix}`;
        suffix += 1;
    }
};

export const saveDiseaseService = async ({ disease_name, c_id }, transaction) => {
    try {
        const trimmedDiseaseName = disease_name.trim();
        const slug = await buildUniqueSlug(trimmedDiseaseName, null, transaction);

        const newDisease = await Disease.create({
            disease_name: trimmedDiseaseName,
            slug,
            c_id
        },
            { transaction }
        );

        return newDisease;
    }
    catch (err) {
        throw new Error(err.message);

    }
};


export const deleteDiseaseService = async (d_id, transaction) => {
    try {

        const deletedDisease = await Disease.destroy({
            where: {
                d_id
            },
            transaction
        })

            return deletedDisease;
            
    }
    catch (err) {
        throw new Error(err.message);
    }
}

export const updateDiseaseService = async (d_id, { disease_name, c_id }, transaction) => {
    try {
        const disease = await Disease.findByPk(d_id, { transaction });

        if (!disease) {
            return null;
        }

        const trimmedDiseaseName = disease_name.trim();
        const slug = await buildUniqueSlug(trimmedDiseaseName, d_id, transaction);

        disease.disease_name = trimmedDiseaseName;
        disease.slug = slug;
        disease.c_id = c_id;

        await disease.save({ transaction });

        return disease;
    }
    catch (err) {
        throw new Error(err.message);
    }
}

export const getDiseaseDescriptionService = async (slug) => {
    try {
        const disease = await Disease.findOne({
            where: {
                slug
            }
        });

        if (!disease) {
            return null;
        }

        return disease;
    }
    catch (err) {
        throw new Error(err.message);
    }
};

export const updateDiseaseDescriptionService = async (d_id, description, transaction) => {
    try {
        const disease = await Disease.findByPk(d_id, { transaction });

        if (!disease) {
            return null;
        }

        disease.description = description;

        await disease.save({ transaction });

        return disease;
    }
    catch (err) {
        throw new Error(err.message);
    }
}
