import React, { useEffect, useState } from 'react'
import Navbar from './Components/Layouts/Navbar';
import Footer from './Components/Layouts/Footer';
import axios from 'axios';
import { API_BASE_URL } from './config/api';
import Product from './Components/UI/Product.jsx';

const Products = () => {
  const [products,setProducts] = useState([]);


  useEffect(()=>{
    const fetchProducts = async() =>{
      try{
        const response  =  await axios.get(`${API_BASE_URL}/product-category-data`);

        console.log(response.data.product);
        setProducts(response.data.product);

      }
      catch(err)
      {
        console.log(err.message);

      }
    }

    fetchProducts();

  },[])
  return (
    <>
      <Navbar/>

      <div className='my-10 flex '>
        {products.map((product)=>(
          <div key = {product.p_id}>
            <Product img={product.image} name = {product.p_name} price = {product.price}/>
          </div>
        ))}
      </div>
      
      <Footer/>
    </>
  )
}

export default Products