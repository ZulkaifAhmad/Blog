# Gemini AI Clone

![Gemini Clone Banner](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

A fully functional frontend clone of Google's Gemini AI interface. This project replicates the core UI/UX of Gemini, integrating real-time API responses, sidebar navigation, and local storage for chat history persistence. Built with **React** and **Context API** for efficient state management.

## 🚀 Features

- **Real-time AI Chat**: Sends user prompts to the Gemini API and displays formatted responses (supporting HTML content).
- **Chat History Management**:
  - Saves recent chats to `LocalStorage` automatically.
  - Sidebar navigation to revisit previous conversations.
  - "New Chat" functionality to reset the context.
- **Dynamic Context API**: Centralized state management for chat data, sidebar toggling, and loading states.
- **Responsive Sidebar**: Collapsible sidebar with smooth transitions (`transition-all duration-300`).
- **Loading Animations**: Visual feedback/loaders while fetching data from the API.
- **Optimized UI**: Clean CSS styling matching the original Gemini aesthetic, including user/bot icons and input areas.

## 🛠️ Tech Stack

- **Frontend Framework**: React.js (Vite)
- **State Management**: React Context API (`UserContext`)
- **Styling**: Pure CSS / App.css (Custom Flexbox/Grid layouts)
- **Data Persistence**: Browser LocalStorage
- **Icons**: Custom asset integration

## 📂 Project Structure

```bash
src/
├── assets/          # Images and icons (menu_icon, user_icon, gemini_icon, etc.)
├── context/
│   └── Context.jsx  # Main state logic (API calls, save history, loading states)
├── components/
│   ├── Sidebar.jsx  # History navigation & settings
│   └── Main.jsx     # Chat interface & Hero section
├── App.jsx          # Root component
└── main.jsx         # Entry point
```

