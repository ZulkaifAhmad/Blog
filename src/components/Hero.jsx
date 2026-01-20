import React from 'react'
import "../App.css"
import {userContext} from "../Context.jsx"

function Hero() {
    let {setState , state} = userContext();
  return (
    <div className={`hero h-screen ${state ? "open" : "notOpen" } mt-10`}>
        Hero
    </div>
  )
}

export default Hero

// w-325