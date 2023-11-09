import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'

const ParkingLotDetails = () => {
  const [parking, setParking] = useState()
  const { id } = useParams()

  useEffect(() => {
    axios.get(`http://localhost:8000/api/dashboard/user/parkings/${id}`,
      { withCredentials: true }).then(res => {
      console.log(res.data)
      setParking(res.data)
    }).catch(err => console.log(err))
  }, [])

  const getEstimation = (reservation) => {
    const now = moment.utc();
    const seconds = now.diff(moment.utc(reservation.createdAt), 'seconds');
    const hours = Math.ceil(seconds / 3600);
    return parking.price * hours
  }

  return (
    <>
      {parking &&
        <div>
          <div className="mb-4">
            <p className="font-bold">Name: <span
              className="font-normal">{parking.name}</span></p>
            <p className="font-bold">City: <span
              className="font-normal">{parking.city}</span></p>
            <p className="font-bold">Address: <span
              className="font-normal">{parking.address}</span></p>
          </div>

          {parking.reservations.length === 0 &&
            <p className="text-rose-500">No reservations yet!</p>}

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
            {parking.reservations.length > 0 &&
              parking.reservations.map((reservation, index) => {
                return (
                  <div key={index}
                       className="rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.09),0_10px_20px_-2px_rgba(0,0,0,0.08)]">
                    <div
                      className="border-b-2 border-neutral-100 px-6 py-3 capitalize">
                      Plate number: <span
                      className="font-medium">{reservation.plate}</span>
                    </div>
                    <div className="p-6">
                      <p className="mb-4 text-base text-neutral-600">Entry
                        time</p>
                      <p>
                        {moment(reservation.createdAt).
                          format('YYYY-MM-DD HH:mm:ss')}
                      </p>
                    </div>
                    <div
                      className="border-t-2 border-neutral-100 px-6 py-3">
                      Estimated price: {getEstimation(reservation)} LEK
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      }
    </>
  )
}

export default ParkingLotDetails