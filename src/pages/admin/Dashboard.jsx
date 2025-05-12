import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';

const Dashboard = () => {
  const [sideBar, setSideBar] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50" x-data="{ sideBar: false }">
      <Sidebar sideBar={sideBar} setSideBar={setSideBar} />
      <div className="ml-0 transition md:ml-60">
        <Header setSideBar={setSideBar} />
        <div className="p-4">
          <div className="flex-wrap items-center justify-between text-center sm:flex">
            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-2">
              <div className='p-4 bg-white shadow-md rounded-2xl my-2'>
                <div className="flex items-center">

                  <p className="ml-2 text-xs text-gray-700 text-md">
                    Nombre de tickets
                  </p>
                </div>
                <div className="flex flex-col justify-start">
                  <p className="my-4 text-3xl font-bold text-left text-gray-800">
                    500 000
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-2">
              <div className='p-4 bg-white shadow-md rounded-2xl my-2'>
                <div className="flex items-center">

                  <p className="ml-2 text-xs text-gray-700 text-md">
                    Nombre de tickets utilisés
                  </p>
                </div>
                <div className="flex flex-col justify-start">
                  <p className="my-4 text-3xl font-bold text-left text-gray-800">
                    12
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-2">
              <div className='p-4 bg-white shadow-md rounded-2xl my-2'>
                <div className="flex items-center">

                  <p className="ml-2 text-xs text-gray-700 text-md">
                    Nombre de tickets restants
                  </p>
                </div>
                <div className="flex flex-col justify-start">
                  <p className="my-4 text-3xl font-bold text-left text-gray-800">
                    499 988
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-2">
              <div className='p-4 bg-white shadow-md rounded-2xl my-2'>
                <div className="flex items-center">

                  <p className="ml-2 text-xs text-gray-700 text-md">
                    Nombre de clients
                  </p>
                </div>
                <div className="flex flex-col justify-start">
                  <p className="my-4 text-3xl font-bold text-left text-gray-800">
                    10
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard