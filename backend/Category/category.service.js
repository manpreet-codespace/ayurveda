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


export const saveProductCategoryServices = async({productCategoryName},transaction)=>{

  const trimmedProductCategoryName = productCategoryName.trim();

  const existingProductCategory = await productCategory.findOne({
    where:where(
      fn("LOWER",col("productCategoryName")),
      Op.eq,
      trimmedProductCategoryName.toLowerCase()
    ),
    transaction
  });

  if(existingCategory)
  {
    const error = new Error("Product category already exists");
    error.statusCode = 409;
    throw error;

  }

  const product_category = await productCategory.create(
    {
      productCategoryName:trimmedProductCategoryName
    },
    {transaction}
  )

  return product_category;

}