import React from 'react'

import HomeHeader from './HomeHeader'
import Navbar from "../../components/Navbar";
import HomeCategories from './HomeCategories'
import ChoseDiet from './ChoseDiet';
import CarouselSize from './CarouselSize';
// import { CarouselSize } from './CarouselSize';

function Home() {
    return (
        <div className='main-page'>
            {/* <Navbar/> */}
            <HomeHeader />
            <HomeCategories/>
            <ChoseDiet/>
            <CarouselSize/>
        </div>
    )
}

export default Home