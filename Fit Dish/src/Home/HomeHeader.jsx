import React from 'react'
import dishImg from "../../src/images/dish1.png"

function HomeHeader() {
  return (
    <div className='home-header flex items-center justify-around h-[40vh]'>
        <div className="slogan w-1/2">
            <h1 className='text-7xl t-2'>Healthy <span className='t-red'>Eating is</span></h1>
            <h1 className='text-7xl t-2'><span className='t-red'>an</span> <span className='t-orange'>Important </span>Part</h1>
            <h1 className='text-7xl t-2'>of Lifestyle </h1>
        </div>
        <div>
            <img src={dishImg} alt="" className='w-[70%] aspect-square'/>
        </div>
    </div>
  )
}

export default HomeHeader