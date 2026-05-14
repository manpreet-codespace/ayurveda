import React from 'react'
import { FaEnvelope, FaCcMastercard, FaCcPaypal, FaCcVisa } from 'react-icons/fa'
import { SiAmericanexpress } from 'react-icons/si'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';

const footerColumns = [
  {
    title: 'COMPANY',
    items: ['ABOUT', 'PRIVACY POLICY', 'REFUND POLICY', 'SHIPPING POLICY', 'TERMS & CONDITIONS']
  },
  {
    title: 'QUICK LINKS',
    items: []
  },
  {
    title: 'SHOP BY DISEASE',
    items: ['Kidney Failure', 'PCOD', 'Cirrhosis of Liver', 'Hypertension', 'Asthma']
  },
  {
    title: 'USER PANEL',
    items: [
      'MY ACCOUNT',
      '98, HOLY CITY, NEAR GUMTALA BYE PASS, AMRITSAR, PUNJAB-143001',
      'info@ayurvedayogashram.com',
      '+91 77079 77059, +91 98760-10220'
    ]
  }
]

const Footer = () => {
  const navigate = useNavigate();

  return (

    <motion.footer className='relative bg-(--footer-bg) text-(--white)'
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}>
      <div className='mx-auto max-w-[1365px] px-10 py-24'>
        <div className='grid gap-14 md:grid-cols-2 lg:grid-cols-4'>
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className='text-[20px] font-medium tracking-[0.02em]'>{column.title}</h3>
              <div className='mt-10 space-y-5 text-[15px] leading-8'>
                {column.items.map((item) => (
                  <p key={item} className='max-w-[310px]'>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='border-t border-(--footer-divider) bg-(--footer-bottom) px-8 py-7 text-(--white)'>
        <div className='mx-auto flex max-w-[1365px] flex-col items-center justify-between gap-6 lg:flex-row'>
          <div className='flex items-center gap-3 text-[28px]'>
            <FaCcMastercard />
            <FaCcVisa />
            <FaCcPaypal />
            <SiAmericanexpress className='text-[22px]' />
          </div>
          <p className='text-center text-[13px] uppercase tracking-[0.02em]'>
            ©2024 AYURVEDA YOGASHRAM REMEDIES PRIVATE LIMITED.
          </p>
        </div>
      </div>

      <button
        type='button'
        onClick={() => navigate("/contact")}
        className='fixed bottom-0 right-6 flex items-center z-1 gap-3 bg-(--footer-contact) px-5 py-2 text-[18px] font-semibold text-(--white) shadow-xl'
      >
        <FaEnvelope className='text-[18px]' />
        Contact Us
      </button>
    </motion.footer>
  )
}

export default Footer
