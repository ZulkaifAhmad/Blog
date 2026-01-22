import React from "react";
import "../App.css";
import { assets } from "../assets/assets";
import { userContext } from "../Context.jsx";

function Sidebar() {
  // Pull recentChats from context to display them
  const { state, setState, recentChats, showRecentChats, setShowRecentChats } =
    userContext();

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
          <p id="headOfChats">Recent</p>
          <div id="history">
            {/* Map through the chats stored in LocalStorage/State */}
            {recentChats.map((chat) => (
              <div
                key={chat.id}
                className="chat-item flex items-center gap-2 cursor-pointer"
              >
                <p 
                className="truncate w-full p-[0.5vw]"
                onClick={()=> setShowRecentChats({state: true, id: chat.id})}
                >{chat.title}...</p>
              </div>
            ))}

            {/* If no chats exist yet */}
            {recentChats.length === 0 && (
              <p className="text-xs opacity-50 p-2">No recent chats</p>
            )}
          </div>
        </div>

        <div
          title="Setting and help"
          className={`setting ${state ? "open" : "notOpen"}`}
        >
          <img src={assets.setting_icon} alt="setting icon" title="Setting" />
          <p>Setting and help</p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
