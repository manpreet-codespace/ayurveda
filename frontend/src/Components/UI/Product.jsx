import React, { useState } from 'react'
import { FiEye, FiHeart, FiShoppingCart } from 'react-icons/fi'

const Product = ({name,img,price}) => {
  const [activeAction, setActiveAction] = useState(null)

  const actionButtonClass = (action) =>
    `flex h-9 w-9 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
      activeAction === action
        ? 'bg-[#d11972] text-white scale-95'
        : 'bg-white text-sm text-[#d11972] hover:bg-[#d11972] hover:text-white active:scale-95 active:bg-[#8f0f4e]'
    }`

  return (
    <div className='group w-50 p-4'>
      <div className='relative overflow-hidden bg-white'>
        <img
          src={img}
          alt={name}
          className='h-64 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105'
        />

        <div className='pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/25' />

        <div className='absolute inset-x-0 bottom-4 flex justify-center gap-2 opacity-0 translate-y-4 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'>
          <button
            type='button'
            aria-label='Add to cart'
            className={actionButtonClass('cart')}
            onClick={() => setActiveAction('cart')}
          >
            <FiShoppingCart />
          </button>
          <button
            type='button'
            aria-label='Quick view'
            className={actionButtonClass('view')}
            onClick={() => setActiveAction('view')}
          >
            <FiEye />
          </button>
          <button
            type='button'
            aria-label='Add to wishlist'
            className={actionButtonClass('wishlist')}
            onClick={() => setActiveAction('wishlist')}
          >
            <FiHeart />
          </button>
        </div>
      </div>

      <div className='mt-4 space-y-1'>
        <h2 className='text-[18px] font-medium text-[var(--text-primary)]'>{name}</h2>
        <p className='text-[16px] text-black/70'>Rs. {price}</p>
      </div>
    </div>
  )
}

export default Product
