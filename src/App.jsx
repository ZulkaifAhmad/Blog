import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

function App() {
  return (
    <>
      <div className="parent box-border flex bg-amber-300 overflow-hidden">
      <Sidebar />
      <div>
        <Navbar />
        <Hero />
      </div>
      </div>

    </>
  );
}

export default App;
