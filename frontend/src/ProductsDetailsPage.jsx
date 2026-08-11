import React, { useEffect, useState } from 'react'
import Footer from './Components/Layouts/Footer'
import Navbar from './Components/Layouts/Navbar'
import { useParams } from 'react-router-dom'
import { API_BASE_URL } from './config/api.js';
import axios from 'axios';
import placeholderImage from './assets/product1.webp';

const ProductsDetailsPage = () => {
  const { p_id } = useParams()
  const [productDetail, setProductDetail] = useState(null)
  const [selectedButton, setSelectedButton] = useState('Description')
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] =useState(1);
  const maxQuantity = 10;
  const [cart,setCart] = useState({
    p_id:"",
    quantity:""
  });


  const increase = () => {
    if (quantity < maxQuantity) {
      setQuantity((prev) => prev + 1)
    }
  }

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const getImageList = (imageValue) => {
    if (!imageValue) return [placeholderImage]

    let resolvedImages = imageValue

    if (typeof resolvedImages === 'string') {
      try {
        const parsed = JSON.parse(resolvedImages)
        if (Array.isArray(parsed) && parsed.length > 0) {
          resolvedImages = parsed
        }
      } catch {
        resolvedImages = [resolvedImages]
      }
    }

    if (!Array.isArray(resolvedImages)) {
      resolvedImages = [resolvedImages]
    }

    return resolvedImages
      .map((item) => {
        if (typeof item !== 'string') return null

        const trimmed = item.trim()
        if (!trimmed) return null

        if (/^https?:\/\//i.test(trimmed)) return trimmed
        if (trimmed.startsWith('/')) return `${API_BASE_URL}${trimmed}`
        return `${API_BASE_URL}/${trimmed}`
      })
      .filter(Boolean)
  }

  const imageList = getImageList(productDetail?.image)

  const getSafeDescription = (description) => {
    if (!description) return ''

    return String(description)
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .trim()
  }

  const safeDescription = getSafeDescription(productDetail?.description)
  const originalPrice = Number(productDetail?.price || 0)
  const discountPercent = Number(productDetail?.discount || 0)
  const discountedPrice = discountPercent > 0
    ? originalPrice - (originalPrice * discountPercent) / 100
    : originalPrice

  useEffect(() => {
    setActiveImageIndex(0)
  }, [p_id])

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/product-category-data/${p_id}`)
        setProductDetail(response?.data?.product || null)
      } catch (err) {
        console.log(err.message)
      }
    }

    if (p_id) {
      fetchProductDetails()
    }
  }, [p_id])

  const token = localStorage.getItem("authToken");

const handleAddToCart = async() =>{
  try{
      const response = await axios.post(`${API_BASE_URL}/cart`,
        {
          p_id:productDetail.p_id,
          quantity
        },
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )

      console.log(response.data);

  }
  catch(err)
  {
    console.log(err);

  }
}

  return (
    <>
      <Navbar />
      <main className='bg-stone-50 py-10 sm:py-14'>
        <div className='mx-auto w-11/12 max-w-6xl'>
          <p className='mb-5 text-sm font-medium text-stone-500'>Home / Products / <span className='text-emerald-700'>{productDetail?.p_name || 'Product details'}</span></p>
          <section className='grid gap-8 rounded-3xl bg-white p-5 shadow-[0_18px_55px_-30px_rgba(26,72,52,0.35)] sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-12 lg:p-10'>
            <div className='min-w-0'>
              <div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-amber-50 p-4 sm:p-8'>
                {discountPercent > 0 && <span className='absolute left-5 top-5 rounded-full bg-emerald-700 px-3 py-1 text-xs font-bold text-white'>{discountPercent}% OFF</span>}
                <img
                  src={imageList[activeImageIndex] || placeholderImage}
                  alt={productDetail?.p_name || 'Product image'}
                  className='h-75 w-full object-contain mix-blend-multiply sm:h-105'
                />
              </div>

              {imageList.length > 1 && (
                <div className='mt-4 flex flex-wrap gap-3'>
                  {imageList.map((img, index) => (
                    <button
                      key={`${img}-${index}`}
                      type='button'
                      onClick={() => setActiveImageIndex(index)}
                      className={`h-17 w-17 overflow-hidden rounded-xl border-2 bg-stone-50 p-1 transition ${activeImageIndex === index ? 'border-emerald-700 shadow-sm' : 'border-transparent hover:border-emerald-200'}`}
                    >
                      <img src={img} alt={`Product preview ${index + 1}`} className='h-full w-full object-contain' />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className='flex flex-col justify-center'>
              <p className='text-xs font-bold uppercase tracking-[0.18em] text-emerald-700'>Ayurvedic wellness</p>
              <h1 className='mt-3 text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl'>{productDetail?.p_name || 'Product name'}</h1>
              <div className='mt-5 flex flex-wrap items-center gap-3'>
                {discountPercent > 0 ? (
                  <>
                    <p className='text-base text-stone-400 line-through'>₹{originalPrice.toLocaleString('en-IN')}</p>
                    <p className='text-3xl font-semibold text-emerald-800'>₹{discountedPrice.toFixed(0)}</p>
                    <span className='rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800'>Save {discountPercent}%</span>
                  </>
                ) : (
                  <p className='text-3xl font-semibold text-emerald-800'>₹{originalPrice.toLocaleString('en-IN')}</p>
                )}
              </div>

              <div className='my-6 grid grid-cols-2 gap-3 border-y border-stone-100 py-5 text-sm'>
                <div><span className='block text-xs uppercase tracking-wide text-stone-400'>SKU</span><span className='mt-1 block font-medium text-stone-700'>{productDetail?.sku || '—'}</span></div>
                <div><span className='block text-xs uppercase tracking-wide text-stone-400'>Variant</span><span className='mt-1 block font-medium text-stone-700'>{productDetail?.variant || '—'}</span></div>
              </div>

              <div className='flex flex-wrap items-center gap-4'>
                <div className='flex items-center rounded-xl border border-stone-200 bg-stone-50 p-1'>
                  <button type='button' onClick={decrease} className='flex h-9 w-9 items-center justify-center rounded-lg text-xl text-stone-600 transition hover:bg-white hover:text-emerald-700'>−</button>
                  <span className='w-10 text-center font-semibold text-stone-900'>{quantity}</span>
                  <button type='button' onClick={increase} className='flex h-9 w-9 items-center justify-center rounded-lg text-xl text-stone-600 transition hover:bg-white hover:text-emerald-700'>+</button>
                </div>
                <span className='text-sm text-stone-500'>Up to {maxQuantity} per order</span>
              </div>

              <div className='mt-6 grid gap-3 sm:grid-cols-2'>
                <button onClick={handleAddToCart} className='rounded-xl border-2 border-emerald-700 px-5 py-3 font-semibold text-emerald-800 transition hover:bg-emerald-50'>Add to cart</button>
                <button className='rounded-xl bg-emerald-800 px-5 py-3 font-semibold text-white shadow-lg shadow-emerald-900/15 transition hover:bg-emerald-900'>Buy now</button>
              </div>

              <div className='mt-8'>
                <div className='flex gap-6 border-b border-stone-200'>
                  {['Description', 'Dosage'].map((btn) => (
                    <button key={btn} onClick={() => setSelectedButton(btn)} className={`border-b-2 px-1 pb-3 text-sm font-semibold transition ${selectedButton === btn ? 'border-emerald-700 text-emerald-800' : 'border-transparent text-stone-400 hover:text-stone-700'}`}>{btn}</button>
                  ))}
                </div>
                {selectedButton === 'Description' ? (
                  safeDescription ? <p className='mt-4 text-sm leading-7 text-stone-600'>{safeDescription}</p> : <p className='mt-4 text-sm text-stone-500'>No description available.</p>
                ) : (
                  <p className='mt-4 text-sm leading-7 text-stone-600'>Dosage details will be added here.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>


      <Footer />
    </>
  )
}

export default ProductsDetailsPage
