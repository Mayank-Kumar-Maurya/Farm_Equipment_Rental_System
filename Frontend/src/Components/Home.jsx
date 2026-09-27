import React, { useContext } from 'react'
import ServerContext from '../Context/ServerContext'
import Slider from './Slider'
import Card from './Card'
import HomePage from './Pages/HomePage'

function Home() {

    const {count, setCount} = useContext(ServerContext)
  return (
    // <>
    //   <Slider/>
    //   <h3 className='text-center m-4'>Buy the Equipment</h3>
    //   <div className='row m-0 p-0' >
    //     <Card/>
    //     <Card/>
    //     <Card/>
    //     <Card/>
    //     <Card/>
    //     <Card/>
    //     <Card/>
    //     <Card/>
    //     <Card/>
    //     <Card/>
    //     <Card/>
    //     <Card/>
    //     <Card/>
    //     <Card/>
    //     <Card/>
    //     <Card/>
    //     <Card/>
    //     <Card/>
    //   </div>
    // </>
    <>
    <HomePage />
    </>
  )
}

export default Home
