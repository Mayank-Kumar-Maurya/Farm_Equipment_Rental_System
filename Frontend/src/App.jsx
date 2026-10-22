import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ChatBot from "./Components/Pages/ChatBot";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import FlashMessage from "./Components/Pages/FlashMessage";

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const sectionId = location.hash.substring(1);

      const timer = setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);

      return () => clearTimeout(timer);
    }

    // Scroll to top when navigating to another page
    if (!location.hash) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [location.pathname, location.hash]);

  return (
    <>
       <FlashMessage />
       <Navbar />
       <Outlet />
       <Footer />
       <ChatBot />
  
    </>
  );
}

export default App;