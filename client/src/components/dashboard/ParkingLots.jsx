import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

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
      <Link to={'/dashboard/create-parking'} className="text-gray-900 border border-second hover:border-main hover:text-main focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2 mb-2">Create new parking</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
        {parkings.length > 0 && parkings.map((parking, index) => {
          return (
            <div key={index}
              className="rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.09),0_10px_20px_-2px_rgba(0,0,0,0.08)]">
              <div
                className="border-b-2 border-neutral-100 px-6 py-3 capitalize">
                {parking.name}
              </div>
              <div className="p-6">
                <h5
                  className="mb-2 text-xl font-medium leading-tight">
                  City: {parking.city}
                </h5>
                <p className="mb-4 text-base text-neutral-600">
                 Street address: {parking.address}
                </p>
                <p className="mb-4 text-base text-neutral-600">
                 Available spots: {parking.freeSpots}/{parking.spots}
                </p>
                <Link className="text-[#16a34a] font-bold"
                      to={`/dashboard/parking-lots/${parking._id}`}>View
                  parking</Link>
              </div>
              <div
                className="border-t-2 border-neutral-100 px-6 py-3">
                {moment(parking.createdAt).fromNow()}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default ParkingLots