import React from 'react'

// import NewHomeHeader from './NewHomeHeader'
import HomeHeader from './HomeHeader'
import Navbar from "../../components/Navbar";
import HomeCategories from './HomeCategories'
import ChoseDiet from './ChoseDiet';
// import CarouselSize from './CarouselSize';
// import { CarouselSize } from './CarouselSize';

function Home() {
    return (
        <div className='flex flex-col justify-center items-center'>
            {/* <NewHomeHeader/> */}
            {/* <Navbar/> */}
            <HomeHeader />
            <HomeCategories/>
            {/* <ChoseDiet/> */}
            {/* <CarouselSize/> */}
        </div>
    )
}

export default Home