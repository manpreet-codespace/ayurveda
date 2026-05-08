import React, { useState } from "react"
import Navbar from "./Components/Layouts/Navbar"
import Footer from "./Components/Layouts/Footer"
import OPD_timings from "./Components/UI/OPD_timings"
import { problems_config } from "./config/problems_config"
import Problems from "./Components/UI/Problems"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

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


import { motion } from 'framer-motion';
import Product from "./Components/UI/Product"
import product1 from './assets/product1.webp';
import product2 from './assets/product2.webp';
import product3 from './assets/product3.webp';
import { FaYoutube } from 'react-icons/fa';
import { Gem, Headphones, RefreshCcw, Truck } from 'lucide-react';

import kidney from './assets/kidney.webp';
import entProblem from './assets/ent_problem.webp';
import immune from './assets/immune.webp';
import nervineProblem from './assets/nervine_problem.webp';
import cardiac from './assets/cardiac.webp';

import abp from './assets/abp_news.avif';
import healthSite from './assets/health_site.avif';
import hindustanTimes from './assets/hindustan_times.avif';
import hindustanStyles from './assets/hindustan_styles.avif';
import inc from './assets/inc_91.avif';
import timesOfIndia from './assets/times_of_india.avif';

const newsChannel= [
  {img:hindustanTimes},
  {img:timesOfIndia},
  {img:abp},
  {img:inc},
  {img:healthSite},
  {img:hindustanStyles},

]

const problems = [
  { img: kidney, name: 'Kidney', className: 'lg:col-span-1 lg:row-span-1 min-h-[240px]' },
  { img: cardiac, name: 'Heart Problems', className: 'lg:col-span-2 lg:row-span-2 min-h-[500px]' },
  { img: entProblem, name: 'ENT Problems', className: 'lg:col-span-1 lg:row-span-1 min-h-[240px]' },
  { img: immune, name: 'Immune Care', className: 'lg:col-span-1 lg:row-span-1 min-h-[240px]' },
  { img: nervineProblem, name: 'Nervine Problems', className: 'lg:col-span-1 lg:row-span-1 min-h-[240px]' }
]
const opd_timings = [
  { name: "Amritsar OPD Dates will be  11 & 29 April 2026" },
  { name: "Mohali OPD dates will be 9 & 27 April 2026" },
  { name: "Gurgaon OPD dates will be  4, 6 & 8 April 2026" }
]

const award_images = [
  { img: award1 },
  { img: award2 },
  { img: award3 },
  { img: award4 },
  { img: award5 },
]

const products = [
  { img: product1, name: "Cancer Gajkesri Vati", price: 2950, categories: 'New Arrivals' },
  { img: product1, name: "Cancer Gajkesri Vati", price: 2950, categories: 'New Arrivals' },
  { img: product1, name: "Cancer Gajkesri Vati", price: 2950, categories: 'New Arrivals' },
  { img: product1, name: "Cancer Gajkesri Vati", price: 2950, categories: 'New Arrivals' },
  { img: product1, name: "Cancer Gajkesri Vati", price: 2950, categories: 'New Arrivals' },
  { img: product2, name: "Rental Care Kit", price: 10290, categories: 'Combos/Kits' },
  { img: product2, name: "Rental Care Kit", price: 10290, categories: 'Combos/Kits' },
  { img: product2, name: "Rental Care Kit", price: 10290, categories: 'Combos/Kits' },
  { img: product2, name: "Rental Care Kit", price: 10290, categories: 'Combos/Kits' },
  { img: product3, name: "Fibro Heal", price: 1490, categories: 'Best Sellers' },
  { img: product3, name: "Fibro Heal", price: 1490, categories: 'Best Sellers' },
  { img: product3, name: "Fibro Heal", price: 1490, categories: 'Best Sellers' },
  { img: product3, name: "Fibro Heal", price: 1490, categories: 'Best Sellers' },
]

const testimonials = [
  {
    img: award1,
    title: 'Hepatitis B Success Stories Of Our Patients',
    subtitle: 'Testimonial | Ayurveda Yogashram'
  },
  {
    img: award2,
    title: 'Diet for Liver Patients',
    subtitle: 'Liver Failure/Fatty Liver'
  },
  {
    img: award3,
    title: 'How To Cure Chronic Kidney Failure',
    subtitle: 'Chronic Renal Failure'
  },
  {
    img: award4,
    title: 'Treatment of Liver Cirrhosis',
    subtitle: 'Ayurveda Yogashram'
  },
  {
    img: award5,
    title: 'Best Treatment for Liver Cirrhosis',
    subtitle: 'Ayurveda Yogashram'
  },
  {
    img: award2,
    title: '5 Foods to Eat | Diet Chart for Liver Patients',
    subtitle: 'Diet with Ayurveda'
  }
]

const serviceHighlights = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Free shipping on orders above 3 Months Period'
  },
  {
    icon: Headphones,
    title: 'Support',
    description: 'Contact us Monday to Saturday, 9am to 6pm IST'
  },
  {
    icon: RefreshCcw,
    title: 'Easy Replacement',
    description: 'Simply replace it within 7 days for an exchange.'
  },
  {
    icon: Gem,
    title: 'Secure Payments',
    description: 'We ensure secure payment with PEV'
  }
]

