import React, { useState } from 'react'

const clr = {
  primary: '#4a7c59',
  dark: '#2d5a3d',
  light: '#f0f5f1',
  border: '#c8ddd0',
  text: '#2d3a30',
  muted: '#7a9485',
}

const s = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #e8f0ea 0%, #f5f9f6 60%, #ddeee3 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 16px',
  },
  card: {
    background: '#fff',
    borderRadius: '20px',
    boxShadow: '0 8px 40px rgba(74,124,89,0.13)',
    overflow: 'hidden',
  },
  topBar: {
    background: `linear-gradient(135deg, ${clr.dark} 0%, ${clr.primary} 100%)`,
    padding: '24px 20px 18px',
    textAlign: 'center',
  },
  logo: {
    color: '#fff',
    fontSize: '1.5rem',
    fontWeight: 800,
    letterSpacing: '2px',
    marginBottom: '4px',
  },
  logoSub: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '0.8rem',
    letterSpacing: '1px',
  },
  tabs: {
    display: 'flex',
    borderBottom: `2px solid ${clr.border}`,
    background: clr.light,
  },
  tab: (active) => ({
    flex: 1,
    padding: '13px',
    border: 'none',
    background: active ? '#fff' : 'transparent',
    color: active ? clr.primary : clr.muted,
    fontWeight: active ? 700 : 500,
    fontSize: '0.95rem',
    cursor: 'pointer',
    borderBottom: active ? `2px solid ${clr.primary}` : '2px solid transparent',
    marginBottom: '-2px',
    transition: 'all 0.2s',
    fontFamily: 'cursive',
  }),
  body: {
    padding: '24px 20px 28px',
  },
  label: {
    display: 'block',
    fontSize: '0.82rem',
    fontWeight: 600,
    color: clr.text,
    marginBottom: '6px',
    letterSpacing: '0.5px',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    border: `1.5px solid ${clr.border}`,
    borderRadius: '10px',
    fontSize: '0.92rem',
    outline: 'none',
    color: clr.text,
    background: clr.light,
    boxSizing: 'border-box',
    transition: 'border 0.2s',
    fontFamily: 'cursive',
  },
  group: {
    marginBottom: '18px',
  },
  submitBtn: {
    width: '100%',
    padding: '12px',
    background: `linear-gradient(135deg, ${clr.dark} 0%, ${clr.primary} 100%)`,
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: 700,
    cursor: 'pointer',
    letterSpacing: '1px',
    marginTop: '6px',
    transition: 'opacity 0.2s',
    fontFamily: 'cursive',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    margin: '20px 0',
    color: clr.muted,
    fontSize: '0.8rem',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    background: clr.border,
  },
  googleBtn: {
    width: '100%',
    padding: '10px',
    background: '#fff',
    color: clr.text,
    border: `1.5px solid ${clr.border}`,
    borderRadius: '10px',
    fontSize: '0.92rem',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'cursive',
  },
  switchText: {
    textAlign: 'center',
    fontSize: '0.85rem',
    color: clr.muted,
    marginTop: '20px',
  },
  switchLink: {
    color: clr.primary,
    fontWeight: 700,
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  forgotLink: {
    fontSize: '0.8rem',
    color: clr.primary,
    textDecoration: 'none',
    float: 'right',
    marginTop: '-14px',
    marginBottom: '14px',
    display: 'block',
    fontWeight: 600,
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '14px',
  },
  roleRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '18px',
  },
  roleBtn: (active) => ({
    flex: 1,
    padding: '9px',
    border: `1.5px solid ${active ? clr.primary : clr.border}`,
    borderRadius: '10px',
    background: active ? clr.light : '#fff',
    color: active ? clr.primary : clr.muted,
    fontWeight: active ? 700 : 500,
    cursor: 'pointer',
    fontSize: '0.88rem',
    transition: 'all 0.2s',
    fontFamily: 'cursive',
  }),
}

