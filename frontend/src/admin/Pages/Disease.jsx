import React, { useEffect, useState } from "react";
import EditButton from "../Components/EditButton";
import DeleteButton from "../Components/DeleteButton";
import axios from 'axios';
import { API_BASE_URL } from "../../config/api";

const Disease = () => {
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [diseaseInput, setDiseaseInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [disease, setDisease] = useState([]);
  const [editId, setEditId] = useState(null);



  useEffect(() => {
    const fetchDiseaseData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/disease-category-data`);

        const savedCategories = response.data.categories.map((category) => ({
          id: category.c_id,
          name: category.category_name,
        }));

        const savedDiseases = response.data.diseases.map((item) => ({
          id: item.d_id,
          name: item.disease_name,
          categoryId: item.c_id,
          category: item.Category?.category_name || "",
        }));

        setCategories(savedCategories);
        setDisease(savedDiseases);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    fetchDiseaseData();
  }, []);


  const handleDeleteDisease= async(d_id) =>{
      try{
        const response = await axios.delete(`${API_BASE_URL}/delete-disease/${d_id}`);

        setDisease((prev)=>
          prev.filter((item)=>item.id != d_id)
      )
      }
      catch(err)
      {
        console.error(err.response?.data || err.message);

      }
  }

  const handleAddCategory = async() => {
    if (!categoryInput.trim()) return;

    const categoryExists = categories.some((category) => (
      category.name.toLowerCase() === categoryInput.trim().toLowerCase()
    ));

    if (categoryExists) {
      console.error("Category already exists");
      return;
    }

    try{
      const response = await axios.post(`${API_BASE_URL}/save-disease-category`, {
        category_name: categoryInput.trim()
      });
    
    const newCategory = {
      id: response.data.category.c_id,
      name: response.data.category.category_name,
    };

    setCategories((prevCategories) => [...prevCategories, newCategory]);
    setCategoryInput("");
  }catch(err)
  {
    console.error(err.response?.data || err.message);

  }
  };

  const handleAddDisease = async() => {
  if (!diseaseInput.trim() || !selectedCategory) return;

    const category = categories.find((cat) => (
      cat.id === Number(selectedCategory)
    ));
    try{

      const response = await axios.post(`${API_BASE_URL}/save-disease-category`,
        {
          c_id: Number(selectedCategory),
          disease_name:diseaseInput
        }
      ) 
      
      const newDisease = {
        id: response.data.disease.d_id,
        name: response.data.disease.disease_name,
        categoryId: response.data.disease.c_id,
        category: category.name,
      };
      setDisease((prevDisease) => [...prevDisease, newDisease]);
      setSelectedCategory("");
      setDiseaseInput("");
    }catch(err)
    {
      console.error(err.response?.data || err.message);
      
    }
  };


  const handleEdit = (disease) =>{
      setSelectedCategory(disease.categoryId);
      setDiseaseInput(disease.name)
      setEditId(disease.id);

  }

  const handleUpdateDisease = async() =>{
    if (!diseaseInput.trim() || !selectedCategory || !editId) return;

    const category = categories.find((cat) => (
      cat.id === Number(selectedCategory)
    ));

      try{
        const response = await axios.put(`${API_BASE_URL}/update-disease/${editId}`, {
          c_id: Number(selectedCategory),
          disease_name: diseaseInput
        });

        const updatedDisease = {
          id: response.data.disease.d_id,
          name: response.data.disease.disease_name,
          categoryId: response.data.disease.c_id,
          category: category.name,
        };

        setDisease((prevDisease) =>
          prevDisease.map((item) =>
            item.id === editId ? updatedDisease : item
          )
        );

        setSelectedCategory("");
        setDiseaseInput("");
        setEditId(null);
      }
      catch(err)
      {
        console.error(err.response?.data || err.message);
      }
  }
  
  return (
    <>
      <section className="bg-white w-11/12 p-10 mx-auto mt-4 rounded-xl">
      <h1 className="text-[20px] font-semibold pb-2">Categories of Disease</h1>
       <div className="flex gap-6">

        <input
          type="text"
          onChange={(e) => setCategoryInput(e.target.value)}
          value={categoryInput}
          placeholder="Categories of disease"
          className=" p-2 w-4/12 border border-gray-300 rounded-sm"
          />

        <button
          className="px-4 py-2 bg-black text-white font-semibold tracking-widest rounded-lg"
          onClick={handleAddCategory}
          >
          Save
        </button>
      </div>
      </section>
      <section className="bg-white w-11/12 p-10 flex flex-col gap-6 mx-auto rounded-xl mt-4">
        <div>
          <h2 className="mb-2 font-semibold ">Name of Diseases</h2>
          <select
            className="border border-gray-300 p-2 w-3/12 text-sm"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Categories</option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-6">
          <input
            type="text"
            placeholder="Name of Disease"
            onChange={(e) => setDiseaseInput(e.target.value)}
            value={diseaseInput}
            className="p-2 w-4/12 border border-gray-300 rounded-sm"
          />
          <button
            className="bg-black text-white px-4 py-2 tracking-wides font-semibold rounded-lg"
            onClick={editId ? handleUpdateDisease : handleAddDisease}
          >
            {editId ? "Update" : "Save"}
          </button>
        </div>
      </section>

      <section>
        <table className="w-11/12 mx-auto  m-10 bg-white rounded-lg  mt-10">
            <thead>

          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Categories</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
            <tbody>

          {disease.length > 0 ? (
              disease.map((disease) => (
                <tr className="text-center" key={disease.id}>
                <td>{disease.name}</td>
                <td>{disease.category}</td>
                <td className="flex justify-center items-center gap-2 p-2">
                  <EditButton btn="Edit" onClick={()=>handleEdit(disease)} />
                  <DeleteButton deleteBtn="Delete" onClick={()=>handleDeleteDisease(disease.id)}/>
                </td>
              </tr>
            ))
        ) : (
            <tr>
                <td colSpan="3" className="text-center p-4">
                  No diseases added yet
                </td>
              </tr>
          )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Disease;