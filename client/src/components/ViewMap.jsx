import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ViewMap = ({ city }) => {
  const [locations, setLocations] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/api/parkings', {
      params: {
        city,
      },
    }).then(res => {
      console.log(res)
      setLocations(res.data)
    }).catch(err => console.log(err))
  }, [city])

  return (
    <>
      <div style={{ height: 'auto' }}>
        <MapContainer
          className="h-[70vh] w-full overflow-hidden"
          center={[41.3275, 19.8187]} zoom={14} scrollWheelZoom={false}
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
                    <Link className="text-main" to={`/parkings/${location._id}/details`}>{location.name}</Link>
                    <span
                      className="text-xs text-gray-400">{location.address}</span>
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