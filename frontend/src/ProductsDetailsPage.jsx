import React, { useEffect, useState } from 'react'
import Footer from './Components/Layouts/Footer'
import Navbar from './Components/Layouts/Navbar'
import { useParams } from 'react-router-dom'
import { API_BASE_URL } from './config/api'
import axios from 'axios'
import placeholderImage from './assets/product1.webp'

const ProductsDetailsPage = () => {
  const { p_id } = useParams()
  const [productDetail, setProductDetail] = useState(null)
  const [selectedButton, setSelectedButton] = useState('Description')
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] =useState(1);
  const maxQuantity = 10;
  const [cart,setCart] = useState({});



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

const addToCart = () =>{
  try{

  }
  catch(err)
  {
    console.log(err);

  }
}

  return (
    <>
      <Navbar />
      <div className='my-10 px-10 '>
        <div className='flex flex-wrap gap-8'>
          <div className='w-full max-w-md'>
            <img
              src={imageList[activeImageIndex] || placeholderImage}
              alt={productDetail?.p_name || 'Product image'}
              className='h-80 w-full object-cover rounded-lg border'
            />

            {imageList.length > 1 && (
              <div className='mt-3 flex flex-wrap gap-2'>
                {imageList.map((img, index) => (
                  <button
                    key={`${img}-${index}`}
                    type='button'
                    onClick={() => setActiveImageIndex(index)}
                    className={`h-16 w-16 overflow-hidden rounded border ${activeImageIndex === index ? 'border-green-600' : 'border-gray-200'}`}
                  >
                    <img src={img} alt={`Product preview ${index + 1}`} className='h-full w-full object-cover' />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className='ml-8'>
            <h1 className='text-2xl font-semibold'>{productDetail?.p_name || 'Product name'}</h1>
            <div className='mt-2 flex items-center gap-3'>
              {discountPercent > 0 ? (
                <>
                  <p className='text-lg text-gray-500 line-through'>Rs. {originalPrice}</p>
                  <p className='text-xl font-semibold text-red-600'>Rs. {discountedPrice.toFixed(0)}</p>
                </>
              ) : (
                <p className='text-lg'>Rs. {originalPrice}</p>
              )}
            </div>

            <p>SKU:- {productDetail?.sku}</p>
            <p>Variant:- {productDetail?.variant}</p>

            <div className='mt-4 flex items-center gap-2'>
              <button
                type='button'
                onClick={decrease}
                className='h-9 w-9 rounded-full border border-gray-300 text-xl'
              >
                -
              </button>
              <span className='min-w-8 text-center text-lg font-semibold'>{quantity}</span>
              <button
                type='button'
                onClick={increase}
                className='h-9 w-9 rounded-full border border-gray-300 text-xl'
              >
                +
              </button>
            </div>
            <div>        
              <button>Add to Cart</button>
              <button>Buy Now</button>
            </div>
            
            <div className='mt-4 flex gap-3'>
              {['Description', 'Dosage'].map((btn) => (
                <button
                  key={btn}
                  onClick={() => setSelectedButton(btn)}
                  className={`px-4 py-2 ${selectedButton === btn ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  {btn}
                </button>
              ))}
            </div>
            {selectedButton === 'Description' ? (
              safeDescription ? <p className='mt-4 text-gray-700'>{safeDescription}</p> : <p className='mt-4 text-gray-500'>No description available.</p>
            ) : (
              <p className='mt-4 text-gray-700'>Dosage details will be added here.</p>
            )}
          </div>
        </div>
      </div>


      <Footer />
    </>
  )
}

export default ProductsDetailsPage