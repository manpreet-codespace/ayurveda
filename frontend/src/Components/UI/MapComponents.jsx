import React from 'react'
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';


const MapComponents = () => {
      const position =[31.658458496437337, 74.83161273535396]
      const locationName= "Ayurveda Yogashram";


  return (
    <>
        <MapContainer
        center= {position}
        zoom={13}
        scrollWheelZoom={true}
        className="h-[500px] "
        >
            
            <TileLayer
            // attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

        <Marker position={position}>
            <Popup>{locationName}</Popup>
        </Marker>
        </MapContainer>
    </>
  )
}

export default MapComponents
