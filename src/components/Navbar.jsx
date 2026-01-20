import React from 'react'
import "./../App.css"
import { userContext } from '../Context.jsx'

function Navbar() {
  let {state , setState} = userContext();

  return (
    <>
        <nav className={`bg-blue-500 ${state ? "open" : "notOpen" }  h-17 flex justify-between items-center pl-4 fixed`}>
            <p>hello</p>
            <p>how</p>
        </nav>
    </>
  )
}

export default Navbar