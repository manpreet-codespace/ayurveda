import Category from "./category.model.js";

export const saveCategoryServices = async ({ category_name }, transaction) => {
  const category = await Category.create(
    {
      category_name
    },
    {transaction,},
  );
  return category;
};
