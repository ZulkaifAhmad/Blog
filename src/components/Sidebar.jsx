import React from 'react'
import "../App.css"
import { assets } from '../assets/assets'
import { userContext } from "../Context.jsx"

function Sidebar() {
  const {state , setState} = userContext();

  return (
    <>
        <aside className={`bg-amber-300 w-17 flex flex-col justify-between items-center h-screen ${state ? "open" : "notOpen" }`}>
            <img src={assets.menu_icon} alt={assets.menu_icon} 
                className='h-5 w-5 mt-3'
                onClick={()=> setState(prev => !prev)}
            />
        </aside>
    </>
  )
}

export default Sidebar