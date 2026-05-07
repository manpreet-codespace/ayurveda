import React from 'react'
import { LuBell } from 'react-icons/lu'
// import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <div className='bg-(--brown) h-16 fixed left-64 top-0 right-0 z-50'>
                <nav className='text-white flex h-16 justify-between items-center w-11/12 mx-auto'>
                    <div>
                        <a href='tel: 7707977059' className='font-semibold'>CALL CENTER +91 77079 77059</a>
                    </div>

                    <div className='flex justify-between gap-4 '>
                        <input type='search' placeholder='Search' className='w-64 p-2 rounded-lg bg-(--white)/10'/>
                        <div className='p-2 flex items-center rounded-lg  bg-(--white)/10'><LuBell/></div>
                        <span className='border-l-1 border-gray-300'>Profile</span>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navbar