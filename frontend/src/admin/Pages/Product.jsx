import JoditEditor from 'jodit-react';
import React, { useEffect, useRef, useState } from 'react'
import { toolbarConfig } from '../../config/toolbarConfig';
import EditButton from '../Components/EditButton';
import DeleteButton from '../Components/DeleteButton';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import axios from 'axios';
import {API_BASE_URL} from './../../config/api';

const Product = () => {

  const initialProduct ={
    c_id:'',
    p_name:"",
    price:"",
    discount:'',
    sku:'',
    variant:'',

  }
  const editorRef = useRef(null);
  const [content, setContent] = useState("");

  const [openProductId,setOpenProductId] = useState(null);

  const [categoryInput, setCategoryInput] = useState("");
  const [categories,setCategories] = useState([]);

  const [selectedCategory,setSelectedCategory] = useState("");

  const [product,setProduct] = useState({...initialProduct});
  const [products,setProducts] = useState([]);
  const [editId,setEditId] = useState(null);

  const [selectedProduct,setSelectedProduct] = useState("");
  const [stockInput,setStockInput] = useState("");


  
 const handleChange =(e) =>{
      setProduct((prev)=>({
        ...prev,
        [e.target.name]:e.target.value
      }))
 }



  useEffect(()=>{
      const fetchCategory = async() =>{
        try{
          const response = await axios.get(`${API_BASE_URL}/product-category-data`);

          console.log(response.data.categories);
          setCategories(response.data.categories);
          setProducts(response.data.product);


        }
        catch(err)
        {
          console.log(err.response?.data || err.message);


        }
      }
      fetchCategory();

  },[])

 const handleSavedProducts = async() =>{

  if(!product.p_name.trim() || !product.price.trim() || !product.sku.trim()|| !product.variant.trim() ||!selectedCategory)
    return;

  try{

    const productData = {
      c_id:Number(selectedCategory),
      p_name:product.p_name,
      price:product.price,
      sku:product.sku,
      variant:product.variant,
      discount:product.discount
    }

    const response = editId
      ? await axios.put(`${API_BASE_URL}/product/${editId}`, productData)
      : await axios.post(`${API_BASE_URL}/product`, productData)

    console.log(response.data);
    const savedCategory = categories.find((cat)=>(
      cat.c_id === Number(selectedCategory)
    ))

    const savedProduct = {
        ...response.data.product,
        productCategory: savedCategory
      };

    if(editId){
      setProducts((prev)=> prev.map((item)=>
        item.p_id === editId ? savedProduct : item
      ));
      setEditId(null);
    }
    else{
      setProducts((prev)=> [
        ...prev,
        savedProduct
      ]);
    }

    setProduct(initialProduct);
    setSelectedCategory("");
  }
  catch(err)
  {
    console.error(err.response?.data || err.message);
  }
 }


  const handleEditProduct = (item) =>{
    setProduct({
      c_id:item.c_id || "",
      p_name:item.p_name || "",
      price:item.price || "",
      discount:item.discount || "",
      sku:item.sku || "",
      variant:item.variant || "",
    })
    setSelectedCategory(String(item.c_id));
    setEditId(item.p_id);
    setOpenProductId(null);
  }

  const handleDeleteProduct = async(p_id) =>{
    try{
      await axios.delete(`${API_BASE_URL}/product/${p_id}`);

      setProducts((prev)=> prev.filter((item)=> item.p_id !== p_id));

      if(editId === p_id){
        setProduct(initialProduct);
        setSelectedCategory("");
        setEditId(null);
      }

      if(openProductId === p_id){
        setOpenProductId(null);
      }
    }
    catch(err)
    {
      console.error(err.response?.data || err.message);
    }
  }

  const handleCancelEdit = () =>{
    setProduct(initialProduct);
    setSelectedCategory("");
    setEditId(null);
  }



  const handleSavedCategories = async() =>{
    if(!categoryInput.trim())
      return;

    const categoryExists = categories.some((category)=>(
      category.product_category_name.toLowerCase() === categoryInput.trim().toLowerCase()
    ))

    if(categoryExists)
    {
      console.error("Category is already exists");
      return;

    }

    try{
      const response = await axios.post(`${API_BASE_URL}/save-product-category`,
        {product_category_name: categoryInput.trim()}
       )

       const newProductCategory ={
        c_id:response.data.category.c_id,
        product_category_name:response.data.category.product_category_name
       }

       setCategories((prev)=> [...prev,newProductCategory]);
       setCategoryInput("");

    }
    catch(err)
    {
      console.error(err.response?.data || err.message)
    }
  }


  const handleUpdateStock =async() =>{

    if(!selectedProduct || stockInput ==="") return ;
    try{
      const response = await axios.put(`${API_BASE_URL}/product/${selectedProduct}/stock`,
        {
          stock:Number(stockInput)
        }
      );

        setProducts((prev)=>
            prev.map((item)=>(
              item.p_id === Number(selectedProduct)
              ?{...item, stock:response.data.product.stock}
              :item
            ))
        )

        setSelectedProduct("");
        setStockInput("");


    }
    catch(err)
    {
      console.error(err.response?.data || err.message);

    }
  }


  return (
    <>
      <section className='bg-white p-3 w-11/12 mx-auto rounded-lg'>
        <h1 className='text-[20px] font-semibold'>Categories of Products</h1>
        <input type="text" placeholder='Write categories' className='border border-gray-200 w-50 p-2 m-2'
        onChange={(e) => setCategoryInput(e.target.value)} 
        value={categoryInput}
        />
        <button className='bg-black py-2 px-4 text-white rounded-lg tracking-wider font-semibold' onClick={handleSavedCategories}
        >Save</button>
      </section>
      <br />
      <section className='bg-white p-3 w-11/12 mx-auto rounded-lg '>
        <h1 className='text-[20px] font-semibold'>Details of Products</h1>

        <div className='flex gap-4 mt-2 '>
          <label htmlFor='category'>Categories</label>
          <select name='category'
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}>
            <option value="">--Select--</option>
            {
              categories.map((cat)=>(
                  <option key={cat.c_id} value={cat.c_id} >
                      {cat.product_category_name}
                  </option>
              ))
            }
          </select>
        </div>

        <div className='flex gap-4 mt-2 items-center'>
          <label htmlFor="p_name">Name</label>
          <input type='text' name='p_name' placeholder='Write products name' className='border border-gray-200 p-2' 
          onChange={handleChange}
          value={product.p_name}/>
        </div>

        <div className='flex gap-4 my-2 items-center '>
          <label htmlFor="image">Upload your image here </label>
          <input name='image' type='file' accept='image/*' />
        </div>


        <div className='flex gap-6'>

          <div className="flex gap-4 mt-2 items-center ">
            <label htmlFor='price'>Price</label>
            <input name='price' type="number" placeholder='Write product price' className='border border-gray-200 p-2' 
            onChange={handleChange}
            value={product.price}/>
          </div>
          <div className='flex gap-4 mt-2 items-center'>
            <label htmlFor="discount">Discount</label>
            <input name='discount' type='number' placeholder='Write discount here ' className='border border-gray-200 p-2 ' 
            onChange={handleChange}
            value={product.discount}/>
          </div>

        </div>

        <div className='flex gap-6'>

          <div className="flex gap-4 mt-2 items-center ">
            <label htmlFor='sku'>SKU</label>
            <input name='sku' type="text" placeholder='Write SKU here' className='border border-gray-200 p-2' 
            onChange={handleChange}
            value={product.sku}/>
          </div>
          <div className='flex gap-4 mt-2 items-center'>
            <label htmlFor="variant">Variant</label>
            <input name='variant' type='number' placeholder='Write variant here ' className='border border-gray-200 p-2 '
            onChange={handleChange}
            value={product.variant} />
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

        <div className='mt-10 flex justify-end'>
          {editId && (
            <button className='mr-2 rounded-lg border border-gray-300 px-4 py-2 font-semibold tracking-wider text-gray-700'
            onClick={handleCancelEdit}>
              Cancel
            </button>
          )}
          <button className='bg-black text-white py-2 px-4 tracking-wider font-semibold rounded-lg'
          onClick={handleSavedProducts}>
            {editId ? "Update" : "Save"}
          </button>
        </div>

      </section>
      <br />
      <section className='bg-white p-3 w-11/12 mx-auto rounded-lg mb-5'>
        <h1 className='text-[20px] font-semibold'>Stock of Products</h1>

        <div className='flex gap-4 mt-2 '>
          <label htmlFor='product'>Products</label>
          <select name='product'
          value={selectedProduct}
          onChange={(e)=>setSelectedProduct(e.target.value)}
          >
            <option value="">--Select--</option>
            {
              products.map((product)=>(
                  <option key={product.p_id} value={product.p_id}>{product.p_name}</option>
                ))
            }
          </select>
        </div>

        <div className='flex mt-2 gap-4 items-center'>
          <label htmlFor='stock'>Stocks</label>
          <input type="number" name="stock" placeholder='Update stock here ' className='border border-gray-200 p-2 ' 
          onChange={(e)=>setStockInput(e.target.value)}
          value={stockInput}/>
        </div>

        <div className='mt-10 flex justify-end'>
          <button className='bg-black text-white py-2 px-4 tracking-wider font-semibold rounded-lg' 
          onClick={handleUpdateStock}>Save</button>
        </div>
      </section>

      <section className='bg-white w-11/12 mx-auto rounded-lg mb-5 overflow-hidden'>
        <table className='w-full text-center'>
          <thead className='bg-gray-100 text-sm uppercase tracking-wide text-gray-700'>
            <tr>
              <th className='p-3'>Id</th>
              <th className='p-3'>Name</th>
              <th className='p-3'>Categories</th>
              <th className='p-3'>Price</th>
              <th className='p-3'>More Details</th>
              <th className='p-3'>Action</th>
            </tr>
          </thead>
          
          
          <tbody className='divide-y divide-gray-200 text-sm'>
            {products.length > 0 ? (
              products.map((item)=>(
                <React.Fragment key={item.p_id}>
                  <tr className='hover:bg-gray-50'>
                    <td className='p-3'>{item.p_id}</td>
                    <td className='p-3 font-medium text-gray-800'>{item.p_name}</td>
                    <td className='p-3'>{item.productCategory?.product_category_name || ""}</td>
                    <td className='p-3'>{item.price}</td>
                    <td className='p-3'>
                      {
                        openProductId !== item.p_id ? 
                        <button className='mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200' 
                      onClick={()=>setOpenProductId(item.p_id) }>
                        <FaChevronDown  />
                      </button>
                      :
                      <button className='mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200' 
                      onClick={()=>setOpenProductId(null) }>
                        <FaChevronUp  />
                      </button>
                      }
                    </td>
                    <td className='p-3'>
                      <div className='flex items-center justify-center gap-2'>
                        <EditButton btn="Edit" onClick={()=>handleEditProduct(item)} />
                        <DeleteButton deleteBtn="Delete" onClick={()=>handleDeleteProduct(item.p_id)} />
                      </div>
                    </td>
                  </tr>

                  {openProductId === item.p_id &&  <tr className='bg-gray-50'>
                    <td colSpan="6" className='p-4'>
                      <div className='grid grid-cols-1 gap-3 rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm md:grid-cols-3'>
                        <div className='rounded-md bg-gray-50 p-3'>
                          <p className='text-xs font-semibold uppercase tracking-wide text-gray-500'>Discount</p>
                          <p className='mt-1 text-base font-semibold text-gray-900'>{item.discount || 0}%</p>
                        </div>
                        <div className='rounded-md bg-gray-50 p-3'>
                          <p className='text-xs font-semibold uppercase tracking-wide text-gray-500'>SKU</p>
                          <p className='mt-1 text-base font-semibold text-gray-900'>{item.sku}</p>
                        </div>
                        <div className='rounded-md bg-gray-50 p-3'>
                          <p className='text-xs font-semibold uppercase tracking-wide text-gray-500'>Variant</p>
                          <p className='mt-1 text-base font-semibold text-gray-900'>{item.variant}</p>
                        </div>
                        <div className='rounded-md bg-gray-50 p-3'>
                          <p className='text-xs font-semibold uppercase tracking-wide text-gray-500'>Stocks</p>
                          <p className='mt-1 text-base font-semibold text-gray-900'>{item.stock}</p>
                        </div>
                        <div className='rounded-md bg-gray-50 p-3 md:col-span-2'>
                          <p className='text-xs font-semibold uppercase tracking-wide text-gray-500'>Description</p>
                          <p className='mt-1 text-sm font-semibold text-gray-900'>No description added</p>
                        </div>
                        <div className='rounded-md bg-gray-50 p-3 md:col-span-2'>
                          <p className='text-xs font-semibold uppercase tracking-wide text-gray-500'>Image</p>
                          <p className='mt-1 text-sm font-semibold text-gray-900'>Not Added yet</p>
                        </div>
                      </div>
                    </td>
                  </tr>}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="6" className='p-4 text-center'>No products added yet</td>
              </tr>
            )}
        
          </tbody>
        </table>
      </section>
    </>
  )
}

export default Product
