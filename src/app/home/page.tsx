import React from 'react'
import Hero from '@/sections/hero'
import Nav from '@/components/layout/nav'

function Home() {
    return (
        <div className="cont">
            <Nav />
            <div className='-mt-24'>
                <Hero />
            </div>

        </div>

    )
}

export default Home