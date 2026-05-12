import React from 'react'

const DeleteButton = ({deleteBtn,onClick}) => {
  return (
    <>
    <button className='bg-red-500 text-white px-2 py-1 rounded'
    onClick={onClick}>
        {deleteBtn}
    </button>
    </>
  )
}

export default DeleteButton