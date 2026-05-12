import Disease from "./disease.model.js";

export const saveDiseaseService = async ({ disease_name, c_id }, transaction) => {
    try {
        const newDisease = await Disease.create({
            disease_name,
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

        disease.disease_name = disease_name;
        disease.c_id = c_id;

        await disease.save({ transaction });

        return disease;
    }
    catch (err) {
        throw new Error(err.message);
    }
}
