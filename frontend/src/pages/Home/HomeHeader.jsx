import React from 'react'
import dishImg from "../../images/dish1.png"

function HomeHeader() {
  return (
    <div className='home-header  mt-8'>
      <div className='flex items-center justify-center'>
        <div className="slogan w-full">
          <h1 className='text-8xl text-nowrap t-2 w-fit'>Healthy <span className='t-red'>Eating is</span></h1>
          <h1 className='text-8xl text-nowrap t-2 w-fit'><span className='t-red'>an</span> <span className='t-orange'>Important </span>Part</h1>
          <h1 className='text-8xl text-nowrap t-2 w-fit'>of Lifestyle </h1>
          <h3 className='t-2 t-gray text-2xl my-8'>We prepare delicious food for <br /> you we are always</h3>
          <button className='bg-red rounded-full text-white px-4 py-2 '>Explore Now</button>
        </div>
        <div className='w-[40%] h-fit scale-150'>
          <img src={dishImg} alt="" className='w-full aspect-square' />
        </div>
      </div>
    </div>
  )
}

export default HomeHeader