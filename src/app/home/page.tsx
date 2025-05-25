import React from 'react'
import Hero from '@/sections/hero'
import MiniCarousel from '@/sections/mini-carousel'  

function Home() {
  return (
    <div className="cont">
        <div className='-mt-24'>
            <Hero />
        </div>
        <MiniCarousel />
    </div>
    
  )
}

export default Home