import Product from './product.model.js';


export const saveProductImages = async(files) =>{
    try{
        return (files || []).map(f=>`uploads/${f.filename}`)
    }
    catch(err)
    {
        throw new Error(err.message);

    }
}
export const saveProductService = async ({ c_id, p_name, price, discount, sku, variant, image, description }, transaction) => {
    try {
        const product = await Product.create({
            c_id,
            p_name,
            price,
            discount,
            sku,
            variant,
            image: JSON.stringify(image || []),
            description
        },
        {transaction} )

        return product;
    }
    catch(err)
    {
        throw new Error(err.message);
    }
}