function App() {

  const [selected, setSelected] = useState('all');

  const filtered = selected === 'all'
    ? products
    : products.filter(p => p.categories === selected);



  return (
    <>
      <Navbar />

      <section className="h-40 flex justify-center items-center">
        <div className=" flex gap-6 rounded-lg justify-center">
          {
            opd_timings.map((name, index) => (
              <div key={index}>
                <OPD_timings name={name.name} />
              </div>
            ))
          }
        </div>
      </section>

      <section className="bg-(--pink) py-12" >
        <div className="flex flex-wrap gap-6 w-10/12 mx-auto ">
          {
            problems_config.map((problem, index) => (
              <div key={index}>
                <Problems img={problem.img} name={problem.name} />
              </div>
            ))
          }
        </div>
      </section>


      <section className="py-10">
        <h1 className="text-(--brown) text-[36px] font-bold text-center ">Giving your health a new <span className="text-(--primary-dark)">lift</span></h1>

        <div>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000 }}
            slidesPerView={1}
            spaceBetween={20}
          >
            {
              award_images.map((award, index) => (
                <div key={index}>
                  <SwiperSlide><img src={award.img} /></SwiperSlide>
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
          <div className="overflow-hidden border h-140">
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
          <div className="overflow-hidden border h-140 flex order-2">
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
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >

        <h1 className="text-[42px] font-semibold text-center ">
          Our Range of Products
        </h1>
        <div className="flex justify-center gap-2 py-6">
          {
            ['all', 'New Arrivals', 'Best Sellers', 'Combos/Kits'].map((btn) => (
              <button
                key={btn}
                onClick={() => setSelected(btn)}
                className={`px-6 py-4 ${selected === btn ? 'text-red-800 underline' : 'hover:text-red-800 hover:underline'}`}>
                {btn}
              </button>
            ))
          }

        </div>

        <div className="flex justify-center overflow-x-scroll w-9/12 mx-auto">
          {
            filtered.map((item, index) => (
              <div key={index}>
                <Product name={item.name} img={item.img} price={item.price} />
              </div>
            ))
          }
        </div>
        <div className="flex justify-center my-6">

          <button className="px-6 py-2 border-2 hover:bg-black hover:text-white ">
            View All Products
          </button>
        </div>
      </motion.section>


      <motion.section
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="px-6 py-16"
      >
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-4 lg:grid-rows-2">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`group relative flex  justify-center overflow-hidden bg-(--surface) ${problem.className}`}
            >
              <img
                src={problem.img}
                alt={problem.name}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute bottom-8 bg-[#b75518] py-2 px-4 text-center text-lg font-medium text-white">
                {problem.name}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
      initial={{opacity:0,y:80}}
      whileInView={{opacity:1, y:0}}
      transition={{duration:0.6}}
      viewport={{once:true}}
      className="bg-[#dceadd] py-16"
      >
        <h1 className="mx-auto max-w-4xl px-6 text-center text-5xl font-bold leading-17.5 text-(--text-primary)">
          Trusted by Thousands of Customers across 1500+ Cities Worldwide.
        </h1>
        <div className="mx-auto mt-10 flex max-w-7xl gap-4 overflow-x-auto px-6 pb-2">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="relative h-80 min-w-45 overflow-hidden rounded-[10px] bg-black shadow-md"
            >
              <img
                src={item.img}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-x-0 top-0 bg-black px-3 py-3 text-white">
                <p className="line-clamp-2 text-[10px] font-medium leading-4">{item.title}</p>
                <p className="mt-1 line-clamp-1 text-[9px] text-white/70">{item.subtitle}</p>
              </div>
              <div className="absolute inset-x-0 top-16 flex items-center justify-between px-3 text-[9px] text-white">
                <span>Ayurveda Yogashram</span>
                <span className="rounded bg-white px-2 py-1 text-[8px] font-semibold text-black">
                  SUBSCRIBE
                </span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-[2px]">
                  <FaYoutube className="text-[52px] text-[#ff0000]" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      
      >
        <div className="mx-auto max-w-full bg-white px-6 py-8 lg:px-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {serviceHighlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={`group flex flex-col items-center px-6 text-center ${
                    index !== serviceHighlights.length - 1 ? 'lg:border-r lg:border-[#e7e7e7]' : ''
                  }`}
                >
                  <div className="perspective-[1000px]">
                    <Icon className="h-12 w-12 text-[#2f2f2f] transition-transform duration-500 ease-out group-hover:transform-[rotateY(180deg)]" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-7 text-[20px] font-medium text-[#1f1f1f]">{item.title}</h3>
                  <p className="mt-3 max-w-55 text-[15px] leading-7 text-[#404040]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>


            <motion.section
            initial={{opacity:0,y:80}}
            whileInView={{opacity:1,y:0}}
            transition={{duration:0.6}}
            viewport={{once:true}}
            className="px-4 py-10">
              <h1 className="text-3xl text-center font-bold">AS SEEN ON</h1> 
              <div className="flex justify-center gap-8 py-10 ">
                {
                  newsChannel.map((channel,index)=>(
                    <div key={index} className="w-30 h-30 ">
                      <img src={channel.img}/>
                    </div>
                  ))
                }
              </div>
            </motion.section>

            <motion.section
              initial={{opacity:0,y:80}}
              whileInView={{opacity:1,y:0}}
              transition={{duration:0.6}}
              viewport={{once:true}}
              className="bg-(--pink) px-2 py-10 ">
                <p className="text-center">HAPPY PATIENTS</p>
                <h1 className="text-center text-4xl text-semibold ">Patient's Testimonial</h1>
                <div>

                </div>
          
            </motion.section>
            <motion.section>
              
            </motion.section>
      <Footer />
    </>
  )
}

export default App
