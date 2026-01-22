import { useState } from "react";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY
});

function useGemini() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function generateText(prompt) {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });

      setResponse(result.response.text());
    } catch (err) {
      setError("Failed to generate response");
    } finally {
      setLoading(false);
    }
  }

  return { generateText, response, loading, error };
}

export default useGemini;
