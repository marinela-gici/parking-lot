import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import QRCode from 'react-qr-code'
import ReactToPrint from 'react-to-print'
import moment from 'moment/moment.js'

const ParkingDetails = ({ socket }) => {
  const [isActive, setIsActive] = useState(false)
  const [isExitActive, setIsExitActive] = useState(false)
  const [parking, setParking] = useState()
  const [plate, setPlate] = useState('')
  const [reservation, setReservation] = useState()
  const [updated, setUpdated] = useState(false)
  const [reservationNumber, setReservationNumber] = useState('')
  const [exitReservation, setExitReservation] = useState()
  const [validation, setValidation] = useState({})
  const ref = useRef()
  const { id } = useParams()

  useEffect(() => {
    axios.get(`http://localhost:8000/api/parkings/${id}`).then(res => {
      console.log(res.data)
      setParking(res.data)
    }).catch(err => console.log(err))

    socket.on('toClient', (reservation) => {

      if (reservation.parking._id === id) {
        setUpdated(!updated)
      }
    })
  }, [updated])

  const reserve = (e) => {
    e.preventDefault()
    axios.post(`http://localhost:8000/api/parkings/${id}/reserve`, {
      plate,
    }).then(res => {
      console.log(res.data)
      setReservation(res.data)
      setValidation({})
      setIsActive(true)
      socket.emit('newReservation', res.data)
    }).catch(err => {
      console.log(err)
      setValidation(err.response.data.errors)
    })
  }

  const exit = (e) => {
    e.preventDefault()
    axios.post(`http://localhost:8000/api/parkings/${id}/exit`, {
      reservationNumber,
    }).then(res => {
      setIsExitActive(true)
      setValidation({})
      setExitReservation(res.data)
      socket.emit('newReservation', res.data)
    }).catch(err => {
      console.log(err)
      setValidation(err.response.data.errors)
    })
  }

  return (
    <>
      {parking &&
        <div className="max-w-screen-xl mx-auto p-4">
          <p className="text-2xl text-center capitalize">{parking.name} details
          </p>
          <div
            className="flex flex-wrap flex-col-reverse md:flex-row">
            <div className="w-full md:w-2/3">
              <div className="mb-4">
                <p className="font-bold">City: <span
                  className="font-normal">{parking.city}</span></p>
                <p className="font-bold">Address: <span
                  className="font-normal">{parking.address}</span></p>
              </div>
              <div className="h-auto">
                <MapContainer
                  className="h-[65vh] w-full overflow-hidden"
                  center={[parking.latitude, parking.longitude]} zoom={14}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={[parking.latitude, parking.longitude]}>
                    <Popup>
                      <div className="flex flex-col items-center">
                        <span>{parking.name}</span>
                        <span
                          className="text-xs text-gray-400">{parking.address}</span>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
            <div
              className="w-full md:w-1/3 flex justify-center items-center flex-col">
              <div className="mb-4">
                <p className={(parking.freeSpots === 0 ? 'text-rose-500' : '') +
                  ' font-bold'}>Free spots: <span
                  className="font-normal">{parking.freeSpots}/{parking.spots}</span>
                </p>
              </div>
              <form className="text-center mb-5" onSubmit={reserve}>
                <div className="relative z-0 w-full mb-6 group">
                  <input type="text" id="plate"
                         disabled={parking.freeSpots === 0}
                         onChange={(e) => setPlate(e.target.value)}
                         value={plate}
                         className="block py-2.5 px-0 w-full text-sm text-main bg-transparent border-0 border-b-2 border-main appearance-none focus:outline-none focus:ring-0 focus:border-main peer"
                         placeholder=" "/>
                  <label htmlFor="plate"
                         className="left-0 w-full peer-focus:font-medium absolute text-sm text-main duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Plate
                    number</label>
                  {validation.plate
                    ? <p
                      className="text-sm text-red-600 font-bold">{validation.plate.message}</p>
                    : ''}
                </div>
                {validation.full
                  ? <p
                    className="text-sm text-red-600 font-bold mb-4">{validation.full.message}</p>
                  : ''}

                <button
                  className={(parking.freeSpots === 0
                      ? 'cursor-not-allowed bg-gray-500 text-white hover:bg-gray-500'
                      : '') +
                    ' text-second bg-main border border-main hover:border-green-800 hover:text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2 mb-2'}>
                  Park now
                </button>
              </form>

              <form className="text-center" onSubmit={exit}>
                <div className="relative z-0 w-full mb-6 group">
                  <input type="text"
                         id="reservationNumber"
                         onChange={(e) => setReservationNumber(e.target.value)}
                         value={reservationNumber}
                         className="block py-2.5 px-0 w-full text-sm text-main bg-transparent border-0 border-b-2 border-main appearance-none focus:outline-none focus:ring-0 focus:border-main peer"
                         placeholder=" "/>
                  <label htmlFor="reservationNumber"
                         className="left-0 w-full peer-focus:font-medium absolute text-sm text-main duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Reservation Number
                  </label>
                  {validation.reservationNumber
                    ? <p
                      className="text-sm text-red-600 font-bold">{validation.reservationNumber.message}</p>
                    : ''}
                </div>
                <button
                  className="text-second bg-main border border-main hover:border-green-800 hover:text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2 mb-2">
                  Exit parking
                </button>
              </form>
            </div>
          </div>
        </div>
      }
      {reservation &&
        <div
          ref={ref}
          className={!isActive
            ? 'hidden'
            : 'flex items-center justify-center' +
            ' bg-gray-700/50 fixed top-0 left-0 right-0 z-[99999] w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full'}>
          <div className="relative w-full max-w-md max-h-full">

            <div
              className="relative bg-white rounded-lg shadow">
              <button type="button"
                      onClick={() => {
                        setIsActive(false)
                        setReservation(undefined)
                        setPlate('')
                      }}
                      className="print:hidden absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center">
                <svg className="w-3 h-3"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 14 14">
                  <path stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3
                  className="mb-4 text-xl font-medium text-gray-900 text-center">Your
                  parking ticket</h3>
                <div style={{
                  height: 'auto',
                  margin: '0 auto',
                  maxWidth: 150,
                  width: '100%',
                }}>
                  <QRCode
                    size={256}
                    style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                    value={reservation._id}
                    viewBox={`0 0 256 256`}
                  />
                </div>
                <div className="text-center my-5">
                  <p>Your car plate: {reservation.plate}</p>
                  <p>Entry time: {moment(reservation.createdAt).
                    format('YYYY-MM-DD HH:mm:ss')}</p>
                </div>
                <div className="text-gray-500 mb-5 font-xs text-center">
                  <p>Having trouble scanning your code?</p>
                  <p>{reservation._id}</p>
                </div>
                <div className="text-center">
                  <ReactToPrint
                    bodyClass="print-agreement"
                    content={() => ref.current}
                    trigger={() => (
                      <button className="print:hidden text-second bg-main border border-main hover:border-green-800 hover:text-white hover:bg-green-800
                  focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2 mb-2"
                              type="primary">
                        Print
                      </button>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      }

      {exitReservation &&
        <div
          className={!isExitActive
            ? 'hidden'
            : 'flex items-center justify-center' +
            ' bg-gray-700/50 fixed top-0 left-0 right-0 z-[99999] w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full'}>
          <div className="relative w-full max-w-md max-h-full">

            <div
              className="relative bg-white rounded-lg shadow">
              <button type="button"
                      onClick={() => {
                        setIsExitActive(false)
                        setExitReservation(undefined)
                        setReservationNumber('')
                      }}
                      className="print:hidden absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center">
                <svg className="w-3 h-3"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 14 14">
                  <path stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3
                  className="mb-4 text-xl font-medium text-gray-900 text-center">Your
                  total</h3>

                <div className="text-center my-5">
                  <p>Your car plate: {exitReservation.plate}</p>
                  <p>Total: {exitReservation.total} LEK</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default ParkingDetails