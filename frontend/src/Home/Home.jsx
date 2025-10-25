import React from 'react'

import HomeHeader from './HomeHeader'
import Categories from './Categories'
import Navbar from '../components/Navbar'

function Home() {
    return (
        <div className='main-page'>
            <Navbar/>
            <HomeHeader />
            <Categories />
        </div>
    )
}

export default Home