import React, { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      // TODO: Connect this form to your backend contact API.
      // Example:
      // await axios.post("http://localhost:8080/contact", formData);

      console.log("Contact form submitted:", formData);

      setSuccess(
        "Your message has been submitted successfully. Thank you for contacting us!",
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("Contact form error:", err);
      setError(
        err.response?.data?.msg ||
          "Unable to send your message. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container text-center">
          <span className="contact-badge">🌾 FERS RENTAL</span>

          <h1>Get In Touch With Us</h1>

          <p>
            Have a question, suggestion, or need assistance? We would love to
            hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container contact-main">
        <div className="row g-4">
          {/* Contact Information */}
          <div className="col-lg-5">
            <div className="contact-info-card">
              <span className="contact-section-tag">CONTACT INFORMATION</span>

              <h2>Let's Start a Conversation</h2>

              <p className="contact-info-description">
                Whether you are a farmer looking for equipment, an equipment
                owner interested in listing machinery, or someone with a
                question about our platform, feel free to contact us.
              </p>

              <div className="contact-info-item">
                <div className="contact-info-icon">📧</div>
                <div>
                  <h5>Email Us</h5>
                  <p>Contact the FERS administrator</p>
                  <a href="mailto:your-email@example.com">
                    your-email@example.com
                  </a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">📞</div>
                <div>
                  <h5>Call Us</h5>
                  <p>For enquiries and assistance</p>
                  <span>+91 XXXXXXXXXX</span>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">📍</div>
                <div>
                  <h5>Our Location</h5>
                  <p>Farm Equipment Rental System</p>
                  <span>India</span>
                </div>
              </div>

              <div className="contact-social">
                <h5>We are here to help!</h5>
                <p>
                  Send us your queries and suggestions. Our team will get back
                  to you.
                </p>
              </div>

              <div className="contact-decoration">🌱</div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-7">
            <div className="contact-form-card">
              <span className="contact-section-tag">SEND US A MESSAGE</span>

              <h2>Contact Us</h2>

              <p className="contact-form-subtitle">
                Fill out the form below and share your query with us.
              </p>

              {success && (
                <div className="alert alert-success" role="alert">
                  {success}
                </div>
              )}

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="contact-name">
                      Full Name <span>*</span>
                    </label>

                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      className="form-control"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="contact-email">
                      Email Address <span>*</span>
                    </label>

                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="contact-phone">Phone Number</label>

                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      className="form-control"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="contact-subject">
                      Subject <span>*</span>
                    </label>

                    <select
                      id="contact-subject"
                      name="subject"
                      className="form-select"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="Equipment Enquiry">
                        Equipment Enquiry
                      </option>
                      <option value="Booking Related">Booking Related</option>
                      <option value="Account Related">Account Related</option>
                      <option value="Equipment Listing">
                        Equipment Listing
                      </option>
                      <option value="Payment Related">Payment Related</option>
                      <option value="Technical Support">
                        Technical Support
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label htmlFor="contact-message">
                      Your Message <span>*</span>
                    </label>

                    <textarea
                      id="contact-message"
                      name="message"
                      className="form-control"
                      rows="6"
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <button
                      type="submit"
                      className="contact-submit-btn"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Message"}
                      {!loading && <span> →</span>}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="contact-bottom">
        <div className="container text-center">
          <h2>Growing Together Through Technology</h2>
          <p>
            Connecting farmers and equipment owners for a more accessible
            agricultural rental experience.
          </p>
          <span>🌾 FERS — Farm Equipment Rental System</span>
        </div>
      </section>

      {/* CSS */}
      <style>{`
        .contact-page {
          background: #f7faf5;
          color: #2d3a30;
          overflow: hidden;
        }

        .contact-hero {
          padding: 75px 15px;
          background:
            linear-gradient(
              rgba(20, 75, 29, 0.83),
              rgba(20, 75, 29, 0.88)
            ),
            url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600")
            center/cover no-repeat;
        }

        .contact-badge {
          display: inline-block;
          color: white;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.35);
          border-radius: 30px;
          padding: 8px 20px;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .contact-hero h1 {
          color: white;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          margin-bottom: 15px;
        }

        .contact-hero p {
          color: #e8f5e9;
          font-size: 1.05rem;
          max-width: 650px;
          margin: auto;
          line-height: 1.8;
        }

        .contact-main {
          padding-top: 75px;
          padding-bottom: 75px;
        }

        .contact-info-card {
          height: 100%;
          min-height: 600px;
          position: relative;
          overflow: hidden;
          padding: 40px 32px;
          border-radius: 18px;
          color: white;
          background: linear-gradient(
            145deg,
            #1b5e20,
            #2e7d32,
            #388e3c
          );
          box-shadow: 0 10px 30px rgba(27,94,32,0.15);
        }

        .contact-section-tag {
          color: #65b96e;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .contact-info-card .contact-section-tag {
          color: #c8e6c9;
        }

        .contact-info-card h2,
        .contact-form-card h2 {
          font-size: clamp(1.7rem, 3vw, 2.2rem);
          font-weight: 800;
          margin-top: 12px;
          margin-bottom: 15px;
        }

        .contact-info-description {
          color: #e4f1e4;
          line-height: 1.8;
          margin-bottom: 35px;
        }

        .contact-info-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 28px;
          position: relative;
          z-index: 1;
        }

        .contact-info-icon {
          width: 48px;
          height: 48px;
          min-width: 48px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          background: rgba(255,255,255,0.16);
          font-size: 23px;
        }

        .contact-info-item h5 {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .contact-info-item p {
          color: #d5e8d5;
          font-size: 0.87rem;
          margin-bottom: 4px;
        }

        .contact-info-item a,
        .contact-info-item span {
          color: white;
          text-decoration: none;
          font-size: 0.95rem;
          overflow-wrap: anywhere;
        }

        .contact-info-item a:hover {
          text-decoration: underline;
        }

        .contact-social {
          position: relative;
          z-index: 1;
          border-top: 1px solid rgba(255,255,255,0.25);
          padding-top: 22px;
          margin-top: 35px;
        }

        .contact-social h5 {
          font-weight: 700;
        }

        .contact-social p {
          color: #d5e8d5;
          line-height: 1.7;
          margin-bottom: 0;
        }

        .contact-decoration {
          position: absolute;
          right: 15px;
          bottom: -35px;
          font-size: 140px;
          opacity: 0.10;
          transform: rotate(-20deg);
        }

        .contact-form-card {
          height: 100%;
          padding: 40px;
          border-radius: 18px;
          background: white;
          box-shadow: 0 8px 30px rgba(0,0,0,0.07);
        }

        .contact-form-card h2 {
          color: #245b2c;
        }

        .contact-form-subtitle {
          color: #718477;
          margin-bottom: 28px;
          line-height: 1.7;
        }

        .contact-form-card label {
          display: block;
          color: #354b39;
          font-weight: 650;
          font-size: 0.92rem;
          margin-bottom: 8px;
        }

        .contact-form-card label span {
          color: #dc3545;
        }

        .contact-form-card .form-control,
        .contact-form-card .form-select {
          min-height: 48px;
          border: 1px solid #dce7dc;
          border-radius: 9px;
          padding: 11px 14px;
          font-size: 0.92rem;
          box-shadow: none;
        }

        .contact-form-card textarea.form-control {
          min-height: 145px;
          resize: vertical;
        }

        .contact-form-card .form-control:focus,
        .contact-form-card .form-select:focus {
          border-color: #43a047;
          box-shadow: 0 0 0 3px rgba(67,160,71,0.12);
        }

        .contact-submit-btn {
          width: 100%;
          border: none;
          border-radius: 9px;
          padding: 14px 20px;
          color: white;
          background: linear-gradient(135deg, #1b5e20, #43a047);
          font-weight: 700;
          font-size: 1rem;
          transition: 0.25s;
        }

        .contact-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 7px 18px rgba(27,94,32,0.2);
        }

        .contact-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .contact-bottom {
          padding: 55px 15px;
          background: #eaf3e6;
        }

        .contact-bottom h2 {
          color: #245b2c;
          font-weight: 800;
          font-size: clamp(1.5rem, 4vw, 2.2rem);
          margin-bottom: 12px;
        }

        .contact-bottom p {
          color: #718477;
          line-height: 1.8;
          margin-bottom: 15px;
        }

        .contact-bottom span {
          color: #388e3c;
          font-weight: 750;
          letter-spacing: 1px;
        }

        @media (max-width: 991px) {
          .contact-info-card {
            min-height: auto;
          }
        }

        @media (max-width: 768px) {
          .contact-hero {
            padding: 60px 15px;
          }

          .contact-main {
            padding-top: 45px;
            padding-bottom: 45px;
          }

          .contact-info-card,
          .contact-form-card {
            padding: 28px 22px;
          }
        }

        @media (max-width: 480px) {
          .contact-hero h1 {
            font-size: 2rem;
          }

          .contact-hero p {
            font-size: 0.94rem;
          }

          .contact-info-card,
          .contact-form-card {
            padding: 24px 18px;
            border-radius: 14px;
          }

          .contact-info-item {
            gap: 12px;
          }

          .contact-info-icon {
            width: 42px;
            height: 42px;
            min-width: 42px;
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
