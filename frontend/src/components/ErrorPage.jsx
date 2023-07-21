import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <>
      <div className='grid place-items-center'>
        <h1 className='text-gray-600 text-2xl mt-20'>Page not found 😐</h1>
        <Link to={"/"} className='underline mt-10 text-sm text-blue-800'>Goto home page</Link>
      </div>
    </>
  )
}

export default ErrorPage