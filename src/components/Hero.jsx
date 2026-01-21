import React from 'react'
import "../App.css"
import {userContext} from "../Context.jsx"
import {assets} from "../assets/assets.js"

function Hero() {
    let {setState , state} = userContext();
  return (
    <div className={`hero h-screen ${state ? "open" : "notOpen" } mt-10`}>


        <div className="HeroRapper">

          <div className="HeroText">
            <span>
            <img src={assets.gemini_icon} alt="Gemini icon" title='Gemini icon' />
            <p>Hi Zulkaif</p>
            </span>
            <h1>Where should we start ? </h1>
          </div>

          <div className="inputFeild">
            <div className="input">
              <textarea name="textarea" id="textarea" placeholder='Ask Gemini 3'></textarea>
              <img id='upload' src={assets.gallery_icon} alt="img upload icon" />
              <img id='send' src={assets.send_icon} alt="send icon" />
            </div>
          </div>

          <div className="suggestions">
            <div className="suggest">
              Create image
            </div>
            <div className="suggest">
              Create a Video
            </div>
            <div className="suggest">
              Write anything
            </div>
            <div className="suggest">
              Help me Learn
            </div>
            <div className="suggest">
              Boost my day
            </div>
          </div>

        </div>


    </div>
  )
}

export default Hero

// w-325