import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ParkingLots = () => {
  const [parkings, setParkings] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/api/dashboard/user/parkings',
      { withCredentials: true }).then(res => {
      console.log(res.data)
      setParkings(res.data)
    }).catch(err => console.log(err))

  }, [])
  return (
    <>
      <Link to={'/dashboard/create-parking'}>Create parking lot</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {parkings.length > 0 && parkings.map((parking, index) => {
          return (
            <div key={index}>
              <div>
                <p>Parking name: {parking.name}</p>
                <p>Parking location: {parking.address}</p>
                <p>Free Parkings: 0/{parking.spots}</p>
              </div>

            </div>
          )
        })}
      </div>
    </>
  )
}

export default ParkingLots