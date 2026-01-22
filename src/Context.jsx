import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const userContext = () => {
  return useContext(UserContext);
};

function Context({ children }) {
  const [state, setState] = useState(false);
  const [showRecentChats, setShowRecentChats] = useState({state : false, id: null});
  const [recentChats, setRecentChats] = useState(() => {
    const saved = localStorage.getItem("gemini_recent_chats");
    return saved ? JSON.parse(saved) : [];
  });

  // 2. Save to LocalStorage whenever recentChats is updated
  useEffect(() => {
    localStorage.setItem("gemini_recent_chats", JSON.stringify(recentChats));
  }, [recentChats]);

  return (
    <UserContext.Provider
      value={{ 
        state, 
        setState, 
        recentChats, 
        setRecentChats ,
        showRecentChats, 
        setShowRecentChats
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default Context;