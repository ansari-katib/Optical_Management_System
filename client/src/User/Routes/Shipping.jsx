import React, { useEffect, useState } from 'react'

import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const Shipping = () => {
  const [message, setMessage] = useState('');

  return (
    <div>
      <Navbar />
      {/* <h1 className=' text-2xl flex justify-center items-center w-full h-screen' > {message} </h1> */}
      <h1 className=' text-2xl flex justify-center items-center w-full h-screen' > shipping page </h1>
      <Footer />
    </div>
  )
}

export default Shipping
