import Product from './product.model.js';

export const saveProductService = async ({ c_id,p_name, price, discount, sku, variant }, transaction) => {
    try {
        const product = await Product.create({
            c_id,
            p_name,
            price,
            discount,
            sku,
            variant
        },
        {transaction} )

        return product;
    }
    catch(err)
    {
        throw new Error(err.message);
    }
}


