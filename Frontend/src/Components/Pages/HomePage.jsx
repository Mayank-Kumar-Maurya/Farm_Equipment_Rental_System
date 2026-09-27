import React from 'react'
import Slider from '../Slider'
import Card from '../Card'

const categories = ['Tractors', 'Harvesters', 'Tillers', 'Sprayers']

const features = [
  { icon: '🚜', title: 'Wide Range', desc: 'Access 100+ farm equipment types for every need.' },
  { icon: '💰', title: 'Affordable Rates', desc: 'Rent by day, week, or season at competitive prices.' },
  { icon: '📍', title: 'Local Pickup', desc: 'Find equipment available near your location.' },
  { icon: '🔧', title: 'Well Maintained', desc: 'All equipment is serviced and ready to use.' },
]

function HomePage() {
  return (
    <>
      {/* Hero Slider */}
      <Slider />

      {/* Welcome Banner */}
      <div className="text-center py-4 px-3" style={{ background: '#f4f9f0' }}>
        <h2 style={{ color: '#2e7d32' }}>Welcome to FERS</h2>
        <p className="text-muted mx-auto" style={{ maxWidth: 600 }}>
          Farm Equipment Rental System — rent the right tools for your farm, when you need them.
        </p>
        <a href="#equipment" className="btn btn-success mt-2">Browse Equipment</a>
      </div>

      {/* Features */}
      <div className="container py-4">
        <div className="row g-3">
          {features.map((f, i) => (
            <div key={i} className="col-12 col-sm-6 col-lg-3">
              <div className="card h-100 text-center p-3 border-0 shadow-sm">
                <div style={{ fontSize: '2rem' }}>{f.icon}</div>
                <h6 className="mt-2">{f.title}</h6>
                <p className="text-muted small mb-0">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="container py-3">
        <h5 className="mb-3">Browse by Category</h5>
        <div className="d-flex flex-wrap gap-2">
          {categories.map((cat, i) => (
            <button key={i} className="btn btn-outline-success btn-sm">{cat}</button>
          ))}
        </div>
      </div>

      {/* Equipment Listing */}
      <div id="equipment" className="container-fluid py-3">
        <h5 className="text-center mb-3">Available Equipment</h5>
        <div className="row m-0 p-0">
          <Card /><Card /><Card /><Card />
          <Card /><Card /><Card /><Card />
          <Card /><Card /><Card /><Card />
        </div>
      </div>

      {/* CTA Banner */}
      <div className="text-center py-5" style={{ background: '#2e7d32', color: '#fff' }}>
        <h4>Own farm equipment? List it for rent!</h4>
        <p className="mb-3">Earn extra income by renting out your idle machinery.</p>
        <a href="#" className="btn btn-light">List Your Equipment</a>
      </div>
    </>
  )
}

export default HomePage
