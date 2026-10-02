import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ServerContext from "../../Context/ServerContext.js";

const clr = {
  primary: "#4a7c59",
  dark: "#2d5a3d",
  light: "#f0f5f1",
  border: "#c8ddd0",
  text: "#2d3a30",
  muted: "#7a9485",
};

const s = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #e8f0ea 0%, #f5f9f6 60%, #ddeee3 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 16px",
  },

  card: {
    background: "#fff",
    borderRadius: "20px",
    boxShadow: "0 8px 40px rgba(74,124,89,0.13)",
    overflow: "hidden",
  },

  topBar: {
    background: `linear-gradient(135deg, ${clr.dark} 0%, ${clr.primary} 100%)`,
    padding: "24px 20px 18px",
    textAlign: "center",
  },

  logo: {
    color: "#fff",
    fontSize: "1.5rem",
    fontWeight: 800,
    letterSpacing: "2px",
    marginBottom: "4px",
  },

  logoSub: {
    color: "rgba(255,255,255,0.7)",
    fontSize: "0.8rem",
    letterSpacing: "1px",
  },

  tabs: {
    display: "flex",
    borderBottom: `2px solid ${clr.border}`,
    background: clr.light,
  },

  tab: (active) => ({
    flex: 1,
    padding: "13px",
    border: "none",
    background: active ? "#fff" : "transparent",
    color: active ? clr.primary : clr.muted,
    fontWeight: active ? 700 : 500,
    fontSize: "0.95rem",
    cursor: "pointer",
    borderBottom: active
      ? `2px solid ${clr.primary}`
      : "2px solid transparent",
    marginBottom: "-2px",
    transition: "all 0.2s",
    fontFamily: "cursive",
  }),

  body: {
    padding: "24px 20px 28px",
  },

  label: {
    display: "block",
    fontSize: "0.82rem",
    fontWeight: 600,
    color: clr.text,
    marginBottom: "6px",
    letterSpacing: "0.5px",
  },

  input: {
    width: "100%",
    padding: "10px 14px",
    border: `1.5px solid ${clr.border}`,
    borderRadius: "10px",
    fontSize: "0.92rem",
    outline: "none",
    color: clr.text,
    background: clr.light,
    boxSizing: "border-box",
    transition: "border 0.2s",
    fontFamily: "cursive",
  },

  group: {
    marginBottom: "18px",
  },

  submitBtn: {
    width: "100%",
    padding: "12px",
    background: `linear-gradient(135deg, ${clr.dark} 0%, ${clr.primary} 100%)`,
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: 700,
    cursor: "pointer",
    letterSpacing: "1px",
    marginTop: "6px",
    transition: "opacity 0.2s",
    fontFamily: "cursive",
  },

  divider: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "20px 0",
    color: clr.muted,
    fontSize: "0.8rem",
  },

  dividerLine: {
    flex: 1,
    height: "1px",
    background: clr.border,
  },

  googleBtn: {
    width: "100%",
    padding: "10px",
    background: "#fff",
    color: clr.text,
    border: `1.5px solid ${clr.border}`,
    borderRadius: "10px",
    fontSize: "0.92rem",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontFamily: "cursive",
  },

  switchText: {
    textAlign: "center",
    fontSize: "0.85rem",
    color: clr.muted,
    marginTop: "20px",
  },

  switchLink: {
    color: clr.primary,
    fontWeight: 700,
    cursor: "pointer",
    textDecoration: "underline",
  },
};

function LoginForm({ onSwitch }) {
  const { login, loading } = useContext(ServerContext);

  const [focused, setFocused] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(formData);

    if (result?.success) {
      alert("Login successfully");
      navigate("/");
    } else {
      alert(result?.message || "Email or password incorrect");
    }
  };

  return (
    <form style={s.body} onSubmit={handleSubmit}>
      {/* Email */}
      <div style={s.group}>
        <label style={s.label}>Email</label>

        <input
          style={{
            ...s.input,
            border: `1.5px solid ${
              focused === "email" ? clr.primary : clr.border
            }`,
          }}
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => setFocused("email")}
          onBlur={() => setFocused(null)}
          required
        />
      </div>

      {/* Password */}
      <div style={s.group}>
        <label style={s.label}>Password</label>

        <input
          style={{
            ...s.input,
            border: `1.5px solid ${
              focused === "password" ? clr.primary : clr.border
            }`,
          }}
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          onFocus={() => setFocused("password")}
          onBlur={() => setFocused(null)}
          required
        />
      </div>

      {/* Login Button */}
      <button type="submit" style={s.submitBtn} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* Register */}
      <p style={s.switchText}>
        Don't have an account?{" "}
        <span style={s.switchLink} onClick={onSwitch}>
          Register here
        </span>
      </p>
    </form>
  );
}

