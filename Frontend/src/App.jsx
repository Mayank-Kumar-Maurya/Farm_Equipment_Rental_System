import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ChatBot from "./Components/Pages/ChatBot";
import { Outlet } from "react-router-dom";
import FlashMessage from "./Components/Pages/FlashMessage";

function App() {
  return (
    <>
      <FlashMessage/>
      <Navbar />
      <Outlet />
      <Footer />
      <ChatBot />
    </>
  );
}

export default App;
