import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateParkingLot = () => {
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [spots, setSpots] = useState('')
  const [price, setPrice] = useState('')
  const [validation, setValidation] = useState({})
  const [searchLocations, setSearchLocations] = useState([])
  const [search, setSearch] = useState('')
  const [showSearchBar, setShowSearchBar] = useState(false)
  const navigate = useNavigate()

  const createParking = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8000/api/dashboard/create-parking', {
      name,
      city,
      address,
      latitude,
      longitude,
      spots,
      price,
    }, { withCredentials: true }).then(res => {
      console.log(res.data)
      navigate('/dashboard/parking-lots')
    }).catch(err => {
      console.log(err)
      setValidation(err.response.data.errors)
    })
  }

  const getAddress = (e) => {
    setSearch(e.target.value)

    if (search) {
      axios.get(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${search}&type=street&filter=countrycode:al&format=json&apiKey=06af4b03d37d4af6a2c546931bda94d7`,
      ).then((response) => {
        console.log(response.data)
        setSearchLocations(response.data.results)
      }).catch((err) => console.log(err))
    } else {
      setSearchLocations([])
    }
  }

  return (
    <>
      <div className="min-h-[calc(100vh-64px)] p-8">
        <form
          onSubmit={createParking}
          className="lg:w-1/2 w-full mx-auto p-12 shadow-box rounded-md bg-second"
        >
          <h2 className="center text-3xl font-bold text-white text-center">
            Create Parking Lot
          </h2>
          <div className="relative z-0 w-full my-6 group">
            <input
              value={name}
              type="text"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-main appearance-none focus:outline-none focus:ring-0 focus:border-main peer"
              placeholder=" "
              onChange={(e) => setName(e.target.value)}
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Parking name
            </label>
            {validation.name ? (
              <p className="text-sm text-red-600 font-bold">
                {validation.name.message}
              </p>
            ) : (
              ''
            )}
          </div>
          <div className="relative z-10 w-full my-6 group">
            <input
              value={search}
              type="text"
              id="address"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-main appearance-none focus:outline-none focus:ring-0 focus:border-main peer"
              placeholder=" "
              onInput={getAddress}
              onFocus={() => {
                setShowSearchBar(true)
                setSearch('')
              }}
              onBlur={() => setShowSearchBar(false)}
            />
            {showSearchBar && (
              <div
                id="search-results"
                className="absolute w-full bg-second text-white"
              >
                {searchLocations.length > 0 &&
                  searchLocations.map((searchLocation, index) => {
                    return (
                      <p key={index} onMouseDown={(e) => {
                        e.preventDefault()
                        setAddress(searchLocation.street)
                        setSearch(searchLocation.street)
                        setLatitude(searchLocation.lat)
                        setLongitude(searchLocation.lon)
                        setShowSearchBar(false)
                        setCity(searchLocation.city ?? searchLocation.county)
                      }
                      }
                         className="cursor-pointer dark:hover:bg-emerald-800 hover:text-white hover:bg-emerald-800 bg-slate-200 dark:bg-slate-700 w-full pl-3 py-3 rounded-md my-3">
                        {searchLocation.street}
                      </p>
                    )
                  })}

                {searchLocations.length === 0 &&
                  <p className="pl-3 py-3 rounded-md my-3">No results
                    found.</p>}
              </div>
            )}
            <label
              htmlFor="address"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Parking address
            </label>
            {validation.address ? (
              <p className="text-sm text-red-600 font-bold">
                {validation.address.message}
              </p>
            ) : (
              ''
            )}
          </div>

          <div className="relative z-0 w-full my-6 group">
            <input
              type="number"
              id="spots"
              min='1'
              value={spots}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-main appearance-none focus:outline-none focus:ring-0 focus:border-main peer"
              placeholder=" "
              onChange={(e) => setSpots(e.target.value)}
            />
            <label
              htmlFor="spots"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Spots available
            </label>
            {validation.spots ? (
              <p className="text-sm text-red-600 font-bold">
                {validation.spots.message}
              </p>
            ) : (
              ''
            )}
          </div>
          <div className="relative z-0 w-full my-6 group">
            <input
              type="number"
              value={price}
              min='1'
              id="price"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-main appearance-none focus:outline-none focus:ring-0 focus:border-main peer"
              placeholder=" "
              onChange={(e) => setPrice(e.target.value)}
            />
            <label
              htmlFor="price"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Parking price
            </label>
            {validation.price ? (
              <p className="text-sm text-red-600 font-bold">
                {validation.price.message}
              </p>
            ) : (
              ''
            )}
          </div>
          <button className="bg-main px-5 py-3 hover:bg-green-800 text-white">
            Create
          </button>
        </form>
      </div>
    </>
  )
}

export default CreateParkingLot