import React, { useState, useEffect } from "react";
import ServerContext from "./ServerContext.js";
import axios from "axios";

export default function ServerProvider({ children }) {
  // Get saved user when application starts

  // let server = axios.create({
  //   baseURL: "http://localhost:8080",
  //   withCredentials: true,
  // });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Get saved token when application starts
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const [loading, setLoading] = useState(false);

  // =========================
  // LOGIN
  // =========================
  const login = async (loginData) => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8080/auth/login",
        loginData,
      );

      const data = response.data;

      console.log("Login response:", data);

      // Save user and token in state
      setUser(data.user);
      setToken(data.token);

      // Save user and token in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error("Login error:", error);

      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // REGISTER
  // =========================
  const register = async (registerData) => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8080/auth/register",
        registerData,
      );

      console.log("Register response:", response.data);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Registration error:", error);

      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Automatically log out when JWT expires
  useEffect(() => {
    if (!token) return;

    let timeoutId;

    const checkTokenExpiry = () => {
      try {
        const payload = JSON.parse(
          atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")),
        );

        if (!payload.exp) {
          // A JWT without an expiration claim cannot be timed here.
          return;
        }

        const remainingTime = payload.exp * 1000 - Date.now();

        if (remainingTime <= 0) {
          setUser(null);
          setToken(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          return;
        }

        // Browser timeout limit is approximately 24.8 days.
        timeoutId = setTimeout(
          checkTokenExpiry,
          Math.min(remainingTime, 2147483647),
        );
      } catch (error) {
        // Invalid token: clear the local session.
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    };

    checkTokenExpiry();

    return () => clearTimeout(timeoutId);
  }, [token]);


  // ChatBot
  let chatBot = async(msg)=>
  {
    try {
      const response = await axios.post(
        "http://localhost:8080/aibot/",
        {message: msg},
      );
  
      console.log("ai res: ", response);
      return response.data.reply;
    } catch (error) {
      console.log("error at ai", error);
      return ""
    }
  }

  return (
    <ServerContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        loading,
        login,
        register,
        logout,
        chatBot,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
}
