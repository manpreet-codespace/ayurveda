import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { API_BASE_URL } from '../../config/api';
import EditButton from '../Components/EditButton';
import DeleteButton from '../Components/DeleteButton';

const Gallery = () => {

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [inputKey, setInputKey] = useState(0);
  const [getImage, setGetImage] = useState([]);
  const [editingImageId, setEditingImageId] = useState(null);
  const API_ORIGIN = API_BASE_URL.replace('/api', '');

  const handleSaveImage = async() =>{

    if(!image)
    {
      setMessage("Please select an image first.");
      return;

    }
    
  const formData = new FormData();
  formData.append("image",image);

    try{
      const request = editingImageId
        ? axios.put(`${API_BASE_URL}/gallery/${editingImageId}`, formData, {
          headers:{
            "Content-Type": "multipart/form-data"
          },
        })
        : axios.post(`${API_BASE_URL}/gallery`,
        formData,
        {
          headers:{
            "Content-Type": "multipart/form-data"
          },
        });

      const response = await request;

      console.log(response.data);
      setImage(null);
      setInputKey((prevKey) => prevKey + 1);
      setEditingImageId(null);
      setMessage(editingImageId ? "Image updated successfully." : "Image uploaded successfully.");
      setGetImage((prevImages) => {
        if (editingImageId) {
          return prevImages.map((item) =>
            item.g_id === response.data.data.g_id ? response.data.data : item
          );
        }

        return [response.data.data, ...prevImages];
      });


    }
    catch(err)
    {
      console.log(err.response?.data || err.message);
      setMessage(editingImageId ? "Unable to update image." : "Unable to upload image.");

    }
  }

  const handleEdit = (galleryImage) => {
    setEditingImageId(galleryImage.g_id);
    setImage(null);
    setInputKey((prevKey) => prevKey + 1);
    setMessage("Select a new image, then click Update.");
  };

  const handleDeleteImage = async(g_id) => {
    try {
      await axios.delete(`${API_BASE_URL}/gallery/${g_id}`);
      setGetImage((prevImages) => prevImages.filter((item) => item.g_id !== g_id));

      if (editingImageId === g_id) {
        setEditingImageId(null);
        setImage(null);
        setInputKey((prevKey) => prevKey + 1);
      }

      setMessage("Image deleted successfully.");
    }
    catch(err) {
      console.log(err.response?.data || err.message);
      setMessage("Unable to delete image.");
    }
  };


    useEffect(()=>{
        const fetchImages = async() =>{
          try{
  
            const response = await axios.get(`${API_BASE_URL}/gallery`);
            
            console.log(response.data.data);
            setGetImage(Array.isArray(response.data.data) ? response.data.data : [])
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
      <section className='bg-white w-11/12 mx-auto rounded-lg pl-5 py-10 '>
        <h2 className='text-[24px] font-semibold pb-2'>Uploading Image For Gallery</h2>
        <div className='py-5 flex gap-5'>
          <input type="file"
            key={inputKey}
            accept='image/*'
            onChange={(e) => setImage(e.target.files[0])}
            className='py-2'
          />
          <button className='bg-green-500 px-4 py-2 rounded-lg text-white' onClick={handleSaveImage}>
            {editingImageId ? "Update" : "Save"}
          </button>
        </div>
        {message && <p className='text-sm text-green-700'>{message}</p>}


      </section>

      <section className='w-11/12 mx-auto bg-white mt-10 rounded-lg'>
        <table className='w-full text-center'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              getImage.map((data)=>(
                <tr key={data.g_id}>
                  <td>{data.g_id}</td>
                  <td>
                  {data.image}
                  </td>
                
                     <td className="flex justify-center items-center gap-2 p-2">
                  <EditButton btn="Edit" onClick={() => handleEdit(data)} />
                  <DeleteButton deleteBtn="Delete" onClick={() => handleDeleteImage(data.g_id)} />
                </td>
                
                </tr>
              ))
            }
          </tbody>
            
        </table>
      </section>
    </>
  )
}

export default Gallery
