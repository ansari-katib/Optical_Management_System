import React from 'react'

//* Componets:
import Navbar from '../Components/Navbar'
import Carousel from '../Components/Carousel'
import Footer from '../Components/Footer'
import Categories from '../Components/Categories'
import TrendingOffer from '../Components/TrendingOffer'
import Description from '../Components/Description'

const Home = () => {
  return (
    <>
     <Navbar /> 
     <Carousel />
     <Categories />
     <TrendingOffer />
     <Description />
     <Footer />
    </>
  )
}

export default Home
