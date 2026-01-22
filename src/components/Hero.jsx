import { useState, useRef, useEffect } from "react";
import "../App.css";
import { userContext } from "../Context.jsx";
import { assets } from "../assets/assets.js";
import { GoogleGenAI } from "@google/genai";

function Hero() {
  let { setState, state, showRecentChats } = userContext();
  let ref = useRef(null);
  const [input, setInput] = useState("");
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  // 1. Core states for the current conversation
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  // 2. Load all chats from localStorage on startup
  const [recentChats, setRecentChats] = useState(() => {
    const saved = localStorage.getItem("gemini_recent_chats");
    return saved ? JSON.parse(saved) : [];
  });

  // 3. Identify the Active Chat based on Context
  const activeChat = recentChats.find((chat) => chat.id === showRecentChats.id);

  // 4. NEW: Sync Active Chat to chatHistory
  // This ensures that when you click a chat, it loads into the main view
  useEffect(() => {
    if (activeChat) {
      // If we have an active chat, load its messages into the UI state
      setChatHistory(activeChat.messages);
      setCurrentChatId(activeChat.id);
      setAlert(true); // Hide the "Hello" text, show the chat
    } else {
      // If no active chat (New Chat), reset the UI
      setChatHistory([]);
      setCurrentChatId(null);
      setAlert(false); // Show the "Hello" text
    }
  }, [showRecentChats, recentChats]); 

  // 5. Automatically save to localStorage whenever recentChats changes
  useEffect(() => {
    localStorage.setItem("gemini_recent_chats", JSON.stringify(recentChats));
  }, [recentChats]);

  async function handleSubmit() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      // ... (Error handling logic same as before)
      return;
    }

    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");
    setLoading(true);
    setAlert(true);

    // Update the UI immediately
    const newHistory = [...chatHistory, { role: "user", text: userMessage }];
    setChatHistory(newHistory);

    try {
      const ai = new GoogleGenAI({ apiKey: apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash", // Updated to 2.0-flash or 1.5-flash
        contents: [{ role: "user", parts: [{ text: userMessage }] }],
      });

      // Handle response text extraction
      let responseText = "";
      if (typeof response.text === "function") {
        responseText = response.text();
      } else if (response.candidates?.[0]?.content?.parts?.[0]?.text) {
        responseText = response.candidates[0].content.parts[0].text;
      } else {
        responseText = "No response content received.";
      }

      const finalHistory = [
        ...newHistory,
        { role: "model", text: responseText },
      ];
      setChatHistory(finalHistory);

      // Save to recentChats
      setRecentChats((prev) => {
        const isExisting = prev.find((c) => c.id === currentChatId);
        if (isExisting) {
          return prev.map((c) =>
            c.id === currentChatId ? { ...c, messages: finalHistory } : c
          );
        } else {
          const newId = Date.now();
          setCurrentChatId(newId);
          return [
            {
              id: newId,
              title: userMessage.slice(0, 30),
              messages: finalHistory,
            },
            ...prev,
          ];
        }
      });
    } catch (error) {
      console.error("Gemini Error:", error);
      setChatHistory((prev) => [
        ...prev,
        { role: "model", text: "Error: " + error.message },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // NOTE: You can remove the 'loadChat' function now because the 
  // useEffect (Step 4) handles loading automatically based on showRecentChats.

  return (
    <div className={`hero h-screen ${state ? "open" : "notOpen"} mt-10`}>
      <div className={`HeroRapper ${alert ? "hide" : "dontHide"}`}>
        {!alert && (
          <div className="HeroText">
            <span>
              <img src={assets.gemini_icon} alt="Gemini icon" />
              <p>Hi Zulkaif</p>
            </span>
            <h1>Where should we start?</h1>
          </div>
        )}

        {/* The mapping logic remains simple because chatHistory is always correct now */}
        {alert && (
          <div className="chat-display hide-scrollbar">
            {chatHistory.map((chat, index) => (
              <div
                id="display"
                key={index}
                style={{
                  alignSelf: chat.role === "user" ? "flex-end" : "flex-start",
                  backgroundColor: chat.role === "user" ? "#4b90ff" : "#333",
                }}
              >
                <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{chat.text}</p>
              </div>
            ))}
            {loading && <p id="thinking">Gemini is thinking...</p>}
          </div>
        )}

        <div className="inputFeild">
          <div className="input">
            <textarea
              value={input}
              ref={ref}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Gemini"
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && handleSubmit()
              }
            ></textarea>
            <img id="upload" src={assets.gallery_icon} alt="img upload icon" />
            <img
              id="send"
              src={assets.send_icon}
              onClick={handleSubmit}
              style={{
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.5 : 1,
              }}
            />
          </div>
        </div>

        {!alert && (
          <div className="suggestions">
            {[
              "Create image",
              "Create a Video",
              "Write anything",
              "Help me Learn",
              "Boost my day",
            ].map((text) => (
              <p key={text} className="suggest">
                {text}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Hero;