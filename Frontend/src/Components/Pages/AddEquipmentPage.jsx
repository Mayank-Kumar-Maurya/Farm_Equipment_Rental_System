import React, { useState } from 'react'

const clr = {
  primary: '#4a7c59',
  dark: '#2d5a3d',
  light: '#f0f5f1',
  border: '#c8ddd0',
  text: '#2d3a30',
  muted: '#7a9485',
}

const categories = ['Tractor', 'Harvester', 'Tiller', 'Sprayer', 'Seeder', 'Irrigation', 'Plough', 'Other']

const s = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #e8f0ea 0%, #f5f9f6 60%, #ddeee3 100%)',
    padding: '40px 16px',
    fontFamily: 'cursive',
  },
  card: {
    background: '#fff',
    borderRadius: '20px',
    boxShadow: '0 8px 40px rgba(74,124,89,0.13)',
    overflow: 'hidden',
    maxWidth: '700px',
    margin: '0 auto',
  },
  topBar: {
    background: `linear-gradient(135deg, ${clr.dark} 0%, ${clr.primary} 100%)`,
    padding: '24px 28px 20px',
  },
  topTitle: {
    color: '#fff',
    fontSize: '1.25rem',
    fontWeight: 800,
    letterSpacing: '1px',
    margin: 0,
  },
  topSub: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '0.82rem',
    marginTop: '4px',
  },
  body: {
    padding: '28px 28px 36px',
  },
  label: {
    display: 'block',
    fontSize: '0.82rem',
    fontWeight: 600,
    color: clr.text,
    marginBottom: '6px',
    letterSpacing: '0.5px',
  },
  input: (focused) => ({
    width: '100%',
    padding: '10px 14px',
    border: `1.5px solid ${focused ? clr.primary : clr.border}`,
    borderRadius: '10px',
    fontSize: '0.92rem',
    outline: 'none',
    color: clr.text,
    background: clr.light,
    boxSizing: 'border-box',
    transition: 'border 0.2s',
    fontFamily: 'cursive',
  }),
  textarea: (focused) => ({
    width: '100%',
    padding: '10px 14px',
    border: `1.5px solid ${focused ? clr.primary : clr.border}`,
    borderRadius: '10px',
    fontSize: '0.92rem',
    outline: 'none',
    color: clr.text,
    background: clr.light,
    boxSizing: 'border-box',
    resize: 'vertical',
    minHeight: '100px',
    transition: 'border 0.2s',
    fontFamily: 'cursive',
  }),
  select: (focused) => ({
    width: '100%',
    padding: '10px 14px',
    border: `1.5px solid ${focused ? clr.primary : clr.border}`,
    borderRadius: '10px',
    fontSize: '0.92rem',
    outline: 'none',
    color: clr.text,
    background: clr.light,
    boxSizing: 'border-box',
    transition: 'border 0.2s',
    fontFamily: 'cursive',
    cursor: 'pointer',
  }),
  group: {
    marginBottom: '20px',
  },
  row: {
    display: 'grid',
    gap: '20px',
  },
  uploadBox: (dragging) => ({
    border: `2px dashed ${dragging ? clr.primary : clr.border}`,
    borderRadius: '12px',
    background: dragging ? '#e8f5ec' : clr.light,
    padding: '28px 20px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
  }),
  previewGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
    gap: '10px',
    marginTop: '14px',
  },
  previewImg: {
    width: '100%',
    aspectRatio: '1',
    objectFit: 'cover',
    borderRadius: '8px',
    border: `1.5px solid ${clr.border}`,
  },
  removeBtn: {
    position: 'absolute',
    top: '4px',
    right: '4px',
    background: 'rgba(0,0,0,0.55)',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    fontSize: '0.7rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  stars: {
    display: 'flex',
    gap: '6px',
    marginTop: '4px',
  },
  star: (active) => ({
    fontSize: '1.6rem',
    cursor: 'pointer',
    color: active ? '#e6a817' : clr.border,
    transition: 'color 0.15s',
    lineHeight: 1,
  }),
  submitBtn: {
    width: '100%',
    padding: '13px',
    background: `linear-gradient(135deg, ${clr.dark} 0%, ${clr.primary} 100%)`,
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: 700,
    cursor: 'pointer',
    letterSpacing: '1px',
    marginTop: '8px',
    fontFamily: 'cursive',
    transition: 'opacity 0.2s',
  },
  cancelBtn: {
    width: '100%',
    padding: '13px',
    background: '#fff',
    color: clr.muted,
    border: `1.5px solid ${clr.border}`,
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '10px',
    fontFamily: 'cursive',
  },
  hint: {
    fontSize: '0.78rem',
    color: clr.muted,
    marginTop: '5px',
  },
  sectionTitle: {
    fontSize: '0.78rem',
    fontWeight: 700,
    color: clr.primary,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '16px',
    paddingBottom: '6px',
    borderBottom: `1.5px solid ${clr.border}`,
  },
}

