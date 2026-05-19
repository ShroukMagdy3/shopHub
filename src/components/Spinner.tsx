import React from 'react'

export default function Spinner() {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-14 h-14 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
    </div>
  )
}
