import React from 'react'

const EditButton = ({btn,onClick}) => {
  return (
    <>
        <button className='bg-black text-white px-2 py-1 rounded'
        onClick={onClick}>{btn}</button>
    </>
  )
}

export default EditButton