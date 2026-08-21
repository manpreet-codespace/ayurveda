import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_BASE_URL } from './config/api'
import { Heart, ShoppingBag } from 'lucide-react'

const productImageUrl = (image) => {
  if (!image) return null

  try {
    const parsed = typeof image === 'string' ? JSON.parse(image) : image
    image = Array.isArray(parsed) ? parsed[0] : parsed
  } catch {
    // Image is already a single path.
  }

  if (typeof image !== 'string') return null
  if (/^https?:\/\//i.test(image)) return image
  return `${API_BASE_URL}/${image.replace(/^\/+/, '')}`
}

const Wishlist = () => {
  const [wishlistDetails, setWishlistDetails] = useState([]);
  const token = localStorage.getItem("authToken")

  useEffect(() => {
    const fetchWishlistDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/get-wishlist`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setWishlistDetails(response.data?.wishlist?.WishlistItems || [])
      } catch (err) {
        console.log(err.message)
      }
    }

    fetchWishlistDetails()
  }, [token])


  const handleRemoveWishlist =async(wishlistItemId)=>{
    try{
        const response = await axios.delete(`${API_BASE_URL}/delete-wishlist/${wishlistItemId}`,
            {
                headers:{
                    Authorization:
                        `Bearer ${token}`
                    
                }
            }
        )

        setWishlistDetails((items)=>
            items.filter((item)=>item.wi_id!== wishlistItemId)
        )
    }
    catch(err)
    {
        console.log(err.message);

    }
  }
  return (
    <>
      <main className='min-h-[70vh] bg-stone-50 py-10 sm:py-14'>
        <div className='mx-auto w-11/12 max-w-6xl'>
          <div className='mb-9 flex flex-wrap items-end justify-between gap-4'>
            <div>
              <p className='mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700'>Saved for later</p>
              <h1 className='text-3xl font-semibold text-stone-900 sm:text-4xl'>My wishlist</h1>
              <p className='mt-2 text-sm text-stone-500'>Your favourite wellness essentials, all in one place.</p>
            </div>
            <div className='flex min-w-27 items-center gap-3 rounded-2xl border border-rose-200 bg-white px-4 py-3 shadow-sm'>
              <span className='flex h-9 w-9 items-center justify-center rounded-full bg-rose-500 text-base font-bold text-white shadow-sm'>
                {wishlistDetails.length}
              </span>
              <span className='text-xs font-bold uppercase leading-4 tracking-wider text-rose-700'>
                {wishlistDetails.length === 1 ? 'Saved item' : 'Saved items'}
              </span>
            </div>
          </div>

          {wishlistDetails.length === 0 ? (
            <section className='rounded-3xl bg-white px-6 py-18 text-center shadow-[0_18px_55px_-30px_rgba(26,72,52,0.35)]'>
              <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-500'>
                <Heart size={28} />
              </div>
              <h2 className='mt-5 text-xl font-semibold text-stone-900'>Your wishlist is waiting</h2>
              <p className='mx-auto mt-2 max-w-sm text-sm leading-6 text-stone-500'>Save products you love and return to them whenever you are ready.</p>
            </section>
          ) : (
            <section className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
              {wishlistDetails.map((item) => {
                const product = item.Product || {}
                const imageUrl = productImageUrl(product.image)
                const price = Number(product.price) || 0
                const discount = Number(product.discount) || 0
                const salePrice = discount > 0 ? price - (price * discount) / 100 : price

                return (
                  <article key={item.wi_id} className='group overflow-hidden rounded-2xl bg-white shadow-[0_14px_40px_-28px_rgba(26,72,52,0.5)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_-28px_rgba(26,72,52,0.55)]'>
                    <div className='relative flex h-62 items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 to-amber-50 p-6'>
                      {discount > 0 && <span className='absolute left-4 top-4 rounded-full bg-emerald-700 px-3 py-1 text-xs font-bold text-white'>{discount}% OFF</span>}
                      <span className='absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-rose-500 shadow-sm'>
                        <Heart size={17} fill='currentColor' />
                      </span>
                      {imageUrl ? <img src={imageUrl} alt={product.p_name || 'Wishlist product'} className='h-full w-full object-contain transition duration-300 group-hover:scale-105' /> : <ShoppingBag size={42} className='text-emerald-700' />}
                    </div>
                    <div className='p-5'>
                      <p className='text-xs font-bold uppercase tracking-[0.15em] text-emerald-700'>Ayurvedic wellness</p>
                      <h2 className='mt-2 truncate text-lg font-semibold text-stone-900'>{product.p_name || 'Product'}</h2>
                      <div className='mt-3 flex items-center gap-2'>
                        <span className='text-xl font-semibold text-emerald-800'>₹{salePrice.toFixed(0)}</span>
                        {discount > 0 && <span className='text-sm text-stone-400 line-through'>₹{price.toFixed(0)}</span>}
                      </div>
                      <div className='mt-5 flex gap-3'>
                        <button type='button' className='flex-1 rounded-xl bg-emerald-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900'>Add to cart</button>
                        <button type='button' aria-label='Saved to wishlist' onClick={()=>handleRemoveWishlist(item.wi_id)} className='flex h-11 w-11 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-500'>
                          <Heart size={18} fill='currentColor' />
                        </button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </section>
          )}
        </div>
      </main>
    </>
  )
}

export default Wishlist
