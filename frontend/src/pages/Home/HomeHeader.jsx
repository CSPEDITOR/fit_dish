import React from 'react'
import dishImg from "../../images/dish1.png"

function HomeHeader() {
  return (
    <div className='home-header flex items-center justify-center h-[40vh] mt-8'>
        <div className="slogan w-full">
            <h1 className='text-7xl t-2 w-fit'>Healthy <span className='t-red'>Eating is</span></h1>
            <h1 className='text-7xl t-2 w-fit'><span className='t-red'>an</span> <span className='t-orange'>Important </span>Part</h1>
            <h1 className='text-7xl t-2 w-fit'>of Lifestyle </h1>
        </div>
        <div className='w-1/2'>
            <img src={dishImg} alt="" className='w-full aspect-square'/>
        </div>
    </div>
  )
}

export default HomeHeader