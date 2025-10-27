import React from 'react'

import HomeHeader from './HomeHeader'
import Navbar from "../../components/Navbar";
import HomeCategories from './HomeCategories'

function Home() {
    return (
        <div className='main-page'>
            <Navbar/>
            <HomeHeader />
            <HomeCategories/>
        </div>
    )
}

export default Home