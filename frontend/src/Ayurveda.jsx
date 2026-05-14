import React, { useEffect, useState } from "react";
import Navbar from "./Components/Layouts/Navbar";
import Footer from "./Components/Layouts/Footer";
import Breadcrumbs from "./Components/UI/Breadcrumbs";
import { Link } from "react-router";
import axios from "axios";
import { API_BASE_URL } from "./config/api";

const Ayurveda = () => {
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
      <Navbar />
      <section>
        <Breadcrumbs />
      </section>
      <section className="mt-30">
        <div className="w-11/12 mx-auto">
          <h1 className="text-[22px] font-semibold leading-relaxed">
            ABOUT AYURVEDA
          </h1>
          <p className="leading-relaxed">
            Ayurveda is an ancient & natural system of medicine, healing the
            root-cause of illness and purifying body, mind, & soul .Main focus
            of ayurveda is complete care of health, career, relationships &
            spiritual life with herbs, nutrition, aromas, yoga, mantras,
            life-purpose & many other aspects of life & nature.
          </p>
          <br />
          <h1 className="text-[22px] font-semibold leading-relaxed">
            MEANING OF AYURVEDA
          </h1>
          <p className="leading-relaxed">
            Ayurveda (a Sanskrit word meaning the ‘science’ or ‘wisdom of life’)
            is an ancient philosophy based on a deep understanding of eternal
            truths about the human body, mind and sprit. Unlike orthodox
            medicine, it is not based on the frequently changing finding of
            specific research projects, but rather on permanent, wise eternal
            principles of living.
          </p>
          <br />
          <h1 className="text-[22px] font-semibold leading-relaxed">
            Definition of Ayurveda
          </h1>
          <p className="leading-relaxed">
            The literal meaning of “ayu” is life. According to Ayurveda this is
            explained as the combined state of Sharira (body), Indriya (Sense),
            Mana (Psyche) and Atma (Soul). Out of these Sharir is visible and is
            considered as sthoola sharir, which is made up of Panchamahabhoota.
            Indriya, mana and atma are not visible and hence are called as
            sukshma sharir or linga sharir.{" "}
          </p>
          <h2 className="leading-relaxed font-bold">
            Ayurveda deals with the ways and means to achieve health and also
            the path, which leads to disease. It also deals with quantum of the
            Ayu (life).
          </h2>
          <p className="leading-relaxed">
            “We treat the patients by judging the cause of the disease whether
            it may be physical or mental. Then with the help of Ayurvedic
            formulations and herbs, Yoga and Pranayam, Diet instructions, daily
            and seasonal routines.”
          </p>
          <br />
          <h1 className="text-[22px] font-semibold leading-relaxed">
            Treatments with Ayurveda
          </h1>
          <p className="leading-relaxed">
            In this page we describe all the problems and their Ayurvedic
            treatments. click below on the problem to get more on their
            ayurvedic treatments.
          </p>

          <div>
            {categories.map((item) => {
              const relatedDiseases = disease.filter(
                (entry) => entry.category === item.name,
              );

              if (relatedDiseases.length === 0) {
                return null;
              }

              return (
                <div key={item.id} className="mt-6">
                  <h2 className="font-semibold text-[20px]">{item.name}</h2>
                  <ul className="list-disc px-10">
                    {relatedDiseases.map((entry) => (
                      <li key={entry.id}>
                        <Link to="/" className="hover:text-red-400">{entry.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Ayurveda;
