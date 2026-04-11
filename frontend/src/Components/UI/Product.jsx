import React from 'react'

const Product = ({img, name,price}) => {
  return (
    <>
        <div className='w-56 h-72 p-4'>
            <div className='h-44 w-full overflow-hidden'>
                <img src={img} alt="medicine" className='h-full w-full object-cover'/>
            </div>
            <div className='py-2 px-1'>
                <h2 className='text-[18px]'>{name}</h2>
                <p className='text-black/70 text-[16px]'>{price}</p>
            </div>
        </div>
    </>
  )
}

export default Product
