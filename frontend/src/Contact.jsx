import React from 'react'
import Breadcrumbs from './Components/UI/Breadcrumbs'
import Navbar from './Components/Layouts/Navbar'
import Footer from './Components/Layouts/Footer'
import { Map, Mail, PhoneCall } from 'lucide-react'
import MapComponents from './Components/UI/MapComponents'
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom'

const Contact = () => {
  return (
    <>
    <Navbar/>
      <Breadcrumbs/>

        <section className='flex w-11/12 justify-between mx-auto my-10'>

          <div className='w-8/12 flex items-center'>
            <span><PhoneCall width={80} /></span>
            <div>
              <h2 className='text-[20px]'>Call Customer Services:</h2>
              <p>+91 77079 77059</p>
            </div>
          </div>

            <div  className='w-10/12 flex items-center'>
            <span><Map width={80}/></span>
            <div>
              <h2 className='text-[20px] '>Address:</h2>
              <p>AYURVEDA YOGASHRAM REMEDIES PRIVATE LIMITED, 98, HOLY CITY, NEAR GUMTALA BYE PASS, AMRITSAR, PUNJAB-143001.</p>
            </div>
          </div>

            <div  className='w-8/12 flex items-center'>
            <span><Mail width={80}/></span>
            <div>
              <h2 className='text-[20px]'>Email:</h2>
              <p>info@ayurvedayogashram.com</p>
            </div>
          </div>
        </section>

        <section className='my-10'>
          <MapComponents/>
        </section>

        <section className='flex w-10/12 mx-auto justify-between my-10 '>
             <div className='left flex w-30 justify-between '>
                <Link to='/'><FaFacebookF size={24}/></Link>
                <Link to='/'><FaInstagram size={24}/></Link>
                <Link to='/'><FaTwitter size={24}/></Link>
            </div>

            <div className='w-8/12 '>
              <div className='flex gap-4 justify-between my-3 '>
                <input type="text" placeholder='Your Name' className='border-1 w-full px-4 py-2 border-gray-500'/>
                <input type="email" placeholder='Your Email' className='border-1  w-full px-4 py-2 border-gray-500'/>
              </div>
              <div className='flex flex-col gap-3'>
                <input type='phone' placeholder='Your Phone Number' className='border-1 py-2 px-4 border-gray-500' />
                <textarea placeholder='Message' rows={4}  className='border-1 border-gray-200 py-2 px-4 hover:border-red-500'></textarea>
                <button className='bg-black py-2 px-4 text-white hover:bg-(--hover-pink) transition duration-300'>Send Message</button>
              </div>
            </div>
        </section>
      <Footer/>
    </>
  )
}

export default Contact

