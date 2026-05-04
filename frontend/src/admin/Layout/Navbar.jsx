import React from 'react'

const Navbar = () => {
  return (
    <>
        <div>
            <nav className='bg-(--brown) h-16 text-white'>
                <a href='tel: 7707977059'>CALL CENTER +91 77079 77059</a>

                <input type='search' placeholder='Search'/>

                <span>Profile</span>
            </nav>
        </div>
    </>
  )
}

export default Navbar