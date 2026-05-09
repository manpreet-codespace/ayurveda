import Disease from "./disease.model.js";

export const saveDiseaseService = async({disease_name,c_id},transaction)=>{
    try{
        const newDisease = await Disease.create({
            disease_name,
            c_id
        },
        {transaction}
    );

        return newDisease;
    }
    catch(err){
        throw new Error(err.message);

    }
};
