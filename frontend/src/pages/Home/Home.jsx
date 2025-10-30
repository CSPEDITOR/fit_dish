import React from 'react'

import HomeHeader from './HomeHeader'
import Navbar from "../../components/Navbar";
import HomeCategories from './HomeCategories'
import ChoseDiet from './ChoseDiet';

function Home() {
    return (
        <div className='main-page'>
            {/* <Navbar/> */}
            <HomeHeader />
            <HomeCategories/>
            <ChoseDiet/>
        </div>
    )
}

export default Home