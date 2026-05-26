import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from './Components/Layouts/Navbar';

import { API_BASE_URL } from './config/api';
import Footer from './Components/Layouts/Footer';
import { Link, useParams } from 'react-router-dom';

const Disease = () => {
     const [categories, setCategories] = useState([]);
      const [diseases, setDiseases] = useState([]);
      const [selectedDisease, setSelectedDisease] = useState(null);
      const [loading, setLoading] = useState(true);
      const { slug } = useParams();

    useEffect(() => {
      const fetchDisease = async () => {
        setLoading(true);

        try {
          if (slug) {
            const response = await axios.get(`${API_BASE_URL}/disease/${slug}`);
            setSelectedDisease(response.data.disease);
            setCategories([]);
            setDiseases([]);
          } else {
            const response = await axios.get(`${API_BASE_URL}/disease-category-data`);

            const savedCategories = response.data.categories.map((category) => ({
              id: category.c_id,
              name: category.category_name,
            }));

            const savedDiseases = response.data.diseases.map((disease) => ({
              id: disease.d_id,
              name: disease.disease_name,
              slug: disease.slug,
              description: disease.description,
              category: disease.Category?.category_name || "",
            }));

            setCategories(savedCategories);
            setDiseases(savedDiseases);
            setSelectedDisease(null);
          }
        } catch (err) {
          console.error(err.response?.data || err.message);
          setSelectedDisease(null);
        } finally {
          setLoading(false);
        }
      };

      fetchDisease();
    }, [slug]);

  const renderDiseaseList = () => (
    <section className='pt-10 flex gap-6 flex-wrap w-11/12 mx-auto'>
      {categories.map((item) => {
        const relatedDiseases = diseases.filter(
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
                  <Link to={`/diseases/${entry.slug}`} className='text-gray-800'>
                    {entry.name[0].toUpperCase() + entry.name.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </section>
  );

  const renderDiseaseDetails = () => {
    if (loading) {
      return <section className="w-11/12 mx-auto py-10">Loading...</section>;
    }

    if (!selectedDisease) {
      return (
        <section className="w-11/12 mx-auto py-10">
          <h1 className="text-[28px] font-semibold text-green-700">Disease not found</h1>
          <Link to="/diseases" className="inline-block mt-4 text-amber-800">
            Back to disease list
          </Link>
        </section>
      );
    }

    return (
      <section className="w-11/12 mx-auto py-10">
        <Link to="/diseases" className="inline-block mb-6 text-amber-800">
          Back to disease list
        </Link>
        <h1 className="text-[32px] font-semibold text-green-700">
          {selectedDisease.disease_name}
        </h1>
        <div
          className="mt-6 prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: selectedDisease.description || "<p>Description will be added soon.</p>",
          }}
        />
      </section>
    );
  };

  return (
    <>
    <Navbar/>
    {slug ? renderDiseaseDetails() : renderDiseaseList()}
    <Footer/>
    </>
  )
}

export default Disease
