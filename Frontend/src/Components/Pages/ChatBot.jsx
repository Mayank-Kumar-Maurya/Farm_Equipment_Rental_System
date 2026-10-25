import React, { useState, useRef, useEffect, useContext } from 'react'
import ServerContext from '../../Context/ServerContext'

const clr = {
  primary: '#4a7c59',
  dark:    '#2d5a3d',
  light:   '#f0f5f1',
  border:  '#c8ddd0',
  text:    '#2d3a30',
  muted:   '#7a9485',
}

const quickReplies = [
  '🚜 Available Equipment',
  '📅 How to Book?',
  '📋 My Bookings',
  '💰 Rental Prices',
  '📞 Contact Support',
]

const autoReplies = {
  'available equipment': 'You can browse all available equipment on the home page. Use the category filters to narrow down your search! 🌾',
  'how to book':         'Booking is simple!\n1. Find equipment\n2. Select a date\n3. Send booking request\n4. Wait for owner approval ✅',
  'my bookings':         'Go to your dashboard to see all your bookings and their current status (Pending / Approved / Rejected).',
  'rental prices':       'Rental prices vary by equipment type:\n🚜 Tractor: ₹800–₹2000/day\n🌾 Harvester: ₹1500–₹4000/day\n💧 Sprayer: ₹400–₹800/day',
  'contact support':     'You can reach us at:\n📧 support@fers.com\n📞 +91 98765 43210',
  'hi':                   `Namaste! How can I help you today?

I am your **FERS Assistant**. I can help you:
* 🚜 **Find equipment** like Tractors, Harvesters, or Tillers.
* 📅 **Book equipment** for your farm.
* 📋 **Check your booking status**.
* 💰 **Understand rental pricing**.

Are you looking to rent something specific, or do you need help with a booking?`
}


function ChatBot() {
  
  const {chatBot} = useContext(ServerContext);

  const getAutoReply = async(msg) => {
    const lower = msg.toLowerCase()
    for (let key in autoReplies) {
      if (lower.includes(key)) return autoReplies[key]
    }

    let ans = await chatBot(msg)
    console.log(ans)
    if(ans.length > 0)
    {
      return ans;
    }
    else
    return "I'm not sure about that. Please contact support at support@fers.com or try browsing the site. 🌾"
  }


  const [open, setOpen]       = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: '👋 Hi! I\'m FERS Assistant.\nHow can I help you today?' }
  ])
  const [input, setInput]     = useState('')
  const [typing, setTyping]   = useState(false)
  const bottomRef             = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = (text) => {
    const msg = text || input
    if (!msg.trim()) return

    setMessages(prev => [...prev, { from: 'user', text: msg }])
    setInput('')
    setTyping(true)

    setTimeout(async() => {
      setTyping(false)
      let reply = await getAutoReply(msg);
      setMessages(prev => [...prev, { from: 'bot', text: reply }])
    }, 900)
  }

  return (
    <>
      <style>{`
        .fers-chat-window {
          position: fixed;
          bottom: 88px;
          right: 24px;
          width: 320px;
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 8px 40px rgba(45,90,61,0.18);
          z-index: 9999;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          font-family: cursive;
          animation: chatSlideUp 0.22s ease;
        }
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fers-msg-bot  { align-self: flex-start; background: #f0f5f1; color: #2d3a30; border-radius: 14px 14px 14px 4px; }
        .fers-msg-user { align-self: flex-end;   background: linear-gradient(135deg,#2d5a3d,#4a7c59); color:#fff; border-radius: 14px 14px 4px 14px; }
        .fers-quick    { background:#f0f5f1; border:1.5px solid #c8ddd0; border-radius:20px; padding:5px 11px; font-size:0.75rem; cursor:pointer; color:#4a7c59; font-family:cursive; white-space:nowrap; transition: background 0.2s; }
        .fers-quick:hover { background:#4a7c59; color:#fff; }
        .fers-input    { flex:1; border:1.5px solid #c8ddd0; border-radius:20px; padding:8px 13px; font-size:0.85rem; outline:none; font-family:cursive; background:#f0f5f1; color:#2d3a30; }
        .fers-input:focus { border-color:#4a7c59; }
        .fers-send     { background:linear-gradient(135deg,#2d5a3d,#4a7c59); color:#fff; border:none; border-radius:50%; width:36px; height:36px; cursor:pointer; font-size:1rem; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .fers-fab      { position:fixed; bottom:24px; right:24px; width:54px; height:54px; border-radius:50%; background:linear-gradient(135deg,#2d5a3d,#4a7c59); color:#fff; border:none; font-size:1.4rem; cursor:pointer; box-shadow:0 4px 18px rgba(45,90,61,0.35); z-index:9999; display:flex; align-items:center; justify-content:center; transition: transform 0.2s; }
        .fers-fab:hover { transform: scale(1.08); }
        .fers-dot { width:7px; height:7px; border-radius:50%; background:#4a7c59; animation: dotBounce 1.2s infinite; display:inline-block; margin:0 2px; }
        .fers-dot:nth-child(2){ animation-delay:0.2s; }
        .fers-dot:nth-child(3){ animation-delay:0.4s; }
        @keyframes dotBounce {
          0%,80%,100% { transform:translateY(0); }
          40%          { transform:translateY(-6px); }
        }
        @media (max-width: 400px) {
          .fers-chat-window { width: calc(100vw - 24px); right: 12px; bottom: 80px; }
          .fers-fab { right: 12px; bottom: 12px; }
        }
      `}</style>

      {/* Floating Button */}
      <button className="fers-fab" onClick={() => setOpen(o => !o)} title="FERS Assistant">
        {open ? '✕' : '🤖'}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fers-chat-window">

          {/* Header */}
          <div style={{ background: `linear-gradient(135deg, ${clr.dark}, ${clr.primary})`, padding: '13px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>🌾</div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>FERS Assistant</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem' }}>● Online</div>
            </div>
            <button onClick={() => setOpen(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', cursor: 'pointer' }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{ padding: '12px', overflowY: 'auto', maxHeight: '280px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {messages.map((msg, i) => (
              <div key={i} className={msg.from === 'bot' ? 'fers-msg-bot' : 'fers-msg-user'}
                style={{ padding: '9px 13px', fontSize: '0.83rem', maxWidth: '85%', lineHeight: '1.5', whiteSpace: 'pre-line' }}>
                {msg.text}
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="fers-msg-bot" style={{ padding: '10px 14px' }}>
                <span className="fers-dot" />
                <span className="fers-dot" />
                <span className="fers-dot" />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Replies */}
          <div style={{ padding: '6px 10px', display: 'flex', gap: '6px', overflowX: 'auto', borderTop: `1px solid ${clr.border}` }}>
            {quickReplies.map((q, i) => (
              <button key={i} className="fers-quick" onClick={() => sendMessage(q)}>{q}</button>
            ))}
          </div>

          {/* Input */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', borderTop: `1px solid ${clr.border}` }}>
            <input
              className="fers-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
            />
            <button className="fers-send" onClick={() => sendMessage()}>➤</button>
          </div>

        </div>
      )}
    </>
  )
}

export default ChatBot
