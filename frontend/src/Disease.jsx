import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from './Components/Layouts/Navbar';

import { API_BASE_URL } from './config/api';
import Footer from './Components/Layouts/Footer';
import { Link } from 'react-router-dom';
import { slugify } from '../utils/Slugify';

const Disease = () => {
     const [categories, setCategories] = useState([]);
      const [disease, setDisease] = useState([]);
      

    useEffect(() => {
    const fetchDisease = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/disease-category-data`,
        );


        const savedCategories = response.data.categories.map((category) => ({
          id: category.c_id,
          name: category.category_name,
        }));

        const savedDisease = response.data.diseases.map((disease) => ({
          id: disease.d_id,
          name: disease.disease_name,
          category: disease.Category?.category_name || "",
        }));

        setCategories(savedCategories);
        setDisease(savedDisease);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    fetchDisease();

  }, []);

  return (
    <>
    <Navbar/>

    <section className='pt-10 flex gap-6 flex-wrap w-11/12 mx-auto'>
            {categories.map((item) => {
              const relatedDiseases = disease.filter(
                (entry) => entry.category === item.name,
              );

              if (relatedDiseases.length === 0) {
                return null;
              }

              return (
                <div key={item.id} className="mt-6 w-70">
                  <h2 className="font-semibold text-green-700 tracking-wide py-2 border-b-2 border-amber-800 text-[20px]">{item.name.toUpperCase()}</h2>
                  <ul className="px-5 py-2">
                    {relatedDiseases.map((entry) => (
                      <li key={entry.id} className='py-1'>
                        <Link to={`/diseases/${slugify(entry.name+ "-" + entry.id)}`} className='text-gray-800'>{entry.name[0].toUpperCase()+ entry.name.slice(1)}</Link>
                      </li>
                    ))} 
                  </ul>
                </div>
              );
            })}

    </section>
    <Footer/>
    </>
  )
}

export default Disease
