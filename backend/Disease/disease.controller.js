import { saveCategoryServices } from "../Category/category.service.js";
import Category from "../Category/category.model.js";
import sequelize from "../db/pg_db.js";
import Disease from "./disease.model.js";
import { deleteDiseaseService, saveDiseaseService, updateDiseaseService } from "./disease.service.js";

export const saveDiseaseAndCategory = async(req, res)=>{
    const transaction = await sequelize.transaction();

    try{
        const { disease_name, category_name, c_id } = req.body;

        if (!category_name && !c_id) {
            return res.status(400).json({
                success: false,
                message: "category name or category id is required"
            });
        }

        let category;

        if (c_id) {
            category = await Category.findByPk(c_id, { transaction });

            if (!category) {
                await transaction.rollback();
                return res.status(404).json({
                    success: false,
                    message: "Category not found"
                });
            }
        } else {
            category = await saveCategoryServices(
                {
                    category_name
                },
                transaction
            );
        }

        if (!disease_name) {
            await transaction.commit();

            return res.status(201).json({
                success: true,
                message: "Category saved successfully",
                category
            });
        }

        const disease = await saveDiseaseService({
            disease_name,
            c_id:category.c_id
        },
    transaction
    );

        await transaction.commit();

        return res.status(201).json({
            success:true,
            message:"Disease saved successfully",
            category,
            disease

        })
    }
    catch(err)
    {
        await transaction.rollback();

        res.status(err.statusCode || 500).json({
            success:false,
            message:`Disease Error ${err.message}`})
    }
}

export const getDiseaseAndCategoryData = async (req, res) => {
    try {
        const categories = await Category.findAll({
            order: [["c_id", "ASC"]]
        });

        const diseases = await Disease.findAll({
            include: [
                {
                    model: Category,
                    attributes: ["c_id", "category_name"]
                }
            ],
            order: [["d_id", "ASC"]]
        });

        return res.status(200).json({
            success: true,
            categories,
            diseases
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Fetch Error ${err.message}`
        });
    }
};


export const deleteDisease = async(req,res)=> {
    const transaction = await sequelize.transaction();
    try{
        const {d_id} = req.params;
        
        if(!d_id)
        {
            return res.status(400).json({
                success:false,
                message:"Diease id is required"

            })
        }

        const deleted= await deleteDiseaseService(d_id,transaction);

            if(!deleted){
                await transaction.rollback();

                return res.status(404)
                .json({
                    success:false,
                    message:"Diease not found"
                })
            }

            await transaction.commit();

            return res.status(200)
            .json({
                success:true,
                message:"Diease deleted successfully"

            })


    }
    catch(err)
    {
        return res.status(500)
        .json({
            success:false,
            message:`diease deleted error ${err.message}`
        })
    }


}

export const updateDisease = async(req,res)=> {
    const transaction = await sequelize.transaction();

    try {
        const { d_id } = req.params;
        const { disease_name, c_id } = req.body;

        if (!d_id || !disease_name || !c_id) {
            await transaction.rollback();

            return res.status(400).json({
                success: false,
                message: "Disease id, disease name and category id are required"
            });
        }

        const category = await Category.findByPk(c_id, { transaction });

        if (!category) {
            await transaction.rollback();

            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        const disease = await updateDiseaseService(
            d_id,
            {
                disease_name,
                c_id
            },
            transaction
        );

        if (!disease) {
            await transaction.rollback();

            return res.status(404).json({
                success: false,
                message: "Disease not found"
            });
        }

        await transaction.commit();

        return res.status(200).json({
            success: true,
            message: "Disease updated successfully",
            disease,
            category
        });
    }
    catch(err) {
        await transaction.rollback();

        return res.status(500).json({
            success: false,
            message: `Disease update error ${err.message}`
        });
    }
}
