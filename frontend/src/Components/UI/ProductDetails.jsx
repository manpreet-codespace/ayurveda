import React from 'react'


const ProductDetails = (product) => {
    return (
        <>
            <div className='my-10'>
                <div className='flex'>
                    <div>
                        <img src={product.img} alt={product.name} />

                    </div>
                    <div>
                        <div>

                            <h1>{product.name}</h1>
                            <h2>{product.price}</h2>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default ProductDetails