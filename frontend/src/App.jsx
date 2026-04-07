import React from "react"
import Navbar from "./Components/Layouts/Navbar"
import OPD_timings from "./Components/UI/OPD_timings"

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
    </>
  )
}

export default App
