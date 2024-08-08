import React from 'react'

function AdminFooter() {
  return (
    <>
      <div className='py-2 d-flex justify-content-between'
        style={{ backgroundColor: "black" , color:"grey"}}>
        <p className='mb-0 mx-3' style={{fontSize: 'smaller'}}>
          EVENT SPACE BOOKING. All Rights Reserved
        </p>
        <p className='mb-0 mx-4' style={{fontSize: 'smaller'}}>
          2024 &copy; Copyright
        </p>
      </div>

    </>
  )
}

export default AdminFooter