function LoginForm({ onSwitch }) {
  const [focused, setFocused] = useState(null)
  return (
    <div style={s.body}>
      <div style={s.group}>
        <label style={s.label}>Email Address</label>
        <input
          style={{ ...s.input, border: `1.5px solid ${focused === 'email' ? clr.primary : clr.border}` }}
          type="email" placeholder="you@example.com"
          onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
        />
      </div>
      <div style={s.group}>
        <label style={s.label}>Password</label>
        <input
          style={{ ...s.input, border: `1.5px solid ${focused === 'pass' ? clr.primary : clr.border}` }}
          type="password" placeholder="Enter your password"
          onFocus={() => setFocused('pass')} onBlur={() => setFocused(null)}
        />
      </div>
      <div style={{ textAlign: 'right', marginTop: '-10px', marginBottom: '16px' }}>
        <a href="#" style={{ fontSize: '0.8rem', color: clr.primary, fontWeight: 600, textDecoration: 'none' }}>Forgot password?</a>
      </div>
      <button style={s.submitBtn}>Login</button>
      <div style={s.divider}>
        <span style={s.dividerLine} /> or <span style={s.dividerLine} />
      </div>
      <button style={s.googleBtn}>
        <span style={{ fontSize: '1.1rem' }}>G</span> Continue with Google
      </button>
      <p style={s.switchText}>
        Don't have an account?{' '}
        <span style={s.switchLink} onClick={onSwitch}>Register here</span>
      </p>
    </div>
  )
}

function RegisterForm({ onSwitch }) {
  const [focused, setFocused] = useState(null)
  const [role, setRole] = useState('farmer')

  const inp = (key) => ({
    ...s.input,
    border: `1.5px solid ${focused === key ? clr.primary : clr.border}`,
  })

  return (
    <div style={s.body}>
      {/* Role selector */}
      <div style={s.roleRow}>
        <button style={s.roleBtn(role === 'farmer')} onClick={() => setRole('farmer')}>🌾 Farmer</button>
        <button style={s.roleBtn(role === 'owner')} onClick={() => setRole('owner')}>🚜 Equipment Owner</button>
      </div>

      <div style={s.row} className="auth-row">
        <div style={s.group}>
          <label style={s.label}>First Name</label>
          <input style={inp('fname')} type="text" placeholder="John"
            onFocus={() => setFocused('fname')} onBlur={() => setFocused(null)} />
        </div>
        <div style={s.group}>
          <label style={s.label}>Last Name</label>
          <input style={inp('lname')} type="text" placeholder="Doe"
            onFocus={() => setFocused('lname')} onBlur={() => setFocused(null)} />
        </div>
      </div>

      <div style={s.group}>
        <label style={s.label}>Email Address</label>
        <input style={inp('email')} type="email" placeholder="you@example.com"
          onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} />
      </div>

      <div style={s.group}>
        <label style={s.label}>Phone Number</label>
        <input style={inp('phone')} type="tel" placeholder="+91 00000 00000"
          onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)} />
      </div>

      <div style={s.row} className="auth-row">
        <div style={s.group}>
          <label style={s.label}>Password</label>
          <input style={inp('pass')} type="password" placeholder="••••••••"
            onFocus={() => setFocused('pass')} onBlur={() => setFocused(null)} />
        </div>
        <div style={s.group}>
          <label style={s.label}>Confirm Password</label>
          <input style={inp('cpass')} type="password" placeholder="••••••••"
            onFocus={() => setFocused('cpass')} onBlur={() => setFocused(null)} />
        </div>
      </div>

      <button style={s.submitBtn}>Create Account</button>
      <p style={s.switchText}>
        Already have an account?{' '}
        <span style={s.switchLink} onClick={onSwitch}>Login here</span>
      </p>
    </div>
  )
}

function AuthPage() {
  const [tab, setTab] = useState('login')

  return (
    <div style={s.page}>
      <style>{`
        .auth-card { width: 100%; max-width: 440px; }
        .auth-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media (max-width: 480px) {
          .auth-row { grid-template-columns: 1fr !important; }
          .auth-card { border-radius: 14px; }
        }
      `}</style>
      <div style={s.card} className="auth-card">
        {/* Top bar */}
        <div style={s.topBar}>
          <div style={s.logo}>🌾 FERS</div>
          <div style={s.logoSub}>FARM EQUIPMENT RENTAL SYSTEM</div>
        </div>

        {/* Tabs */}
        <div style={s.tabs}>
          <button style={s.tab(tab === 'login')} onClick={() => setTab('login')}>Login</button>
          <button style={s.tab(tab === 'register')} onClick={() => setTab('register')}>Register</button>
        </div>

        {/* Form */}
        {tab === 'login'
          ? <LoginForm onSwitch={() => setTab('register')} />
          : <RegisterForm onSwitch={() => setTab('login')} />
        }
      </div>
    </div>
  )
}

export default AuthPage
