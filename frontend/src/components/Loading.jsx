import React from 'react'

export default function Loading() {
  return (
    <div>
        <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mx-auto mb-4"></div>
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    </div>
    </div>
  )
}
