import { useState , useRef } from "react";
import "../App.css";
import { userContext } from "../Context.jsx";
import { assets } from "../assets/assets.js";
import { GoogleGenAI } from "@google/genai"; // New SDK

function Hero() {
  let { setState, state } = userContext();
  let ref = useRef(null);
  const [input, setInput] = useState("");
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  async function handleSubmit() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      console.error("API Key is missing from .env file");
      return;
    }

    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");
    input.trim();
    setLoading(true);
    setAlert(true); 

    setChatHistory((prev) => [...prev, { role: "user", text: userMessage }]);

    try {
      const ai = new GoogleGenAI({ apiKey: apiKey });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userMessage,
      });

      const responseText = response.text;

      setChatHistory((prev) => [...prev, { role: "model", text: responseText }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setChatHistory((prev) => [
        ...prev, 
        { role: "model", text: "Error: " + error.message }
      ]);
    } finally {
      setLoading(false);
    }
  }

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
        {alert && (
          <div className="chat-display hide-scrollbar">
            {chatHistory.map((chat, index) => (
              <div id="display" key={index} style={{
                alignSelf: chat.role === "user" ? "flex-end" : "flex-start",
                backgroundColor: chat.role === "user" ? "#4b90ff" : "#333",
              }}>
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
              placeholder="Ask Gemini 3"
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSubmit()}
            ></textarea>
            <img id="upload" src={assets.gallery_icon} alt="img upload icon" />
            <img 
              id="send" 
              src={assets.send_icon} 
              onClick={handleSubmit}
              style={{ 
                cursor: loading ? "not-allowed" : "pointer", 
                opacity: loading ? 0.5 : 1 
              }}
            />
          </div>
        </div>

        {!alert && (
          <div className="suggestions">
            <p className="suggest">Create image</p>
            <p className="suggest">Create a Video</p>
            <p className="suggest">Write anything</p>
            <p className="suggest">Help me Learn</p>
            <p className="suggest">Boost my day</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hero;