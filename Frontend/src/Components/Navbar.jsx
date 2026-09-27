import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Equipment', href: '#equipment' },
  { label: 'Add Equipments', href: '/addEquipments' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]


const styles = {
  nav: {
    background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 60%, #43a047 100%)',
    boxShadow: '0 3px 12px rgba(0,0,0,0.25)',
    padding: '0 1.5rem',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  brand: {
    color: '#fff',
    fontWeight: 800,
    fontSize: '1.5rem',
    letterSpacing: '2px',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  brandBadge: {
    background: '#fff',
    color: '#2e7d32',
    borderRadius: '6px',
    padding: '2px 7px',
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '1px',
  },
  link: {
    color: 'rgba(255,255,255,0.88)',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '0.95rem',
    padding: '6px 12px',
    borderRadius: '6px',
    transition: 'background 0.2s, color 0.2s',
  },
  linkHover: {
    background: 'rgba(255,255,255,0.15)',
    color: '#fff',
  },
  searchInput: {
    border: 'none',
    borderRadius: '20px 0 0 20px',
    padding: '6px 14px',
    fontSize: '0.88rem',
    outline: 'none',
    width: '180px',
  },
  searchBtn: {
    background: '#fff',
    color: '#2e7d32',
    border: 'none',
    borderRadius: '0 20px 20px 0',
    padding: '6px 14px',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '0.88rem',
  },
  loginBtn: {
    background: 'transparent',
    color: '#fff',
    border: '1.5px solid rgba(255,255,255,0.7)',
    borderRadius: '20px',
    padding: '5px 18px',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '0.88rem',
    marginLeft: '8px',
    transition: 'background 0.2s, color 0.2s',
  },
  registerBtn: {
    background: '#fff',
    color: '#2e7d32',
    border: 'none',
    borderRadius: '20px',
    padding: '5px 18px',
    fontWeight: 700,
    cursor: 'pointer',
    fontSize: '0.88rem',
    marginLeft: '8px',
    transition: 'background 0.2s, color 0.2s',
  },
}

function Navbar() {
  const [hoveredLink, setHoveredLink] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  let navigate = useNavigate();

  return (
    <nav style={styles.nav}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '62px', flexWrap: 'wrap', gap: '10px' }}>

        {/* Brand */}
        <a href="/" style={styles.brand}>
          🌾 FERS <span style={styles.brandBadge}>RENTAL</span>
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer', display: 'none' }}
          className="navbar-toggler-custom"
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        {/* Nav Links */}
        <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: '4px', alignItems: 'center' }} className="nav-links-custom">
          {navLinks.map((link, i) => (
            <li key={i}>
              <a
                href={link.href}
                style={hoveredLink === i ? { ...styles.link, ...styles.linkHover } : styles.link}
                onMouseEnter={() => setHoveredLink(i)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Search + Auth — desktop only */}
        <div className="desktop-actions" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ display: 'flex' }}>
            <input style={styles.searchInput} type="search" placeholder="Search equipment..." />
            <button style={styles.searchBtn}>🔍</button>
          </div>
          <button style={styles.loginBtn}  onClick={()=>navigate('/Login')}>Login</button>
          <button style={styles.registerBtn}>Register</button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', padding: '12px 0' }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {navLinks.map((link, i) => (
              <li key={i}>
                <a href={link.href} style={{ ...styles.link, display: 'block', padding: '10px 12px' }} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          {/* Search inside mobile menu */}
          <div style={{ display: 'flex', margin: '12px 12px 8px' }}>
            <input style={{ ...styles.searchInput, width: '100%' }} type="search" placeholder="Search equipment..." />
            <button style={styles.searchBtn}>🔍</button>
          </div>
          {/* Auth buttons inside mobile menu */}
          <div style={{ display: 'flex', gap: '10px', padding: '4px 12px 8px' }}>
            <button style={{ ...styles.loginBtn, marginLeft: 0, flex: 1 }}>Login</button>
            <button style={{ ...styles.registerBtn, marginLeft: 0, flex: 1 }}>Register</button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links-custom { display: none !important; }
          .navbar-toggler-custom { display: block !important; }
          .desktop-actions { display: none !important; }
        }
      `}</style>
    </nav>
  )
}

export default Navbar
