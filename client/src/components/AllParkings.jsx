import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const AllParkings = () => {
  const [parkings, setParkings] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Tirana");
  const [center, setCenter] = useState([41.3275, 19.8187])
  const [showMap, setShowMap] = useState(true);

  useEffect(() => {
    axios
    .get('http://localhost:8000/api/parkings', {
      params: {
        city: selectedCity
      },
      withCredentials: true})
    .then(res => {
      console.log(res.data);
      setParkings(res.data);

      if(parkings.length > 0) {
        setCenter([parkings[0].latitude, parkings[0].longitude])
      }
    })
    .catch(err => console.log(err))

  }, [selectedCity])

  useEffect(() => {
    axios
    .get('http://localhost:8000/api/cities', {withCredentials: true})
    .then(res => {
      console.log(res.data);
      setCities(res.data);

      if(cities.length > 0 && !cities.includes(selectedCity)) {
        setSelectedCity(cities[0])
      }
    })
    .catch(err => console.log(err))

  }, [])

  return (
    <>
      <div className="max-w-screen-xl mx-auto p-4 flex justify-between">
        {/*@todo - add total number of parkings*/}
        <h1>123 parkings in total</h1>
        <div className="flex ites-center">
          <button onClick={() => setShowMap(true)}
            className="flex items-center mr-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 pr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
          </svg>
             Show map</button>
          <button onClick={() => setShowMap(false)} className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 pr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
            Show list</button>
        </div>
        <select name="city" id="city" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
          {cities.length > 0 && cities.map((city, index) => {
            return (
              <option key={index}>{city}</option>
            )
          })}
        </select>
      </div>

      {!showMap && parkings.length > 0 && parkings.map((parking, index) => {
        return (
          <div key={index}>
            <p>{parking.address}</p>
          </div>
        )
      })
      }

      {showMap &&
        <div style={{ height: 'auto' }}>
          <MapContainer
            className="h-[70vh] w-full overflow-hidden" center={center} zoom={14} scrollWheelZoom={false}
            doubleClickZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {parkings.length > 0 && parkings.map((parking, index) => {
              return (
                <Marker key={index}
                        position={[parking.latitude, parking.longitude]}>
                  <Popup>
                    <div className="flex flex-col items-center">
                      {/*
                     @todo Link to details page
                    */}
                      <span>{parking.name}</span>
                      <span className="text-xs text-gray-400">{parking.address}</span>
                    </div>
                  </Popup>
                </Marker>
              )
            })}
          </MapContainer>
        </div>
      }
    </>
  )
}

export default AllParkings;
