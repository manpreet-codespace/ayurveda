import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <>
            <div className='h-screen w-64 fixed '>
                <h2 className=''>Admin Panel</h2>
                <nav className='flex flex-col '>
                    <Link to="/admin/dashboard">Dashboard</Link>
                    <Link to="/admin/products">Product</Link>
                    <Link to="/admin/disease">Dieases</Link>
                </nav>
            </div>
        </>
    )
}

export default Sidebar