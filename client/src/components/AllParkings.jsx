import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Pagination from './Pagination.jsx'
import ViewMap from './ViewMap.jsx'

const AllParkings = ({ socket }) => {
  const PER_PAGE = 3
  const [parkings, setParkings] = useState([])
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState('Tirana')
  const [center, setCenter] = useState([41.3275, 19.8187])
  const [showMap, setShowMap] = useState(true)
  const [page, setPage] = useState(1)
  const [links, setLinks] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setPage(1)
  }, [selectedCity])

  useEffect(() => {
    axios.get(`http://localhost:8000/api/parkings-paginated`, {
      params: {
        limit: PER_PAGE,
        page: page,
        city: selectedCity,
      },
    }).then(res => {
      console.log(res.data)
      setParkings(res.data.parkings)
      setLinks(res.data.links)
      setTotal(res.data.itemCount)

      if (parkings.length > 0) {
        setCenter([parkings[0].latitude, parkings[0].longitude])
      }
    }).catch(err => console.log(err))
  }, [page, selectedCity])

  useEffect(() => {
    socket.on('toClient', (reservation) => {
      const updatedParkingIndex = parkings.findIndex(
        (item) => item._id === reservation.parking._id)

      if (updatedParkingIndex !== -1) {
        setParkings(prevParkings => {
          prevParkings[updatedParkingIndex].freeSpots = reservation.parking.freeSpots
          return (
            [...prevParkings]
          )
        })
      }
    })
  }, [page, selectedCity, parkings])

  useEffect(() => {
    axios.get('http://localhost:8000/api/cities', { withCredentials: true }).
      then(res => {
        console.log(res.data)
        setCities(res.data)

        if (cities.length > 0 && !cities.includes(selectedCity)) {
          setSelectedCity(cities[0])
        }
      }).
      catch(err => console.log(err))

  }, [])

  return (
    <>
      <div
        className="max-w-screen-xl mx-auto p-4 sm:flex sm:justify-between block">
        <div className="flex ites-center my-4 sm:my-0">
          <select className="focus:outline-none" name="city" id="city"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}>
            {cities.length > 0 && cities.map((city, index) => {
              return (
                <option key={index}>{city}</option>
              )
            })}
          </select>
          <button onClick={() => setShowMap(true)}
                  className={(showMap ? 'font-semibold text-main' : '') +
                    ' flex items-center mx-5'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                 fill="currentColor" className="w-5 h-5 pr-1">
              <path fillRule="evenodd"
                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"/>
            </svg>

            Show map
          </button>
          <button onClick={() => setShowMap(false)}
                  className={(!showMap ? 'font-semibold text-main' : '') +
                    ' flex items-center'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                 fill="currentColor" className="w-5 h-5 pr-1">
              <path fillRule="evenodd"
                    d="M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0A.75.75 0 018.25 6h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75zM2.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12A.75.75 0 017.5 12zm-4.875 5.25a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"/>
            </svg>

            Show list
          </button>
        </div>

      </div>
      {!showMap &&
        <>
          <div className="max-w-screen-xl p-4 mx-auto">
            <h1>{total} {total > 1 ? 'parkings' : 'parking'} in total</h1>
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
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
                            to={`/parkings/${parking._id}/details`}>View
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

            {links.length > 1 &&
              <Pagination page={page} setPage={setPage} links={links}/>
            }
          </div>
        </>
      }

      {showMap &&
        <ViewMap city={selectedCity} setCity={setSelectedCity}/>
      }
    </>
  )
}

export default AllParkings
