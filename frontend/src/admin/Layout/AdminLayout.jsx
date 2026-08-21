import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Suspense } from 'react'
import {Vortex} from 'react-loader-spinner'


const AdminLayout = () => {
    return (

        <>
            <div className='flex bg-(--cream) h-screen'>
                <Sidebar />
                <div className='ml-64 flex-1'>
                    <Navbar />
                    <div className='pt-20 overflow-scroll no-scrollbar h-screen'>
                        <Suspense fallback={
                            <div className='flex justify-center items-center h-screen'>
                            <Vortex visible={true}
                            height="80"
                            width="80"
                            ariaLabel="vortex-loading"
                            wrapperStyle={{}}
                            wrapperClass="vortex-wrapper"
                            colors={['violet', 'yellow', 'red', 'pink', 'black', 'white']} />
                            </div>
                            }>

                            <Outlet />
                        </Suspense>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AdminLayout
