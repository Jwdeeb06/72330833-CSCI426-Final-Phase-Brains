import React from "react";
import "../styles/About.css";
import logo from "../assets/logo.png";
import campus from "../assets/poster.png"; // or another image

const About = () => {
  return (
    <div className="about-page">
      {/* ===== Hero Section ===== */}
      <section className="about-hero">
        <img src={campus} alt="About Poster" className="about-hero-bg" />
        <div className="about-hero-overlay">
          <h1>About Brains Studies Institute</h1>
          <p>
            Empowering innovation, creativity, and technology-driven learning.
          </p>
        </div>
      </section>

      {/* ===== Main Content ===== */}
      <section className="about-content">
        <div className="about-intro">
          <img src={logo} alt="Brains Logo" className="about-logo" />
          <div className="about-text">
            <h2>Who We Are</h2>
            <p>
              Brains Studies Institute (BSI) is a modern educational hub that
              connects students with real-world skills in technology, science,
              and design. Our programs combine hands-on practice, mentorship,
              and creativity to help students become innovators and leaders in
              their fields.
            </p>
          </div>
        </div>

        {/* ===== Why Choose Us ===== */}
        <div className="about-features">
          <h2>Why Choose BSI?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🎓 Expert Instructors</h3>
              <p>
                Our courses are led by professionals with years of real-world
                experience.
              </p>
            </div>
            <div className="feature-card">
              <h3>💻 Hands-On Learning</h3>
              <p>
                Every program emphasizes practice through projects and
                interactive sessions.
              </p>
            </div>
            <div className="feature-card">
              <h3>🌐 Industry-Driven Curriculum</h3>
              <p>
                Courses are designed to match current market and technology
                trends.
              </p>
            </div>
          </div>
        </div>

        {/* ===== Vision & Mission ===== */}
        <div className="about-vision">
          <h2>Our Vision & Mission</h2>
          <p>
            Our vision is to inspire and educate the next generation of creators
            and thinkers. We aim to bridge the gap between academic knowledge
            and practical experience, ensuring our students are ready to shape
            the digital future.
          </p>
        </div>

        {/* ===== Call To Action ===== */}
        <div className="about-cta">
          <h2>Join Us Today</h2>
          <p>
            Ready to start your learning journey? Explore our courses and become
            part of the BSI community.
          </p>
          <a href="/menu" className="btn-join">
            Explore Courses
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