function RegisterForm({ onSwitch }) {
  const { register, loading } = useContext(ServerContext);

  const [focused, setFocused] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    phone_no: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (
      formData.password.length < 8 ||
      formData.password.length > 16
    ) {
      alert("Password must be between 8 and 16 characters");
      return;
    }

    const registerData = {
      username: formData.username,
      name: formData.name,
      email: formData.email,
      phone_no: Number(formData.phone_no),
      password: formData.password,
    };

    const result = await register(registerData);

    if (result?.success) {
      alert("Account created successfully");

      // Redirect to Login after successful registration
      navigate("/login");
    } else {
      alert(result?.message || "Registration failed");
    }
  };

  const inp = (key) => ({
    ...s.input,
    border: `1.5px solid ${
      focused === key ? clr.primary : clr.border
    }`,
  });

  return (
    <form style={s.body} onSubmit={handleSubmit}>
      {/* Username */}
      <div style={s.group}>
        <label style={s.label}>Username</label>

        <input
          style={inp("username")}
          type="text"
          name="username"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
          onFocus={() => setFocused("username")}
          onBlur={() => setFocused(null)}
          required
        />
      </div>

      {/* Name */}
      <div style={s.group}>
        <label style={s.label}>Full Name</label>

        <input
          style={inp("name")}
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          onFocus={() => setFocused("name")}
          onBlur={() => setFocused(null)}
          required
        />
      </div>

      {/* Email */}
      <div style={s.group}>
        <label style={s.label}>Email Address</label>

        <input
          style={inp("email")}
          type="email"
          name="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => setFocused("email")}
          onBlur={() => setFocused(null)}
          required
        />
      </div>

      {/* Phone */}
      <div style={s.group}>
        <label style={s.label}>Phone Number</label>

        <input
          style={inp("phone_no")}
          type="tel"
          name="phone_no"
          placeholder="9876543210"
          value={formData.phone_no}
          onChange={handleChange}
          onFocus={() => setFocused("phone_no")}
          onBlur={() => setFocused(null)}
          required
        />
      </div>

      {/* Password */}
      <div style={s.group}>
        <label style={s.label}>Password</label>

        <input
          style={inp("password")}
          type="password"
          name="password"
          placeholder="8-16 characters"
          value={formData.password}
          onChange={handleChange}
          onFocus={() => setFocused("password")}
          onBlur={() => setFocused(null)}
          minLength={8}
          maxLength={16}
          required
        />
      </div>

      {/* Confirm Password */}
      <div style={s.group}>
        <label style={s.label}>Confirm Password</label>

        <input
          style={inp("confirmPassword")}
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          onFocus={() => setFocused("confirmPassword")}
          onBlur={() => setFocused(null)}
          minLength={8}
          maxLength={16}
          required
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        style={s.submitBtn}
        disabled={loading}
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      {/* Login */}
      <p style={s.switchText}>
        Already have an account?{" "}
        <span style={s.switchLink} onClick={onSwitch}>
          Login here
        </span>
      </p>
    </form>
  );
}

function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [tab, setTab] = useState(
    location.pathname.toLowerCase() === "/register"
      ? "register"
      : "login"
  );

  // Update the form whenever the URL changes
  useEffect(() => {
    setTab(
      location.pathname.toLowerCase() === "/register"
        ? "register"
        : "login"
    );
  }, [location.pathname]);

  const handleTabChange = (selectedTab) => {
    setTab(selectedTab);

    navigate(selectedTab === "register" ? "/register" : "/login");
  };

  return (
    <div style={s.page}>
      <style>{`
        .auth-card {
          width: 100%;
          max-width: 440px;
        }

        @media (max-width: 480px) {
          .auth-card {
            border-radius: 14px;
          }
        }
      `}</style>

      <div style={s.card} className="auth-card">
        {/* Top Bar */}
        <div style={s.topBar}>
          <div style={s.logo}>🌾 FERS</div>

          <div style={s.logoSub}>
            FARM EQUIPMENT RENTAL SYSTEM
          </div>
        </div>

        {/* Tabs */}
        <div style={s.tabs}>
          <button
            type="button"
            style={s.tab(tab === "login")}
            onClick={() => handleTabChange("login")}
          >
            Login
          </button>

          <button
            type="button"
            style={s.tab(tab === "register")}
            onClick={() => handleTabChange("register")}
          >
            Register
          </button>
        </div>

        {/* Form */}
        {tab === "login" ? (
          <LoginForm
            onSwitch={() => handleTabChange("register")}
          />
        ) : (
          <RegisterForm
            onSwitch={() => handleTabChange("login")}
          />
        )}
      </div>
    </div>
  );
}

export default AuthPage;