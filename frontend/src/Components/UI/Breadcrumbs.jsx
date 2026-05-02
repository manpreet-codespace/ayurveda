import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathNames = location.pathname.split("/").filter((x) => x);

  return (
    <>
    <div className='text-black h-40 w-full bg-(--pink) px-20 flex flex-col justify-center'>
    <h1 className='text-[52px]'>
      {pathNames}
    </h1>
      <nav className='mt-2'>
      
        <Link to="/">
      
          Home
        </Link>

        {
          pathNames.map((value, index) => {
            const to = "/" + pathNames.slice(0, index + 1).join("/");
            
            const formattedName = value.charAt(0).toUpperCase() +
            value.slice(1).replace(/-/g, " ");
            
            
            return (
              
              <span key={to}>
                <span>/</span>

                {
                  index === pathNames.length - 1 ? (
                    <span>
                      {formattedName}
                    </span>
                  ) :
                  (
                    <Link to={to}>
                        {formattedName}
                      </Link>
                    )
                }
              </span>
            )
          })}
      </nav>
          </div>
    </>
  )
}

export default Breadcrumbs