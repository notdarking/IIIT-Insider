import React from 'react'
import Carousel from "../Components/Carousel"
import CollegeMatch from '../Components/CollegeMatch'
import Charm from '../Components/Charm'

const Home = () => {
  return (
    <div className='flex flex-col gap-12 p-0 m-0'>
      <Carousel />
      <CollegeMatch />
      <Charm />
    </div>
  )
}

export default Home
