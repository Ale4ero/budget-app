import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='background'>
        <div className="pageContent">
            <h2 className='position-relative mx-3'>Sorry</h2>
            <p className='position-relative mt-3 '>That page cannot be found</p>
            <Link to='/' className='mt-3 mx-2'>Back to home...</Link>
        </div>
      
    </div>
  )
}
