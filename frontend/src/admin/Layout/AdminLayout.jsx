import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const AdminLayout = () => {
  return (

    <>
        <div className='flex'>
                <Sidebar/>
            <div className='ml-64 flex-1'>
                <Navbar/>
                    <div className='mt-16'>
                        <Outlet/>
                    </div>
            </div>
          
        </div>
    </>
  )
}

export default AdminLayout