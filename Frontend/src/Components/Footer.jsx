import React from "react";

const s = {
  footer: {
    background:
      "linear-gradient(135deg, #1b5e20 0%, #2e7d32 60%, #43a047 100%)",
    color: "rgba(255,255,255,0.85)",
    padding: "48px 32px 0",
    fontFamily: "cursive",
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    overflowX: "clip",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "36px",
    maxWidth: "1100px",
    width: "100%",
    margin: "0 auto",
  },

  column: {
    minWidth: 0,
    maxWidth: "100%",
    overflowWrap: "anywhere",
  },

  heading: {
    color: "#fff",
    fontWeight: 700,
    fontSize: "1rem",
    marginBottom: "14px",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },

  link: {
    display: "block",
    color: "rgba(255,255,255,0.75)",
    textDecoration: "none",
    marginBottom: "8px",
    fontSize: "0.9rem",
  },

  divider: {
    border: "none",
    borderTop: "1px solid rgba(255,255,255,0.2)",
    margin: "36px auto 0",
    maxWidth: "1100px",
    width: "100%",
  },

  bottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
    maxWidth: "1100px",
    width: "100%",
    margin: "0 auto",
    padding: "18px 0 24px",
    fontSize: "0.82rem",
    color: "rgba(255,255,255,0.6)",
  },

  socialBtn: {
    background: "rgba(255,255,255,0.15)",
    border: "none",
    borderRadius: "50%",
    width: "34px",
    height: "34px",
    cursor: "pointer",
    fontSize: "1rem",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "6px",
    color: "#fff",
  },

  badge: {
    background: "#fff",
    color: "#2e7d32",
    borderRadius: "6px",
    padding: "2px 7px",
    fontSize: "0.7rem",
    fontWeight: 700,
    letterSpacing: "1px",
    marginLeft: "6px",
  },

  inputRow: {
    display: "flex",
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    marginTop: "10px",
  },

  input: {
    flex: "1 1 0",
    width: "0",
    minWidth: 0,
    maxWidth: "100%",
    border: "none",
    borderRadius: "20px 0 0 20px",
    padding: "7px 10px",
    fontSize: "0.85rem",
    outline: "none",
    boxSizing: "border-box",
  },

  subBtn: {
    flex: "0 0 auto",
    background: "#fff",
    color: "#2e7d32",
    border: "none",
    borderRadius: "0 20px 20px 0",
    padding: "7px 10px",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "0.85rem",
    whiteSpace: "nowrap",
  },
};

function Footer() {
  return (
    <footer style={s.footer}>
      <div className="fers-footer-grid" style={s.grid}>
        {/* Brand */}
        <div style={s.column}>
          <div
            style={{
              fontSize: "1.4rem",
              fontWeight: 800,
              color: "#fff",
              marginBottom: "12px",
            }}
          >
            🌾 FERS <span style={s.badge}>RENTAL</span>
          </div>

          <p style={{ fontSize: "0.88rem", lineHeight: "1.6" }}>
            Farm Equipment Rental System — connecting farmers with the tools
            they need, when they need them.
          </p>

          <div>
            <button style={s.socialBtn} title="Facebook">
              f
            </button>
            <button style={s.socialBtn} title="Twitter">
              𝕏
            </button>
            <button style={s.socialBtn} title="Instagram">
              📷
            </button>
            <button style={s.socialBtn} title="YouTube">
              ▶
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div style={s.column}>
          <div style={s.heading}>Quick Links</div>

          {[
            "Home",
            "Browse Equipment",
            "How It Works",
            "About Us",
            "Contact",
          ].map((l, i) => (
            <a key={i} href="#" style={s.link}>
              {l}
            </a>
          ))}
        </div>

        {/* Categories */}
        <div style={s.column}>
          <div style={s.heading}>Equipment</div>

          {[
            "Tractors",
            "Harvesters",
            "Tillers",
            "Sprayers",
            "Seeders",
            "Irrigation",
          ].map((l, i) => (
            <a key={i} href="#" style={s.link}>
              {l}
            </a>
          ))}
        </div>

        {/* Contact */}
        <div style={s.column}>
          <div style={s.heading}>Contact Us</div>

          <p style={{ fontSize: "0.88rem", marginBottom: "8px" }}>
            📍 123 Farm Road, AgriCity
          </p>

          <p style={{ fontSize: "0.88rem", marginBottom: "8px" }}>
            📞 +91 98765 43210
          </p>

          <p
            style={{
              fontSize: "0.88rem",
              marginBottom: "16px",
              overflowWrap: "anywhere",
            }}
          >
            ✉️ support@fers.com
          </p>

          <div style={s.heading}>Newsletter</div>

          <div style={s.inputRow}>
            <input style={s.input} type="email" placeholder="Your email" />

            <button style={s.subBtn}>Subscribe</button>
          </div>
        </div>
      </div>

      <hr style={s.divider} />

      <div className="fers-footer-bottom" style={s.bottom}>
        <span>
          © {new Date().getFullYear()} FERS — Farm Equipment Rental System. All
          rights reserved.
        </span>

        <span>
          <a
            href="#"
            style={{
              ...s.link,
              display: "inline",
              marginRight: "16px",
            }}
          >
            Privacy Policy
          </a>

          <a href="#" style={{ ...s.link, display: "inline" }}>
            Terms of Service
          </a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
