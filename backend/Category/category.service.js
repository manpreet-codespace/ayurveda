import Category from "./category.model.js";
import sq from "sequelize";
import productCategory from "./productCategory.model.js";

const { Op, fn, col, where } = sq;

export const saveCategoryServices = async ({ category_name }, transaction) => {
  const trimmedCategoryName = category_name.trim();

  const existingCategory = await Category.findOne({
    where: where(
      fn("LOWER", col("category_name")),
      Op.eq,
      trimmedCategoryName.toLowerCase()
    ),
    transaction
  });

  if (existingCategory) {
    const error = new Error("Category already exists");
    error.statusCode = 409;
    throw error;
  }

  const category = await Category.create(
    {
      category_name: trimmedCategoryName
    },
    {transaction,},
  );
  return category;
};


export const saveProductCategoryServices = async({product_category_name},transaction)=>{

  const trimmedProductCategoryName = product_category_name.trim();

  const existingProductCategory = await productCategory.findOne({
    where:where(
      fn("LOWER",col("product_category_name")),
      Op.eq,
      trimmedProductCategoryName.toLowerCase()
    ),
    transaction
  });

  if(existingProductCategory)
  {
    const error = new Error("Product category already exists");
    error.statusCode = 409;
    throw error;

  }

  const product_category = await productCategory.create(
    {
      product_category_name:trimmedProductCategoryName
    },
    {transaction}
  )

  return product_category;

}