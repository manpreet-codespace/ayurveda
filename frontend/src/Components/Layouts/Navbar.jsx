import React, { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaSearchengin, FaTwitter } from "react-icons/fa6";
import logo from '../../assets/ayurveda_logo.avif';
import {LuAlignJustify, LuHeart, LuSearch, LuShoppingBag} from "react-icons/lu";
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';


const Navbar = () => {

    const token = localStorage.getItem("authToken");
    const [wishlistCount,setWishlistCount] =useState("");
    const [cartCount,setCartCount] =useState("");

    const fetchWishlistCount=async()=>
    {
        try{
            const response = await axios.get(`${API_BASE_URL}/wishlist-count`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )

            setWishlistCount(response.data?.count);

        }
        catch(err){
            console.log(err.message);

        }
    }

       const fetchCartCount=async()=>
    {
        try{
            const response = await axios.get(`${API_BASE_URL}/cart-count`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )

            setCartCount(response.data?.count);

        }
        catch(err){
            console.log(err.message);

        }
    }

    useEffect(()=>{
        fetchWishlistCount();
        fetchCartCount();
        
    },[])
    useEffect(()=>{

        fetchCartCount();

    },[])
  return (
    <>
    <nav className='w-full' aria-label='main navigation'>
        <div className='w-full text-center' >
            <a href='tel:+91770797059' className='bg-[var(--brown)] text-white text-[24px] py-2 font-semibold w-full block '>CALL NOW +91 77079 77059</a>
        </div>
        <div className='flex justify-between px-10 py-4 items-center'>
            <div className='left flex w-30 justify-between '>
                <Link to='/facebook' aria-label='Facebook'><FaFacebookF size={24}/></Link>
                <Link to='/instagram' aria-label= "Instagram"><FaInstagram size={24}/></Link>
                <Link to='/twitter' aria-label='Twitter'><FaTwitter size={24}/></Link>
            </div>
            <div className='center'>
                <img src={logo}  alt="Ayurvedic logo"  className='h-18'/>
           </div>
            <div className='right flex w-50 justify-between'>
                    <Link to='/' aria-label= " Search"><LuSearch size={24}/></Link>
                    <Link to='/get-wishlist' className='relative inline-flex' aria-label={`Wishlist${wishlistCount ? `, ${wishlistCount} items` : ''}`}>
                        <LuHeart size={24}/>
                        {wishlistCount > 0 && <span className='absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-rose-500 px-1 text-[10px] font-bold leading-none text-white shadow-sm'>
                            {wishlistCount > 99 ? '99+' : wishlistCount}
                        </span>}
                    </Link>
                      <Link to='/get-cart' className='relative inline-flex' aria-label={`Cart${cartCount ? `, ${cartCount} items` : ''}`}>
                       <LuShoppingBag size={24}/>
                        {cartCount > 0 && <span className='absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-rose-500 px-1 text-[10px] font-bold leading-none text-white shadow-sm'>
                            {cartCount > 99 ? '99+' : cartCount}
                        </span>}</Link>
                    <Link to='/' aria-label='More menu'><LuAlignJustify size={24}/></Link>
            </div>
        </div>

        <div className='bg-[var(--background)] flex p-4 justify-center items-center gap-8 text-[20px] font-light '>
            <NavLink to='/' className={({isActive})=>`hover:text-red-500 ${
                isActive ? 'text-red-500': 'text-black'
            }`}>Home</NavLink>
            <NavLink to='/ayurveda' className={({isActive})=>`hover:text-red-500 ${
                isActive ? 'text-red-500': 'text-black'
            }`}>Ayurveda</NavLink>
            <NavLink to='/diseases' className={({isActive})=>`hover:text-red-500 ${
                isActive ? 'text-red-500': 'text-black'
            }`}>Diseases</NavLink>
            <NavLink to='/products' className={({isActive})=>`hover:text-red-500 ${
                isActive ? 'text-red-500': 'text-black'
            }`}>Products</NavLink>
            <NavLink to='/gallery' className={({isActive})=>`hover:text-red-500 ${
                isActive ? 'text-red-500': 'text-black'
            }`}>Gallery</NavLink>
            <NavLink to='/join-hands' className={({isActive})=>`hover:text-red-500 ${
                isActive ? 'text-red-500': 'text-black'
            }`}>Join-Hands</NavLink>
            <NavLink to='/contact' className={({isActive})=>`hover:text-red-500 ${
                isActive ? 'text-red-500': 'text-black'
            }`}>Contact</NavLink>
        </div> 
    </nav>
    </>
  )
}

export default Navbar
