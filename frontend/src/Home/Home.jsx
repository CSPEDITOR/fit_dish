import React from 'react'
import Navbar from './Navbar'
import HomeHeader from './HomeHeader'
import Categories from './Categories'

function Home() {
    return (
        <div className='main-page'>
            <Navbar />
            <HomeHeader />
            <Categories />
        </div>
    )
}

export default Home