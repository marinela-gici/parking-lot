import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UpdateProfile = ({setUpdated}) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [validation, setValidation] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:8000/api/dashboard/profile', {
      withCredentials: true,
    }).then((res) => {
      console.log(res.data)
      setUsername(res.data.username)
      setEmail(res.data.email)
    }).then((error) => console.log(error))
  }, [])

  const updateProfile = (e) => {
    e.preventDefault()
    axios.patch('http://localhost:8000/api/dashboard/profile', {
      username,
    }, { withCredentials: true }).then(res => {
      console.log(res)
      setUpdated(true)
      navigate('/dashboard')
    }).catch((error) => {
      console.log(error)
      setValidation(error.response.data.errors)
    })
  }
  return (
    <div>
      <div className="min-h-[calc(100vh-64px)] p-8">
        <form
          onSubmit={updateProfile}
          className="lg:w-1/2 w-full mx-auto p-12 shadow-box rounded-md bg-second"
        >
          <h2 className="center text-white text-4xl font-bold text-center">
            Update profile
          </h2>
          <div className="relative z-0 w-full my-6 group">
            <input
              value={username}
              type="text"
              name="username"
              id="username"
              placeholder=" "
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-main appearance-none focus:outline-none focus:ring-0 focus:border-main peer"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label
              htmlFor="username"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Username
            </label>
            {validation.username ? (
              <p className="text-sm text-red-600 font-bold">
                {validation.username.message}
              </p>
            ) : (
              ''
            )}
          </div>
          <div className="relative z-0 w-full my-6 group">
            <input
              defaultValue={email}
              disabled={true}
              type="text"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-main appearance-none focus:outline-none focus:ring-0 focus:border-main peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>

          <button
            type="submit"
            className="bg-main hover:bg-green-800 rounded-md md:px-6 px-4 md:py-3 py-2 text-lg font-semibold text-white shadow-sm">
            Update
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateProfile