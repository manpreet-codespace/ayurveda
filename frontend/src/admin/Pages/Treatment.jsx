import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import { API_BASE_URL } from '../../config/api'
import { slugify } from '../../../utils/Slugify';
import JoditEditor from 'jodit-react';
import { toolbarConfig } from '../../config/toolbarConfig';


const Treatment = () => {

  const [disease, setDisease] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState("");
  const editorRef = useRef(null);

  const [content,setContent] = useState("");

  useEffect(() => {
    const fetchDisease = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/disease-category-data`);
        console.log(response.data);
        setDisease(response.data.diseases);

      }
      catch (err) {
        console.error(err.response?.data || err.message);

      }

    }

    fetchDisease();


  }, [])
  return (
    <>
      <section className='bg-white w-11/12 mx-auto py-10 pl-5 rounded-lg'>
        <h1 className='text-[24px] font-semibold pb-2'>Description</h1>
        <label htmlFor="disease" className=''>Select disease name <span className='text-sm font-semibold'>(under which description of disease are written)</span>:</label>
        <br /><br/>
        <select name="disease" id='disease' value={selectedDisease} onChange={(e) => setSelectedDisease(e.target.value)}>
          <option value="">--select--</option>
          {
            disease.map((item) => (
              <option value={item.disease_name} key={item.d_id}>{item.disease_name}</option>
            ))
          }
        </select>
        <br/><br/>
        {
          selectedDisease
          &&
          <h1 className='text-sm'><span className='font-bold'>URL for selected disease is shown as : </span>{`/disease/${slugify(selectedDisease)}`} </h1>
        }

        <br/>
        <JoditEditor 
        ref={editorRef}
        value={content}
        config={toolbarConfig}
        onBlur={(newContent) => setContent(newContent)}
        
        />

        <button
        onClick={()=>console.log(content)}>Save</button>

      </section>
    </>
  )
}

export default Treatment
