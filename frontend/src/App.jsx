import React, { useState } from "react"
import Navbar from "./Components/Layouts/Navbar"
import OPD_timings from "./Components/UI/OPD_timings"
import { problems_config } from "./config/problems_config"
import Problems from "./Components/UI/Problems"
import {Swiper,SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, Autoplay} from 'swiper/modules';


import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import award1 from './assets/award-image-1.webp';
import award2 from './assets/award-image-2.webp';
import award3 from './assets/award-image-3.webp';
import award4 from './assets/award-image-4.webp';
import award5 from './assets/award-image-5.jpg';
import disease from './assets/diseases_home.webp';
import ayurveda from './assets/ayurveda_home.webp';


import {motion} from 'framer-motion';
import Product from "./Components/UI/Product"
import product1 from './assets/product1.webp';
import product2 from './assets/product2.webp';
import product3 from './assets/product3.webp';


  const opd_timings = [
    {name:"Amritsar OPD Dates will be  11 & 29 April 2026"},
    {name:"Mohali OPD dates will be 9 & 27 April 2026"},
    {name:"Gurgaon OPD dates will be  4, 6 & 8 April 2026"}
  ]

  const award_images=[
    {img:award1},
    {img:award2},
    {img:award3},
    {img:award4},
    {img:award5},
  ]

  const products= [
    {img: product1, name:"Cancer Gajkesri Vati", price:2950, categories:'New Arrivals'},
    {img: product1, name:"Cancer Gajkesri Vati", price:2950, categories:'New Arrivals'},
    {img: product1, name:"Cancer Gajkesri Vati", price:2950, categories:'New Arrivals'},
    {img: product1, name:"Cancer Gajkesri Vati", price:2950, categories:'New Arrivals'},
    {img: product1, name:"Cancer Gajkesri Vati", price:2950, categories:'New Arrivals'},
    {img: product2, name:"Rental Care Kit", price:10290, categories:'Combos/Kits'},
    {img: product2, name:"Rental Care Kit", price:10290, categories:'Combos/Kits'},
    {img: product2, name:"Rental Care Kit", price:10290, categories:'Combos/Kits'},
    {img: product2, name:"Rental Care Kit", price:10290, categories:'Combos/Kits'},
    {img: product2, name:"Rental Care Kit", price:10290, categories:'Combos/Kits'},
    {img: product2, name:"Rental Care Kit", price:10290, categories:'Combos/Kits'},
    {img: product3, name:"Fibro Heal", price:1490, categories:'Best Sellers'},
    {img: product3, name:"Fibro Heal", price:1490, categories:'Best Sellers'},
    {img: product3, name:"Fibro Heal", price:1490, categories:'Best Sellers'},
    {img: product3, name:"Fibro Heal", price:1490, categories:'Best Sellers'},
    {img: product3, name:"Fibro Heal", price:1490, categories:'Best Sellers'},
    {img: product3, name:"Fibro Heal", price:1490, categories:'Best Sellers'},
  
  ]

function App() {

    const [selected,setSelected]=useState("all");

    const filtered= selected==="all"
    ?products
    :products.filter((p)=>p.categories === selected)

  return (
    <>
      <Navbar/>

    <section className="h-40 flex justify-center items-center">
      <div className=" flex gap-6 rounded-lg justify-center">
        {
          opd_timings.map((name,index)=>(
            <div key={index}>
            <OPD_timings name={name.name}/>
            </div>
          ))
        }
        </div>
        </section>

        <section className="bg-(--pink) py-12" >
          <div className="flex flex-wrap gap-6 w-10/12 mx-auto ">
            {
              problems_config.map((problem,index)=>(
                <div key={index}>
                    <Problems img={problem.img} name={problem.name}/>
                  </div>
              ))
            }
          </div>
        </section>
        

        <section className="py-10">
          <h1 className="text-(--brown) text-[36px] font-bold text-center ">Giving your health a new <span className="text-(--primary-dark)">lift</span></h1>

          <div>
            <Swiper
              modules={[Navigation,Pagination,Autoplay]}
              navigation
              pagination={{clickable:true}}
              autoplay={{delay:2000}}
              slidesPerView={1}
              spaceBetween={20}
            >
              {
                award_images.map((award,index)=>(
                    <div key={index}>
                      <SwiperSlide><img src={award.img}/></SwiperSlide>
                    </div>
                ))
              }
            </Swiper>
              </div>
            </section>

            <section className="p-16 flex justify-evenly">
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className=" flex flex-col"
              >
                <div className="overflow-hidden h-140">
                  <img
                    src={disease}
                    alt="healing diseases remedies"
                    className="object-cover transition-transform duration-300 ease-out hover:scale-110"
                  />
                </div>

                <div className="space-y-4 mt-6 ">
                  <p className="text-(--brown) text-[20px]">
                    AYURVEDA YOGASHRAM REMEDIES PRIVATE LIMITED
                  </p>
                  <h1 className="text-[42px] font-semibold text-(--text-primary)">
                    Diseases we Heal
                  </h1>
                  <button className="border-2 px-10 py-2 transition-colors duration-300 hover:bg-black hover:text-white">
                    Discover More
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className=" flex flex-col"
              >
                <div className="overflow-hidden h-140 flex order-2">
                  <img
                    src={ayurveda}
                    alt="healing diseases remedies"
                    className=" object-cover transition-transform duration-300 ease-out hover:scale-110"
                  />
                </div>

                <div className="space-y-4 mb-8">
                  <p className="text-(--brown) text-[20px]">
                    PURIFYING BODY, MIND & SOUL   
                  </p>
                  <h1 className="text-[42px] font-semibold text-(--text-primary)">
                    Why Ayurveda?
                  </h1>
                  <button className="border-2 px-10 py-2 transition-colors duration-300 hover:bg-black hover:text-white">
                    Discover More
                  </button>
                </div>
              </motion.div>
            </section>
              
            <motion.section
            initial={{opacity:0, y:80}}
            whileInView={{opacity:1, y:0}}
            transition= {{duration:0.6}}
            viewport={{once:true}}
            >

                <h1 className="text-[42px] font-semibold text-center ">
                  Our Range of Products
                </h1>
                <div className="flex justify-center ">
                  {['Best Sellers', 'Combos/Kits', 'New Arrivals'].map((f)=>(
                    <button
                    onClick={()=>setSelected(f)}
                    className={`flex px-6 py-2 ${selected === f ? 'active:text-red-800 active:underline ':'hover:underline hover:text-red-800'}`}>
                      {f}
                    </button>
                  ))}
                  </div>

                <div className="flex w-11/12 max-w-6xl mx-auto gap-6 py-10 px-6 border-2 overflow-x-auto overflow-y-hidden flex-nowrap justify-start">
                  {
                    filtered.map((product,index)=>(
                      <div key={index} className="border shrink-0">
                        <Product name={product.name} img={product.img} price={product.price}/>
                      </div>
                    ))
                  }
                </div>

            </motion.section>



    </>
  )
}

export default App
