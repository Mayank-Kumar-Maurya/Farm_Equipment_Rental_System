import React, { useState } from "react";
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
      }}
    >
      {children}
    </ServerContext.Provider>
  );
}
