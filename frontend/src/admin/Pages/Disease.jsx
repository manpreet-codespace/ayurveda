import React, { useEffect, useState } from "react";
import EditButton from "../Components/EditButton";
import DeleteButton from "../Components/DeleteButton";
import axios from 'axios';

const API_BASE_URL = "http://localhost:5001/api";

const Disease = () => {
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [diseaseInput, setDiseaseInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [disease, setDisease] = useState([]);

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

  const handleAddCategory = async() => {
    if (!categoryInput.trim()) return;

    try{
      const response = await axios.post(`${API_BASE_URL}/save-disease-category`, {
        category_name: categoryInput
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
  return (
    <>
      <h1 className="text-[26px] font-semibold px-12">Categories of Disease</h1>
      <section className="bg-white w-11/12 p-10 flex gap-6 mx-auto mt-4 rounded-xl">
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
            onClick={handleAddDisease}
          >
            Save
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
                  <EditButton btn="Edit" />
                  <DeleteButton deleteBtn="Delete" />
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
