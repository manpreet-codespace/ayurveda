import React from "react"
import Navbar from "./Components/Layouts/Navbar"
import OPD_timings from "./Components/UI/OPD_timings"
import { problems_config } from "./config/problems_config"
import Problems from "./Components/UI/Problems"

function App() {


  const opd_timings = [
    {name:"Amritsar OPD Dates will be  11 & 29 April 2026"},
    {name:"Mohali OPD dates will be 9 & 27 April 2026"},
    {name:"Gurgaon OPD dates will be  4, 6 & 8 April 2026"}
  ]
  return (
    <>
      <Navbar/>

    <section className="h-40 flex justify-center items-center">
      <div className=" flex gap-6 rounded-lg justify-center">
        {
          opd_timings.map((name,index)=>(
            <div key={index}>
            <OPD_timings name={name.name}/>
            </div>
          ))
        }
        </div>
        </section>

        <section className="bg-[var(--pink)] py-12" >
          <div className="flex flex-wrap gap-6 w-10/12 mx-auto ">
            {
              problems_config.map((problem,index)=>(
                <div key={index}>
                    <Problems img={problem.img} name={problem.name}/>
                  </div>
              ))
            }
          </div>
        </section>
        

        <section>
          <h1 className="text-[var(--brown)] text-[36px] font-bold text-center ">Giving your health a new <span className="text-[var(--primary-dark)]">lift</span></h1>
        </section>
    </>
  )
}

export default App
