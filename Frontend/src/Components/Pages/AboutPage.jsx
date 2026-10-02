import React from "react";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "🚜",
      title: "Wide Range of Equipment",
      description:
        "Explore different types of agricultural equipment, including tractors, harvesters, tillers, sprayers, seeders, and more.",
    },
    {
      icon: "📅",
      title: "Easy Equipment Booking",
      description:
        "Find suitable farming equipment and book it according to your agricultural requirements and preferred dates.",
    },
    {
      icon: "👨‍🌾",
      title: "Equipment Owner Platform",
      description:
        "Equipment owners can list their agricultural machinery, manage their equipment, and make it available for rental.",
    },
    {
      icon: "🔍",
      title: "Simple Search",
      description:
        "Search equipment by name, brand, or category to quickly find machinery that meets your needs.",
    },
    {
      icon: "⭐",
      title: "Ratings and Reviews",
      description:
        "Read equipment reviews and ratings to learn about other users' experiences before making a rental decision.",
    },
    {
      icon: "📍",
      title: "Location Information",
      description:
        "View equipment location details to understand where the machinery is available.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Explore Equipment",
      description:
        "Browse available agricultural equipment and search by name, brand, or category.",
    },
    {
      number: "02",
      title: "Choose Equipment",
      description:
        "View equipment details, pricing, ratings, images, and location information.",
    },
    {
      number: "03",
      title: "Book Equipment",
      description:
        "Select the equipment you need and proceed with the booking process.",
    },
    {
      number: "04",
      title: "Manage Your Activity",
      description:
        "Manage your bookings and, if you are an equipment owner, manage your listed equipment.",
    },
  ];

  const stats = [
    { value: "Easy", label: "Equipment Discovery" },
    { value: "Online", label: "Rental Platform" },
    { value: "Flexible", label: "Equipment Choices" },
    { value: "Simple", label: "Booking Experience" },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-overlay">
          <div className="container text-center">
            <span className="about-badge">🌾 Welcome to FERS</span>

            <h1>
              About Farm Equipment
              <span> Rental System</span>
            </h1>

            <p>
              Making agricultural equipment more accessible through a simple and
              convenient online rental platform.
            </p>

            <button
              className="about-primary-btn"
              onClick={() => navigate("/#equipment")}
            >
              Explore Equipment <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="about-intro container">
        <div className="row align-items-center g-4">
          <div className="col-lg-6">
            <div className="about-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000"
                alt="Agricultural farmland"
                className="about-main-image"
              />
              <div className="about-image-label">
                <span>🌱</span>
                <div>
                  <strong>Smart Farming</strong>
                  <small>Digital Equipment Rental</small>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <span className="section-tag">WHO WE ARE</span>
            <h2 className="about-section-heading">
              Making Farming Equipment Accessible
            </h2>

            <p className="about-description">
              Farm Equipment Rental System (FERS) is an online platform designed
              to connect farmers and agricultural equipment owners. It provides
              a convenient way to discover, list, and rent agricultural
              machinery.
            </p>

            <p className="about-description">
              Instead of depending only on equipment ownership, farmers can
              explore machinery available for rent according to their
              agricultural needs. Equipment owners can also list their machinery
              and make it accessible to other users.
            </p>

            <p className="about-description">
              Our goal is to simplify the equipment rental process through
              technology and provide users with an organized digital platform.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="container">
          <div className="row g-3">
            {stats.map((item, index) => (
              <div className="col-6 col-lg-3" key={index}>
                <div className="stat-card">
                  <h3>{item.value}</h3>
                  <p>{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="container about-mission-section">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="mission-card">
              <div className="mission-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>
                To provide a user-friendly digital platform where farmers can
                discover and rent agricultural equipment while equipment owners
                can list and manage their machinery conveniently.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="mission-card vision-card">
              <div className="mission-icon">🌍</div>
              <h3>Our Vision</h3>
              <p>
                To support accessible and technology-enabled agricultural
                equipment sharing by connecting farmers and equipment owners
                through an organized rental platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="about-features-section">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-tag">WHAT WE OFFER</span>
            <h2 className="about-section-heading">Features of Our Platform</h2>
            <p className="about-subtitle">
              Everything you need to discover and manage agricultural equipment
              rentals in one place.
            </p>
          </div>

          <div className="row g-4">
            {features.map((feature, index) => (
              <div className="col-sm-6 col-lg-4" key={index}>
                <div className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container about-process-section">
        <div className="text-center mb-5">
          <span className="section-tag">GETTING STARTED</span>
          <h2 className="about-section-heading">How FERS Works</h2>
          <p className="about-subtitle">
            A simple process to explore and rent agricultural equipment.
          </p>
        </div>

        <div className="row g-4">
          {steps.map((step, index) => (
            <div className="col-sm-6 col-lg-3" key={index}>
              <div className="process-card">
                <span className="process-number">{step.number}</span>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Responsive CSS */}
      <style>{`
        .about-page {
          color: #2d3a30;
          background: #fff;
          overflow: hidden;
          font-family: inherit;
        }

        .about-hero {
          min-height: 420px;
          background:
            linear-gradient(rgba(15, 65, 27, 0.72), rgba(15, 65, 27, 0.75)),
            url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600")
            center/cover no-repeat;
          display: flex;
          align-items: center;
        }

        .about-hero-overlay {
          width: 100%;
          padding: 75px 15px;
        }

        .about-badge {
          display: inline-block;
          color: #fff;
          background: rgba(255,255,255,0.16);
          border: 1px solid rgba(255,255,255,0.4);
          border-radius: 30px;
          padding: 8px 20px;
          margin-bottom: 20px;
          font-weight: 600;
        }

        .about-hero h1 {
          color: white;
          font-size: clamp(2.1rem, 5vw, 3.7rem);
          font-weight: 800;
          line-height: 1.2;
          max-width: 850px;
          margin: 0 auto 18px;
        }

        .about-hero h1 span {
          color: #c5e1a5;
          display: block;
        }

        .about-hero p {
          color: #f1f8e9;
          font-size: 1.08rem;
          max-width: 650px;
          margin: 0 auto 28px;
          line-height: 1.8;
        }

        .about-primary-btn,
        .about-banner-btn {
          border: none;
          border-radius: 30px;
          padding: 12px 28px;
          background: #fff;
          color: #23652e;
          font-weight: 700;
          transition: 0.25s;
        }

        .about-primary-btn:hover,
        .about-banner-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }

        .about-intro {
          padding-top: 85px;
          padding-bottom: 85px;
        }

        .about-image-wrapper {
          position: relative;
          padding: 0 15px 20px 0;
        }

        .about-main-image {
          width: 100%;
          height: 390px;
          object-fit: cover;
          border-radius: 18px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.13);
        }

        .about-image-label {
          position: absolute;
          bottom: 0;
          right: 0;
          display: flex;
          align-items: center;
          gap: 12px;
          background: white;
          padding: 14px 20px;
          border-radius: 12px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.12);
        }

        .about-image-label > span {
          font-size: 30px;
        }

        .about-image-label strong,
        .about-image-label small {
          display: block;
        }

        .about-image-label small {
          color: #718477;
          margin-top: 3px;
        }

        .section-tag {
          display: inline-block;
          color: #388e3c;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 2px;
          margin-bottom: 12px;
        }

        .about-section-heading {
          color: #245b2c;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          font-weight: 800;
          margin-bottom: 18px;
        }

        .about-description {
          color: #66756a;
          line-height: 1.9;
          font-size: 1rem;
          margin-bottom: 14px;
        }

        .about-stats {
          padding: 45px 0;
          background: #f0f6ed;
        }

        .stat-card {
          background: white;
          text-align: center;
          border-radius: 14px;
          padding: 25px 12px;
          height: 100%;
          box-shadow: 0 4px 15px rgba(40,80,40,0.06);
        }

        .stat-card h3 {
          color: #2e7d32;
          font-weight: 800;
          font-size: 1.7rem;
          margin-bottom: 7px;
        }

        .stat-card p {
          color: #718477;
          margin: 0;
          font-size: 0.92rem;
        }

        .about-mission-section {
          padding-top: 80px;
          padding-bottom: 80px;
        }

        .mission-card {
          height: 100%;
          background: #f2f7ef;
          border-radius: 18px;
          padding: 35px;
          border-left: 5px solid #43a047;
        }

        .vision-card {
          background: #f5f7ed;
          border-left-color: #8bc34a;
        }

        .mission-icon {
          font-size: 38px;
          margin-bottom: 15px;
        }

        .mission-card h3 {
          color: #245b2c;
          font-weight: 800;
          margin-bottom: 13px;
        }

        .mission-card p {
          color: #66756a;
          line-height: 1.8;
          margin: 0;
        }

        .about-features-section {
          padding: 80px 0;
          background: #f7faf5;
        }

        .about-subtitle {
          color: #718477;
          max-width: 650px;
          margin: 0 auto;
          line-height: 1.8;
        }

        .feature-card {
          height: 100%;
          padding: 30px 25px;
          border-radius: 16px;
          background: white;
          border: 1px solid #e4eee2;
          transition: transform 0.25s, box-shadow 0.25s;
        }

        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 25px rgba(35,90,45,0.10);
        }

        .feature-icon {
          width: 62px;
          height: 62px;
          display: grid;
          place-items: center;
          border-radius: 15px;
          background: #edf6e9;
          font-size: 30px;
          margin-bottom: 20px;
        }

        .feature-card h4 {
          color: #245b2c;
          font-weight: 750;
          font-size: 1.15rem;
          margin-bottom: 12px;
        }

        .feature-card p {
          color: #718477;
          line-height: 1.8;
          margin: 0;
          font-size: 0.95rem;
        }

        .about-process-section {
          padding-top: 85px;
          padding-bottom: 85px;
        }

        .process-card {
          height: 100%;
          position: relative;
          padding: 30px 22px;
          border: 1px solid #e2ecdf;
          border-radius: 16px;
          background: white;
        }

        .process-number {
          display: inline-block;
          color: #43a047;
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 18px;
        }

        .process-card h4 {
          color: #245b2c;
          font-size: 1.1rem;
          font-weight: 750;
          margin-bottom: 12px;
        }

        .process-card p {
          color: #718477;
          line-height: 1.8;
          margin: 0;
          font-size: 0.94rem;
        }

        .about-equipment-banner {
          padding: 75px 15px;
          background:
            linear-gradient(rgba(27,94,32,0.88), rgba(27,94,32,0.9)),
            url("https://images.unsplash.com/photo-1499529112087-3cb3b73fec95?w=1400")
            center/cover no-repeat;
        }

        .about-equipment-banner h2 {
          color: white;
          font-size: clamp(1.7rem, 4vw, 2.5rem);
          font-weight: 800;
          margin-bottom: 15px;
        }

        .about-equipment-banner p {
          color: #e8f5e9;
          max-width: 650px;
          margin: 0 auto 25px;
          line-height: 1.8;
        }

        .about-banner-btn {
          background: #c5e1a5;
        }

        .about-footer-note {
          padding: 35px 15px;
          background: #f0f6ed;
        }

        .about-footer-note h3 {
          color: #245b2c;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .about-footer-note p {
          color: #718477;
          margin-bottom: 12px;
        }

        .about-footer-note span {
          color: #388e3c;
          font-weight: 800;
          letter-spacing: 2px;
        }

        @media (max-width: 768px) {
          .about-hero {
            min-height: 360px;
          }

          .about-hero-overlay {
            padding: 60px 15px;
          }

          .about-intro {
            padding-top: 55px;
            padding-bottom: 55px;
          }

          .about-main-image {
            height: 280px;
          }

          .about-image-wrapper {
            margin-bottom: 15px;
          }

          .about-mission-section,
          .about-process-section {
            padding-top: 55px;
            padding-bottom: 55px;
          }

          .about-features-section {
            padding: 55px 0;
          }

          .mission-card {
            padding: 25px;
          }

          .about-equipment-banner {
            padding: 55px 15px;
          }
        }

        @media (max-width: 480px) {
          .about-hero h1 {
            font-size: 2rem;
          }

          .about-hero p {
            font-size: 0.95rem;
          }

          .about-main-image {
            height: 230px;
          }

          .about-image-label {
            padding: 10px 13px;
            gap: 8px;
          }

          .about-image-label > span {
            font-size: 24px;
          }

          .stat-card {
            padding: 20px 8px;
          }

          .stat-card h3 {
            font-size: 1.35rem;
          }

          .stat-card p {
            font-size: 0.8rem;
          }

          .feature-card {
            padding: 24px 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
