import React from 'react'

const Problems = ({ img, name }) => {
  return (
    <div
      className='group bg-[var(--primary-dark)] p-6 h-35 w-40 text-center rounded flex flex-col justify-between hover:bg-[var(--accent)]/50 transition-colors cursor-pointer'
    >
      <div>
        <img
          src={img}
          alt={name}
          className='mx-auto transition-transform duration-300 group-hover:translate-x-5 '
        />
      </div>
      <div>
        <h2>{name}</h2>
      </div>
    </div>
  )
}

export default Problems
