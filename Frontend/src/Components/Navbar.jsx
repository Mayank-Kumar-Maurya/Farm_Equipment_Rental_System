import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import ServerContext from "../Context/ServerContext.js";

const API_URL = "http://localhost:8080";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Equipment", href: "/#equipment" },
  { label: "Add Equipments", href: "/addEquipments" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const styles = {
  nav: {
    background:
      "linear-gradient(135deg, #1b5e20 0%, #2e7d32 60%, #43a047 100%)",
    boxShadow: "0 3px 12px rgba(0,0,0,0.25)",
    padding: "0 clamp(12px, 3vw, 35px)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    width: "100%",
  },

  navContainer: {
    minHeight: "68px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
    flexWrap: "wrap",
  },

  brand: {
    color: "#fff",
    fontWeight: 800,
    fontSize: "clamp(1.15rem, 2vw, 1.5rem)",
    letterSpacing: "2px",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    whiteSpace: "nowrap",
  },

  brandBadge: {
    background: "#fff",
    color: "#2e7d32",
    borderRadius: "6px",
    padding: "2px 7px",
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "1px",
  },

  link: {
    color: "rgba(255,255,255,0.9)",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "0.93rem",
    padding: "9px 12px",
    borderRadius: "7px",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
    display: "block",
  },

  searchInput: {
    border: "none",
    borderRadius: "20px 0 0 20px",
    padding: "9px 14px",
    fontSize: "0.88rem",
    outline: "none",
    width: "clamp(120px, 15vw, 210px)",
    minWidth: 0,
  },

  searchBtn: {
    background: "#fff",
    color: "#2e7d32",
    border: "none",
    borderRadius: "0 20px 20px 0",
    padding: "9px 14px",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "0.88rem",
  },

  loginBtn: {
    background: "transparent",
    color: "#fff",
    border: "1.5px solid rgba(255,255,255,0.7)",
    borderRadius: "20px",
    padding: "7px 17px",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "0.88rem",
  },

  registerBtn: {
    background: "#fff",
    color: "#2e7d32",
    border: "none",
    borderRadius: "20px",
    padding: "7px 17px",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "0.88rem",
  },

  profileIcon: {
    width: "42px",
    height: "42px",
    minWidth: "42px",
    borderRadius: "50%",
    backgroundColor: "#512DA8",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "25px",
    fontWeight: 400,
    fontFamily: "Arial, sans-serif",
    border: "none",
    cursor: "pointer",
  },

  profileDropdown: {
    position: "absolute",
    top: "55px",
    right: 0,
    width: "min(290px, calc(100vw - 30px))",
    background: "#fff",
    color: "#333",
    borderRadius: "12px",
    padding: "18px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
    zIndex: 1100,
  },
};

function Navbar() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState("");

  const [searchText, setSearchText] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const navigate = useNavigate();
  const profileRef = useRef(null);

  const { user, token, logout } = useContext(ServerContext);

  // Search equipment
  const handleSearch = async (e) => {
    e.preventDefault();

    const search = searchText.trim();

    if (!search) {
      alert("Please enter equipment name, brand or category.");
      return;
    }

    try {
      setSearchLoading(true);

      await axios.get(`${API_URL}/search`, {
        params: { search },
      });

      setSearchText("");
      setMenuOpen(false);
      setProfileOpen(false);

      navigate(`/search-results?search=${encodeURIComponent(search)}`);
    } catch (error) {
      console.error("Search error:", error);
      alert(
        error.response?.data?.msg || "Unable to search equipment."
      );
    } finally {
      setSearchLoading(false);
    }
  };

  // Profile initial
  const profileInitial = (
    profile?.name || user?.name || user?.username || "M"
  )
    .charAt(0)
    .toUpperCase();

  // Fetch profile
  const fetchProfile = async () => {
    if (!token) return;

    try {
      setProfileLoading(true);
      setProfileError("");

      const response = await axios.get(
        `${API_URL}/user/viewMyProfile`,
        {
          headers: { token },
        }
      );

      setProfile({
        name: response.data.name,
        username: response.data.username,
        email: response.data.email,
        phone_no: response.data.phone_no,
      });
    } catch (error) {
      console.error("Profile error:", error);

      setProfileError(
        error.response?.data?.msg ||
          "Unable to load profile details."
      );
    } finally {
      setProfileLoading(false);
    }
  };

  // Fetch profile after login
  useEffect(() => {
    if (user && token) {
      fetchProfile();
    } else {
      setProfile(null);
      setProfileOpen(false);
    }
  }, [user, token]);

  // Close mobile menu automatically when desktop width is reached
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
        setProfileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Also check initial screen width
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // Profile click
  const handleProfileClick = () => {
    const nextOpen = !profileOpen;

    setProfileOpen(nextOpen);

    if (nextOpen && !profile && !profileLoading) {
      fetchProfile();
    }
  };

  // Logout
  const handleLogout = () => {
    logout();
    setProfile(null);
    setProfileOpen(false);
    setMenuOpen(false);
    navigate("/");
  };

  // View profile
  const handleViewProfile = () => {
    setProfileOpen(false);
    setMenuOpen(false);
    navigate("/my-profile");
  };

  // My equipment
  const handleMyEquipment = () => {
    setProfileOpen(false);
    setMenuOpen(false);
    navigate("/my-equipment");
  };

  // Render profile details
  const renderProfileDetails = () => (
    <>
      <div className="text-center mb-3">
        <div
          style={{
            ...styles.profileIcon,
            width: "62px",
            height: "62px",
            minWidth: "62px",
            fontSize: "36px",
            margin: "0 auto 12px",
            cursor: "default",
          }}
        >
          {profileInitial}
        </div>

        <h6 className="fw-bold mb-1">
          {profile?.name || user?.name || "User"}
        </h6>

        <small className="text-muted">
          @{profile?.username || user?.username || ""}
        </small>
      </div>

      <hr />

      {profileLoading ? (
        <div className="text-center py-3">
          <div className="spinner-border spinner-border-sm text-success" />
          <p className="small text-muted mt-2 mb-0">
            Loading profile...
          </p>
        </div>
      ) : profileError ? (
        <div>
          <p className="text-danger small">{profileError}</p>

          <button
            className="btn btn-outline-success btn-sm w-100"
            onClick={fetchProfile}
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <div className="mb-3">
            <small className="text-muted d-block">Full Name</small>
            <span className="small fw-semibold">
              {profile?.name || "Not available"}
            </span>
          </div>

          <div className="mb-3">
            <small className="text-muted d-block">Username</small>
            <span className="small fw-semibold">
              {profile?.username || "Not available"}
            </span>
          </div>

          <div className="mb-3">
            <small className="text-muted d-block">Email Address</small>
            <span className="small fw-semibold text-break">
              {profile?.email || "Not available"}
            </span>
          </div>

          <div className="mb-3">
            <small className="text-muted d-block">Phone Number</small>
            <span className="small fw-semibold">
              {profile?.phone_no || "Not available"}
            </span>
          </div>
        </>
      )}

      <hr />

      <button
        className="btn btn-outline-primary w-100 mb-2"
        onClick={handleMyEquipment}
      >
        My Equipment
      </button>

      <button
        className="btn btn-success w-100 mb-2"
        onClick={handleViewProfile}
      >
        View Profile
      </button>

      <button
        className="btn btn-outline-danger w-100"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  );

  return (
    <nav style={styles.nav}>
      <div style={styles.navContainer}>

        {/* Brand */}
        <a href="/" style={styles.brand}>
          🌾 FERS
          <span style={styles.brandBadge}>RENTAL</span>
        </a>

        {/* Hamburger */}
        <button
          type="button"
          className={`navbar-toggler-custom ${
            menuOpen ? "menu-active" : ""
          }`}
          onClick={() => {
            setMenuOpen((prev) => !prev);
            setProfileOpen(false);
          }}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Desktop navigation */}
        <ul className="nav-links-custom">
          {navLinks.map((link, i) => (
            <li key={i}>
              <a
                href={link.href}
                style={
                  hoveredLink === i
                    ? {
                        ...styles.link,
                        background: "rgba(255,255,255,0.15)",
                        color: "#fff",
                      }
                    : styles.link
                }
                onMouseEnter={() => setHoveredLink(i)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="desktop-actions">

          <form onSubmit={handleSearch} className="navbar-search">
            <input
              style={styles.searchInput}
              type="search"
              placeholder="Search equipment..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <button
              type="submit"
              style={styles.searchBtn}
              disabled={searchLoading}
            >
              {searchLoading ? "..." : "🔍"}
            </button>
          </form>

          {!user ? (
            <div className="auth-buttons">
              <button
                style={styles.loginBtn}
                onClick={() => navigate("/login")}
              >
                Login
              </button>

              <button
                style={styles.registerBtn}
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </div>
          ) : (
            <div ref={profileRef} className="profile-container">
              <button
                type="button"
                style={styles.profileIcon}
                onClick={handleProfileClick}
                title="My Profile"
                aria-label="Open profile"
              >
                {profileInitial}
              </button>

              {profileOpen && (
                <div style={styles.profileDropdown}>
                  {renderProfileDetails()}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">

          {/* Mobile links */}
          <ul className="mobile-nav-links">
            {navLinks.map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile search */}
          <form onSubmit={handleSearch} className="mobile-search">
            <input
              type="search"
              placeholder="Search equipment..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <button type="submit" disabled={searchLoading}>
              {searchLoading ? "..." : "🔍"}
            </button>
          </form>

          {/* Mobile authentication */}
          {!user ? (
            <div className="mobile-auth">
              <button
                style={styles.loginBtn}
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/login");
                }}
              >
                Login
              </button>

              <button
                style={styles.registerBtn}
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/register");
                }}
              >
                Register
              </button>
            </div>
          ) : (
            <div className="mobile-profile">

              <button
                type="button"
                className="mobile-profile-toggle"
                onClick={() => {
                  const nextOpen = !profileOpen;
                  setProfileOpen(nextOpen);

                  if (nextOpen && !profile && !profileLoading) {
                    fetchProfile();
                  }
                }}
              >
                <span style={styles.profileIcon}>
                  {profileInitial}
                </span>

                <span className="fw-semibold">My Profile</span>

                <span className="ms-auto">
                  {profileOpen ? "▲" : "▼"}
                </span>
              </button>

              <div
                className={`mobile-profile-details ${
                  profileOpen ? "profile-visible" : ""
                }`}
              >
                {renderProfileDetails()}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Responsive CSS */}
      <style>{`
        * {
          box-sizing: border-box;
        }

        .nav-links-custom {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 3px;
          align-items: center;
        }

        .desktop-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: clamp(10px, 1.5vw, 22px);
        }

        .navbar-search {
          display: flex;
          align-items: center;
        }

        .auth-buttons {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .profile-container {
          position: relative;
        }

        .navbar-toggler-custom {
          display: none;
          background: transparent;
          border: none;
          padding: 8px;
          width: 42px;
          height: 42px;
          cursor: pointer;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
        }

        .navbar-toggler-custom span {
          display: block;
          width: 25px;
          height: 2.5px;
          border-radius: 5px;
          background: #fff;
          transition: transform 0.3s ease, opacity 0.25s ease;
        }

        .navbar-toggler-custom.menu-active span:nth-child(1) {
          transform: translateY(7.5px) rotate(45deg);
        }

        .navbar-toggler-custom.menu-active span:nth-child(2) {
          opacity: 0;
        }

        .navbar-toggler-custom.menu-active span:nth-child(3) {
          transform: translateY(-7.5px) rotate(-45deg);
        }

        /* Mobile menu animation */
        .mobile-menu {
          display: none;
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transform: translateY(-10px);
          transition:
            max-height 0.4s ease,
            opacity 0.3s ease,
            transform 0.3s ease;
          border-top: 1px solid transparent;
        }

        .mobile-menu.open {
          max-height: 750px;
          opacity: 1;
          transform: translateY(0);
          border-top-color: rgba(255,255,255,0.2);
        }

        .mobile-menu-content {
          padding: 12px 0 16px;
        }

        .mobile-nav-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .mobile-nav-links li a {
          display: block;
          color: #fff;
          text-decoration: none;
          font-weight: 600;
          padding: 11px 12px;
          border-radius: 7px;
          transition: background 0.2s ease;
        }

        .mobile-nav-links li a:hover {
          background: rgba(255,255,255,0.15);
        }

        .mobile-search {
          display: flex;
          margin: 12px 0;
          width: 100%;
        }

        .mobile-search input {
          flex: 1;
          min-width: 0;
          padding: 10px 14px;
          border: none;
          outline: none;
          border-radius: 20px 0 0 20px;
        }

        .mobile-search button {
          border: none;
          padding: 0 16px;
          background: #fff;
          color: #2e7d32;
          border-radius: 0 20px 20px 0;
        }

        .mobile-auth {
          display: flex;
          gap: 10px;
          margin-top: 12px;
        }

        .mobile-auth button {
          flex: 1;
          margin: 0 !important;
        }

        .mobile-profile-toggle {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px;
          border: none;
          border-radius: 10px;
          background: #fff;
          color: #333;
          text-align: left;
        }

        .mobile-profile-details {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          padding: 0 12px;
          margin-top: 0;
          background: #fff;
          color: #333;
          border-radius: 10px;
          transition:
            max-height 0.35s ease,
            opacity 0.25s ease,
            padding 0.3s ease,
            margin 0.3s ease;
        }

        .mobile-profile-details.profile-visible {
          max-height: 550px;
          opacity: 1;
          padding: 15px 12px;
          margin-top: 10px;
          overflow-y: auto;
        }

        @media (max-width: 1050px) {
          .nav-links-custom {
            gap: 0;
          }

          .nav-links-custom a {
            padding: 8px 7px !important;
            font-size: 0.85rem !important;
          }

          .desktop-actions {
            gap: 10px;
          }
        }

        @media (max-width: 850px) {
          .nav-links-custom {
            display: none;
          }

          .desktop-actions {
            display: none;
          }

          .navbar-toggler-custom {
            display: flex;
          }

          .mobile-menu {
            display: block;
            flex-basis: 100%;
          }

          .navContainer {
            min-height: 62px;
          }
        }

        @media (max-width: 480px) {
          .mobile-nav-links li a {
            padding: 10px;
          }

          .mobile-menu-content {
            padding: 10px 0 14px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mobile-menu,
          .mobile-profile-details,
          .navbar-toggler-custom span {
            transition: none !important;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;