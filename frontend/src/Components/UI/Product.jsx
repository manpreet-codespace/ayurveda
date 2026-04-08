import React from 'react'

const Product = () => {
  return (
    <>
        <div className='w-5/12 p-4 '>
            <div className=''>
                <img src={product1} alt="medicine"/>
            </div>
            <div>
                <h2 className='text-[18px]'>name</h2>
                <p className='text-black/70 text-[16px]'>Price</p>
            </div>
        </div>
    </>
  )
}

export default Product