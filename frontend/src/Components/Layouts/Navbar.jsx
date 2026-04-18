import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaSearchengin, FaTwitter } from "react-icons/fa6";
import logo from '../../assets/ayurveda_logo.avif';
import {LuAlignJustify, LuHeart, LuSearch, LuShoppingBag} from "react-icons/lu";


const Navbar = () => {
  return (
    <>
    <nav className='w-full'>
        <div className='w-full text-center' >
            <a href='tel:+91770797059' className='bg-[var(--brown)] text-white text-[24px] py-2 font-semibold w-full block '>CALL NOW +91 77079 77059</a>
        </div>
        <div className='flex justify-between px-10 py-4 items-center'>
            <div className='left flex w-30 justify-between '>
                <Link to='/'><FaFacebookF size={24}/></Link>
                <Link to='/'><FaInstagram size={24}/></Link>
                <Link to='/'><FaTwitter size={24}/></Link>
            </div>
            <div className='center'>
                <img src={logo}  alt="Ayurvedic logo"  className='h-18'/>
           </div>
            <div className='right flex w-50 justify-between'>
                    <Link to='/'><LuSearch size={24}/></Link>
                    <Link to='/'><LuHeart size={24}/></Link>
                    <Link to='/'><LuShoppingBag size={24}/></Link>
                    <Link to='/'><LuAlignJustify size={24}/></Link>
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
