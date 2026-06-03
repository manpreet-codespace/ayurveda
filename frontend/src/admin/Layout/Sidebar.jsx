import React from 'react'
import { Link } from 'react-router-dom'
import {LuActivity,LuStethoscope,LuLeaf,LuImages} from 'react-icons/lu';
import { FaBox} from "react-icons/fa";

const Sidebar = () => {
    return (
        <>
            <div className='h-screen w-64 fixed border-r-1 border-gray-300'>
                <div className='h-20 flex flex-col justify-center items-center border-b-1 border-gray-300'>
                    <h2 className='text-lg font-semibold'>Admin Panel</h2>
                    <p className='text-xs text-left'>Yogaashram Remedies</p>
                </div>
                <nav className='flex flex-col mt-10 w-7/12 mx-auto'>
                    <Link to="/admin/dashboard" className='flex gap-2 items-center py-2'><span><LuActivity/></span>Dashboard</Link>
                    <Link to="/admin/products" className='flex gap-2 items-center py-2'><span><FaBox/></span>Product</Link>
                    <Link to="/admin/disease" className='flex gap-2 items-center py-2'><span><LuLeaf/></span>Disease</Link>
                    <Link to="/admin/treatment" className='flex gap-2 items-center py-2'><span><LuStethoscope/></span>Treatment</Link>
                    <Link to="/admin/gallery" className='flex gap-2 items-center py-2'><span><LuImages /></span>Gallery</Link>

                </nav>
            </div>
        </>
    )
}

export default Sidebar