function AddEquipmentPage() {
  const [focused, setFocused] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [photos, setPhotos] = useState([])
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

  const focus = (k) => () => setFocused(k)
  const blur = () => setFocused(null)

  const handleFiles = (files) => {
    const newPreviews = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }))
    setPhotos((prev) => [...prev, ...newPreviews])
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div style={s.page}>
      <style>{`
        .eq-row-2 { grid-template-columns: 1fr 1fr; }
        .eq-row-3 { grid-template-columns: 1fr 1fr 1fr; }
        @media (max-width: 560px) {
          .eq-row-2, .eq-row-3 { grid-template-columns: 1fr !important; }
          .eq-card { padding: 20px 16px 28px !important; }
        }
      `}</style>

      <div style={s.card}>
        {/* Header */}
        <div style={s.topBar}>
          <div style={s.topTitle}>🚜 Add Equipment for Rent</div>
          <div style={s.topSub}>Fill in the details below to list your equipment</div>
        </div>

        <div style={s.body} className="eq-card">

          {/* Basic Info */}
          <div style={s.sectionTitle}>Basic Information</div>

          <div style={{ ...s.row }} className="eq-row-2">
            <div style={s.group}>
              <label style={s.label}>Equipment Name *</label>
              <input
                name='name'
                style={s.input(focused === 'name')}
                type="text" placeholder="e.g. Mahindra 275 DI Tractor"
                onFocus={focus('name')} onBlur={blur}
              />
            </div>
            <div style={s.group}>
              <label style={s.label}>Brand *</label>
              <input
                name='brand'
                style={s.input(focused === 'brand')}
                type="text" placeholder="e.g. Mahindra, John Deere"
                onFocus={focus('brand')} onBlur={blur}
              />
            </div>
          </div>

          <div style={{ ...s.row }} className="eq-row-2">
            <div style={s.group}>
              <label style={s.label}>Category *</label>
              <select 
                name='category'
                style={s.select(focused === 'cat')} onFocus={focus('cat')} onBlur={blur}>
                <option value="">Select category</option>
                {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
              </select>
            </div>
            <div style={s.group}>
              <label style={s.label}>Rental Price *</label>
              <input
                name='price'
                style={s.input(focused === 'price')}
                type="number" placeholder="₹ per day"
                onFocus={focus('price')} onBlur={blur}
              />
              <div style={s.hint}>Enter amount in ₹ per day</div>
            </div>
          </div>

          <div style={s.group}>
            <label style={s.label}>Description *</label>
            <textarea
              name='discription'
              style={s.textarea(focused === 'desc')}
              placeholder="Describe the equipment — condition, features, usage instructions..."
              onFocus={focus('desc')} onBlur={blur}
            />
          </div>

          {/* Owner Rating */}
          <div style={s.group}>
            <label style={s.label}>Owner Rating</label>
            <div style={s.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={s.star(star <= (hoverRating || rating))}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >★</span>
              ))}
            </div>
            <div style={s.hint}>{rating > 0 ? `You rated: ${rating} / 5` : 'Click to rate'}</div>
          </div>

          {/* Photos */}
          <div style={s.sectionTitle}>Equipment Photos</div>

          <div style={s.group}>
            <label style={s.label}>Upload Photos *</label>
            <div
              style={s.uploadBox(dragging)}
              onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById('photoInput').click()}
            >
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📷</div>
              <div style={{ fontWeight: 600, color: clr.text, fontSize: '0.92rem' }}>
                Drag & drop photos here, or <span style={{ color: clr.primary, textDecoration: 'underline' }}>browse</span>
              </div>
              <div style={s.hint}>Accepts JPG, PNG, WEBP — multiple files allowed</div>
              <input
                id="photoInput"
                type="file"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>

            {/* Preview */}
            {photos.length > 0 && (
              <div style={s.previewGrid}>
                {photos.map((photo, i) => (
                  <div key={i} style={{ position: 'relative' }}>
                    <img src={photo.url} alt={photo.name} style={s.previewImg} />
                    <button style={s.removeBtn} onClick={() => removePhoto(i)}>✕</button>
                  </div>
                ))}
              </div>
            )}
            {photos.length > 0 && (
              <div style={{ ...s.hint, marginTop: '8px' }}>{photos.length} photo{photos.length > 1 ? 's' : ''} selected</div>
            )}
          </div>

          {/* Actions */}
          <button style={s.submitBtn}>Submit Equipment</button>
          <button style={s.cancelBtn}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default AddEquipmentPage
