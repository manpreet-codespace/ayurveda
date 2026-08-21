import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from './config/api';
import axios from 'axios';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const getProductImage = (image) => {
    if (!image) return null;

    try {
        const parsedImage = typeof image === 'string' ? JSON.parse(image) : image;
        image = Array.isArray(parsedImage) ? parsedImage[0] : parsedImage;
    } catch {
        // The product image is already a plain path.
    }

    if (typeof image !== 'string') return null;
    if (/^https?:\/\//i.test(image)) return image;
    return `${API_BASE_URL}/${image.replace(/^\/+/, '')}`;
};

const Cart = () => {

    const [cartDetail,setCartDetail] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const token = localStorage.getItem("authToken");

    const navigate = useNavigate();


    useEffect(()=>{
        const fetchCartDetails =async()=>{
            try{
                const response = await axios.get(`${API_BASE_URL}/get-cart`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                });

                setCartDetail(response.data.cart?.CartItems ?? []);

            }
            catch(err)
            {
                console.log(err.message)
            } finally {
                setIsLoading(false);
            }
        }

        fetchCartDetails();

    },[token])

    const updateQuantity = async(cartItemId, nextQuantity) => {
        try{
            if (nextQuantity < 1) return;

            const response = await axios.patch(`${API_BASE_URL}/update-cart/${cartItemId}`,
                {
                    quantity:nextQuantity
                },
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCartDetail((items) => items.map((item) =>
                item.ci_id === cartItemId ? { ...item, quantity: nextQuantity } : item
            ));


        }
        catch(err)
        {
            console.log(err.message);
        }
      
    };

    const removeItem = async(cartItemId) => {

        try{
            const response = await axios.delete(`${API_BASE_URL}/delete-cart/${cartItemId}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            setCartDetail((items) => items.filter((item) => item.ci_id !== cartItemId));
        }
        catch(err)
        {
            console.log(err.message);

        }

    };

    const subtotal = cartDetail.reduce((total, item) =>
        total + (Number(item.Product?.price) || 0) * (Number(item.quantity) || 1), 0
    );

    const shipping = subtotal > 0 ? 0 : 0; 
  return (
    <>
        <main className='min-h-[70vh] bg-stone-50 py-10 sm:py-14'>
            <div className='mx-auto w-11/12 max-w-6xl'>
                <div className='mb-8 flex items-end justify-between gap-4'>
                    <div>
                        <p className='mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700'>Your wellness selection</p>
                        <h1 className='text-3xl font-semibold text-stone-900 sm:text-4xl'>Shopping cart</h1>
                    </div>
                    <span className='rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-800'>
                        {cartDetail.length} {cartDetail.length === 1 ? 'item' : 'items'}
                    </span>
                </div>

                {isLoading ? (
                    <div className='rounded-2xl bg-white p-10 text-center text-stone-500 shadow-sm'>Loading your cart...</div>
                ) : cartDetail.length === 0 ? (
                    <div className='rounded-2xl bg-white px-6 py-16 text-center shadow-sm'>
                        <div className='mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700'>
                            <ShoppingBag size={28} />
                        </div>
                        <h2 className='text-xl font-semibold text-stone-900'>Your cart is empty</h2>
                        <p className='mx-auto mt-2 max-w-sm text-stone-500'>Add your favourite wellness products to see them here.</p>
                    </div>
                ) : (
                    <div className='grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_22rem]'>
                        <section className='overflow-hidden rounded-2xl bg-white shadow-sm'>
                            <div className='hidden grid-cols-[1fr_auto_auto_auto] gap-6 border-b border-stone-100 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-stone-400 sm:grid'>
                                <span>Product</span><span>Quantity</span><span>Price</span><span></span>
                            </div>
                            {cartDetail.map((item) => {
                                const product = item.Product || {};
                                const quantity = Number(item.quantity) || 1;
                                const price = Number(product.price) || 0;
                                const imageUrl = getProductImage(product.image);

                                return (
                                    <article key={item.ci_id} className='grid gap-5 border-b border-stone-100 p-5 last:border-0 sm:grid-cols-[minmax(0,1fr)_auto_auto_auto] sm:items-center sm:gap-6 sm:px-6'>
                                        <div className='flex min-w-0 items-center gap-4' onClick={()=>navigate(`/product-details/${product.p_id}`)}>
                                            <div className='h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-emerald-50'>
                                                {imageUrl ? <img src={imageUrl} alt={product.p_name || 'Product'} className='h-full w-full object-cover' /> : <ShoppingBag className='m-6 text-emerald-700' />}
                                            </div>
                                            <div className='min-w-0'>
                                                <h2 className='truncate font-semibold text-stone-900'>{product.p_name || 'Product'}</h2>
                                                {product.variant && <p className='mt-1 text-sm text-stone-500'>{product.variant}</p>}
                                                <p className='mt-2 text-sm font-semibold text-emerald-700 sm:hidden'>₹{(price * quantity).toLocaleString('en-IN')}</p>
                                            </div>
                                        </div>
                                        <div className='flex w-fit items-center rounded-lg border border-stone-200'>
                                            <button aria-label='Decrease quantity' onClick={() => updateQuantity(item.ci_id, quantity - 1)} className='p-2 text-stone-500 transition hover:text-emerald-700'><Minus size={16} /></button>
                                            <span className='w-8 text-center text-sm font-semibold'>{quantity}</span>
                                            <button aria-label='Increase quantity' onClick={() => updateQuantity(item.ci_id, quantity + 1)} className='p-2 text-stone-500 transition hover:text-emerald-700'><Plus size={16} /></button>
                                        </div>
                                        <p className='hidden min-w-20 text-right font-semibold text-stone-900 sm:block'>₹{(price * quantity).toLocaleString('en-IN')}</p>
                                        <button aria-label={`Remove ${product.p_name || 'product'}`} onClick={() => removeItem(item.ci_id)} className='w-fit text-stone-400 transition hover:text-red-600'><Trash2 size={19} /></button>
                                    </article>
                                );
                            })}
                        </section>

                        <aside className='rounded-2xl bg-(--footer-bg) p-6 text-white shadow-sm'>
                            <h2 className='text-xl font-semibold'>Order summary</h2>
                            <div className='mt-6 space-y-4 border-b border-white/15 pb-5 text-sm'>
                                <div className='flex justify-between text-emerald-50'><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
                                <div className='flex justify-between text-emerald-50'><span>Delivery</span><span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
                            </div>
                            <div className='mt-5 flex justify-between text-lg font-semibold'><span>Total</span><span>₹{(subtotal + shipping).toLocaleString('en-IN')}</span></div>
                            <button className='mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-300 px-4 py-3 font-semibold text-stone-900 transition hover:bg-amber-200'>
                                Proceed to checkout <ArrowRight size={18} />
                            </button>
                            <p className='mt-4 text-center text-xs leading-5 text-emerald-100'>Secure checkout • Free delivery on this order</p>
                        </aside>
                    </div>
                )}
            </div>
        </main>
    
    </>
  )
}

export default Cart
