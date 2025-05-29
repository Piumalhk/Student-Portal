import React from 'react'

export default function LogingForm() {
  return (
    <div className='flex justify-center items-center mt-20'>
        <form className='w-100 h-130 bg-blue-100  '>
            <h2 className='text-center mt-20 font-sans text-2xl font-semibold'>Portal Login</h2>

            <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input 
            type='text' 
            id="username"
            placeholder='Enter your username' 
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
        </div>

          <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input 
            type='password' 
            id="password"
            placeholder='Enter your password' 
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
        </div>
        </form>
    </div>
  )
}
