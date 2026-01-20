import React from 'react'
import "../App.css"
import { assets } from '../assets/assets'
import { userContext } from "../Context.jsx"

function Sidebar() {
  const {state , setState} = userContext();

  return (
    <>
        <aside className={` w-17 h-screen transition-all duration-300 ${state ? "open" : "notOpen" }`}>
            <img src={assets.menu_icon} alt={assets.menu_icon} 
                className='img h-5 w-5'
                title="menu"
                onClick={()=> setState(prev => !prev)}
            />


            <div className={`newChate ${state ? "open" : "notopen" }`}>
            <img src={assets.message_icon} alt={assets.message_icon} 
                className={`h-6 w-6 message `}
                title="chate"
            />
            <p>New Chate</p>
            </div>
            <div className={`chats ${state ? "open" : "notopen" }`}>
            <p>Chats</p>

            </div>
        </aside>
    </>
  )
}

export default Sidebar
