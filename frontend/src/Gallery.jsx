import React, { useEffect, useState } from 'react'
import Footer from './Components/Layouts/Footer';
import Navbar from './Components/Layouts/Navbar';
import axios from 'axios';
import { API_BASE_URL } from './config/api';

const Gallery = () => {

  const [seeImages, setSeeImages] = useState([]);

  useEffect(()=>{
      const fetchImages = async() =>{
        try{

          const response = await axios.get(`${API_BASE_URL}/gallery`);
          
          console.log(response.data.data);
          setSeeImages(Array.isArray(response.data.data) ? response.data.data : [])
        }
        catch(err)
        {
          console.log(err.response?.data || err.message);

        }

      }

      fetchImages();

  },[])
  return (
    <>
    <Navbar/>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-11/12 mx-auto my-10'>
      {
        seeImages.map((data)=>(
          <div key={data.g_id} className='overflow-hidden rounded-lg'>
              <img src={`${API_BASE_URL}${data.image}`} alt="Gallery" className='h-64 w-full object-cover' />
          </div>
        ))
      }
    </div>
    <Footer/>
    </>
  )
}

export default Gallery
