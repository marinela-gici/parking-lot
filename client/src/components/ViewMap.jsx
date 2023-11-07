import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import axios from 'axios'

const ViewMap = () => {
  const [locations, setLocations] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/api/parkings').then(res => {
      console.log(res)
      setLocations(res.data)
    }).then(err => console.log(err))
  }, [])

  return (
    <>
      <p className="text-5xl my-8 text-center font-bold">All parking lots</p>
      <div style={{ height: 'auto' }}>
        <MapContainer
          className="h-[70vh] w-full overflow-hidden"center={[41.3275, 19.8187]} zoom={14} scrollWheelZoom={false}
          doubleClickZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locations.length > 0 && locations.map((location, index) => {
            return (
              <Marker key={index}
                      position={[location.latitude, location.longitude]}>
                <Popup>
                  <div className="flex flex-col items-center">
                    {/*
                     @todo Link to details page
                    */}
                    <span>{location.name}</span>
                    <span className="text-xs text-gray-400">{location.address}</span>
                  </div>
                </Popup>
              </Marker>
            )
          })}
        </MapContainer>
      </div>
    </>
  )
}

export default ViewMap