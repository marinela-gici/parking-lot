import React from 'react';

const Dashboard = () => {
  return (
    <>
      {/*total posts, total bids, estimated revenue*/}
      {/*    total posts*/}

      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Noteworthy technology acquisitions
          2021</h5>
        <p className="mb-3 font-normal text-gray-700">Here are the biggest enterprise technology acquisitions of
          2021 so far, in reverse chronological order.</p>
        <a href="#"
           className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
          Read more
          <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </a>
      </div>

    </>
  )
}

export default Dashboard;