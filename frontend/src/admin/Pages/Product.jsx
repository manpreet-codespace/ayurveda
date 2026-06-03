import JoditEditor from 'jodit-react';
import React, { useRef, useState } from 'react'
import { toolbarConfig } from '../../config/toolbarConfig';

const Product = () => {
  const editorRef = useRef(null);
  const [content, setContent] = useState("");

  return (
    <>
      <section className='bg-white p-3 w-11/12 mx-auto rounded-lg '>
        <h1 className='text-[20px] font-semibold'>Categories of Products</h1>
        <input type="text" placeholder='Write categories' className='border border-gray-200 w-50 p-2 m-2' />
        <button className='bg-black py-2 px-4 text-white rounded-lg tracking-wider font-semibold'>Save</button>
      </section>
      <br />
      <section className='bg-white p-3 w-11/12 mx-auto rounded-lg '>
        <h1 className='text-[20px] font-semibold'>Details of Products</h1>

        <div className='flex gap-4 mt-2 '>
          <label htmlFor='category'>Categories</label>
          <select name='category'>
            <option value="none">--Select--</option>
          </select>
        </div>

        <div className='flex gap-4 mt-2 items-center'>
          <label htmlFor="name">Name</label>
          <input type='text' placeholder='Write products name' className='border border-gray-200 p-2' />
        </div>

        <div className='flex gap-4 my-2 items-center '>
          <label htmlFor="image">Upload your image here </label>
          <input name='image' type='file' accept='image/*' />
        </div>


        <div className='flex gap-6'>

          <div className="flex gap-4 mt-2 items-center ">
            <label htmlFor='price'>Price</label>
            <input name='price' type="number" placeholder='Write product price' className='border border-gray-200 p-2' />
          </div>
          <div className='flex gap-4 mt-2 items-center'>
            <label htmlFor="discount">Discount</label>
            <input name='discount' type='number' placeholder='Write discount here ' className='border border-gray-200 p-2 ' />
          </div>

        </div>

        <div className='flex gap-6'>

          <div className="flex gap-4 mt-2 items-center ">
            <label htmlFor='sku'>SKU</label>
            <input name='sku' type="number" placeholder='Write SKU here' className='border border-gray-200 p-2' />
          </div>
          <div className='flex gap-4 mt-2 items-center'>
            <label htmlFor="variant">Variant</label>
            <input name='variant' type='number' placeholder='Write variant here ' className='border border-gray-200 p-2 ' />
          </div>

        </div>

        <div className='mt-3'>

          <h1>Description</h1>
          <JoditEditor
            ref={editorRef}
            value={content}
            config={toolbarConfig}
            onBlur={(newContent) => setContent(newContent)}
          />

        </div>

          <div className='mt-10 flex justify-right '>
            <button className='bg-black text-white py-2 px-4 tracking-wider font-semibold rounded-lg'>
              Save
              </button>

            </div>

      </section>
    </>
  )
}

export default Product
