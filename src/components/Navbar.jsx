import React from 'react'
import "./../App.css"
import { userContext } from '../Context.jsx'
import {assets} from "../assets/assets.js"

function Navbar() {

  let {state , setState} = userContext();

  return (
    <>
        <nav className={`bg-blue-500 transition-all duration-300 ${state ? "open" : "notOpen" }  h-17 flex justify-between items-center pl-4 fixed`}>
            <h3 className='text-xl text-gray-700 font-semibold'>Gemini</h3>
            <div className="profile overflow-hidden h-10 w-10  rounded-full">
                <img className='object-cover cursor-pointer h-full w-full' src={assets.user_icon} alt={assets.user_icon} title='Profile Avtar' />
            </div>
        </nav>
    </>
  )
}

export default Navbar