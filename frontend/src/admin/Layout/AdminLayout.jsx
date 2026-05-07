import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const AdminLayout = () => {
  return (

    <>
        <div className='flex bg-(--cream) h-screen'>
                <Sidebar/>
            <div className='ml-64 flex-1'>
                <Navbar/>
                    <div className='pt-20 overflow-scroll no-scrollbar h-screen'>
                        <Outlet/>
                    </div>
            </div>
          
        </div>
    </>
  )
}

export default AdminLayout
