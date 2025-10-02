import React from 'react'

export default function FullScreenLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
        <div
          aria-label="Loading"
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
        ></div>
      </div>
  )
}
