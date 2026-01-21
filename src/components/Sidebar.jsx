import React from "react";
import "../App.css";
import { assets } from "../assets/assets";
import { userContext } from "../Context.jsx";

function Sidebar() {
  const { state, setState } = userContext();

  return (
    <>
      <aside
        className={` w-17 h-screen transition-all duration-300 ${state ? "open" : "notOpen"}`}
      >
        <img
          src={assets.menu_icon}
          alt={assets.menu_icon}
          className="img h-5 w-5"
          title="menu"
          onClick={() => setState((prev) => !prev)}
        />

        <div className={`newChate ${state ? "open" : "notopen"}`}>
          <div title="New chat">
            <img
              src={assets.message_icon}
              alt={assets.message_icon}
              className={`h-6 w-6 message `}
              title="New chat"
            />
            <p className="newchate">New Chat</p>
          </div>
        </div>

        <div className={`chats ${state ? "open" : "notopen"}`}>
          <p id="headOfChats">Chats</p>
          <div id="history">
            <p className="truncate w-full p-[0.5vw]">
              Sementic tag for sidebar my name and there is
            </p>
            <p className="truncate w-full p-[0.5vw]">
              Sementic tag for sidebar my name and there is
            </p>
            
          </div>
        </div>

        <div title="Setting and help" className={`setting ${state ? "open" : "notOpen"}`}>
            <img src={assets.setting_icon} alt="setting icon" title="Setting" />
            <p>Setting and help</p>
        </div>

      </aside>
    </>
  );
}

export default Sidebar;
