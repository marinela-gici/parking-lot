import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Dashboard = () => {
  const [total, setTotal] = useState(0)
  const [free, setFree] = useState(0)

  useEffect(() => {
    axios.get('http://localhost:8000/api/dashboard', { withCredentials: true }).
      then(res => {
        console.log(res)
        setTotal(res.data.total);
        setFree(res.data.free);
      })
  }, [])
  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div
          className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
          <h5
            className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Total
            parkings</h5>
          <p className="mb-3 font-semibold text-xl text-main">{total}</p>

        </div>
        <div
          className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
          <h5
            className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Free
            parking spots</h5>
          <p className="mb-3 font-semibold text-xl text-main">{free}</p>

        </div>
      </div>
    </>
  )
}

export default Dashboard