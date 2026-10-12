import React, { useEffect, useState } from "react";

export const showFlashMessage = (type, message) => {
  sessionStorage.setItem("flashMessage", JSON.stringify({ type, message }));

  window.dispatchEvent(new Event("flash-message"));
};

const FlashMessage = () => {
  const [flash, setFlash] = useState(null);

  useEffect(() => {
    const loadFlash = () => {
      const storedMessage = sessionStorage.getItem("flashMessage");

      if (storedMessage) {
        setFlash(JSON.parse(storedMessage));
        sessionStorage.removeItem("flashMessage");
      }
    };

    loadFlash();

    window.addEventListener("flash-message", loadFlash);

    return () => {
      window.removeEventListener("flash-message", loadFlash);
    };
  }, []);

  useEffect(() => {
    if (!flash) return;

    const timer = setTimeout(() => {
      setFlash(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [flash]);

  if (!flash) return null;

  const isSuccess = flash.type === "success";

  return (
    <div
      role="status"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
        padding: "14px 20px",
        borderRadius: "10px",
        background: isSuccess ? "#d1e7dd" : "#f8d7da",
        color: isSuccess ? "#0f5132" : "#842029",
        border: `1px solid ${isSuccess ? "#badbcc" : "#f5c2c7"}`,
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <strong>{isSuccess ? "✓" : "✕"}</strong>
      <span>{flash.message}</span>

      <button
        type="button"
        onClick={() => setFlash(null)}
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontSize: "18px",
          marginLeft: "8px",
        }}
        aria-label="Close message"
      >
        ×
      </button>
    </div>
  );
};

export default FlashMessage;