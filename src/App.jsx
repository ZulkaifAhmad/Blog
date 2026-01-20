import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

function App() {
  return (
    <>
      <div className="flex box-border">
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
