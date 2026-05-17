import React from 'react'
import { FaHome } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <>
      <div className='bg-blue-600 h-100 text-center text-white py-10'>
        <p className='font-bold text-[18px]'>We’re sorry — something has gone wrong on our end.</p>
        <p>If difficulties persist, please contact the System Administrator of this site and report the error below..</p>

        <button className='flex gap-3 items-center mx-auto my-10 bg-green-600 px-7 py-5 rounded-4xl'>
          <FaHome/> Back to Homepage
        </button>
      </div>
    </>
  )
}

export default NotFoundPage
