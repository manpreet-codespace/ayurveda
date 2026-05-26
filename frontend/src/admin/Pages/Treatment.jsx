import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import { API_BASE_URL } from '../../config/api'
import JoditEditor from 'jodit-react';
import { toolbarConfig } from '../../config/toolbarConfig';
import EditButton from '../Components/EditButton';
import DeleteButton from '../Components/DeleteButton';


const Treatment = () => {

  const [diseases, setDiseases] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState("");
  const editorRef = useRef(null);
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");


  useEffect(() => {
    const fetchDisease = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/disease-category-data`);
        setDiseases(response.data.diseases);

      }
      catch (err) {
        console.error(err.response?.data || err.message);

      }

    }

    fetchDisease();


  }, [])

  useEffect(() => {
    if (!selectedDisease) {
      setContent("");
      setMessage("");
      return;
    }

    const activeDisease = diseases.find(
      (item) => item.d_id === Number(selectedDisease)
    );

    setContent(activeDisease?.description || "");
    setMessage("");
  }, [selectedDisease, diseases]);

  const activeDisease = diseases.find(
    (item) => item.d_id === Number(selectedDisease)
  );

  const handleEdit = (disease) => {
    setSelectedDisease(String(disease.d_id));
    setContent(disease.description || "");
    setMessage("");
  };

  const handleSaveDescription = async () => {
    if (!content.trim() || !selectedDisease) return;

    try {
      const response = await axios.put(
        `${API_BASE_URL}/update-disease-description/${selectedDisease}`,
        {
        description: content
        }
      );

      setDiseases((prevDiseases) =>
        prevDiseases.map((item) =>
          item.d_id === response.data.disease.d_id
            ? response.data.disease
            : item
        )
      );
      setMessage("Description saved successfully.");
    }
    catch (err) {
      setMessage("Unable to save description.");
      console.log(err.response?.data || err.message);
    }
  };

  const handleDeleteDescription = async (d_id) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/update-disease-description/${d_id}`,
        {
          description: ""
        }
      );

      setDiseases((prevDiseases) =>
        prevDiseases.map((item) =>
          item.d_id === response.data.disease.d_id
            ? response.data.disease
            : item
        )
      );

      if (Number(selectedDisease) === d_id) {
        setContent("");
      }

      setMessage("Description deleted successfully.");
    }
    catch (err) {
      setMessage("Unable to delete description.");
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <>
      <section className='bg-white w-11/12 mx-auto py-10 pl-5 rounded-lg'>
        <h1 className='text-[24px] font-semibold pb-2'>Description</h1>
        <label htmlFor="disease" className=''>Select disease name <span className='text-sm font-semibold'>(under which description of disease are written)</span>:</label>
        <br /><br/>
        <select name="disease" id='disease' value={selectedDisease} onChange={(e) => setSelectedDisease(e.target.value)}>
          <option value="">--select--</option>
          {
            diseases.map((item) => (
              <option value={item.d_id} key={item.d_id}>{item.disease_name}</option>
            ))
          }
        </select>
        <br/><br/>
        {
          activeDisease
          &&
          <h1 className='text-sm'><span className='font-bold'>URL for selected disease is shown as : </span>{`/diseases/${activeDisease.slug}`} </h1>
        }

        <br/>
        <JoditEditor 
        ref={editorRef}
        value={content}
        config={toolbarConfig}
        onBlur={(newContent) => setContent(newContent)}
        
        />
        {message && <p className='mt-4 text-sm text-green-700'>{message}</p>}
        <div className='mt-6 flex justify-end pr-18'>
          <button
            onClick={handleSaveDescription}
            className='bg-green-600 px-6 py-2 text-white rounded'
          >
            Save
          </button>
        </div>
      </section>

      <section className=''>
        <table className='w-11/12 mx-auto  m-10 bg-white rounded-lg  mt-10'>
          <thead className='text-center'>
            <tr>
              <th>Id</th>
              <th>Disease Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {diseases.map((item) => (
              <tr key={item.d_id} className='p-2'>
                <td>{item.d_id}</td>
                <td>{item.disease_name}</td>
                <td>{item.description ? "Saved" : "Not added yet"}</td>
                 <td className="flex justify-center items-center gap-2 p-2">
                  <EditButton btn="Edit" onClick={() => handleEdit(item)} />
                  <DeleteButton deleteBtn="Delete" onClick={() => handleDeleteDescription(item.d_id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </section>

    </>
  )
}

export default Treatment
