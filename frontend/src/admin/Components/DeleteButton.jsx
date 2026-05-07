import React from 'react'

const DeleteButton = ({deleteBtn}) => {
  return (
    <>
    <button className='bg-red-500 text-white px-2 py-1 rounded'>
        {deleteBtn}
    </button>
    </>
  )
}

export default DeleteButton