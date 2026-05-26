import React from 'react';
import '../styles/about.scss';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        
        {/* Hero Section */}
        <section className="about-hero">
          <h1>About Shoppy Mart</h1>
          <p>Your trusted online marketplace for quality products at unbeatable prices</p>
        </section>

        {/* Mission Section */}
        <section className="about-section mission-section">
          <div className="section-content">
            <h2>Our Mission</h2>
            <p>
              At Shoppy Mart, our mission is to revolutionize online shopping by providing customers with 
              access to a wide variety of high-quality products at competitive prices. We believe that 
              everyone deserves the convenience of shopping from home without compromising on quality or value.
            </p>
          </div>
          <div className="section-image">
            <img src="/placeholder.png" alt="Our Mission" />
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="why-choose-us">
          <h2>Why Choose Shoppy Mart?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Wide Selection</h3>
              <p>Browse through thousands of products across multiple categories</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Competitive Prices</h3>
              <p>Get the best deals and exclusive discounts on all products</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Quick and reliable shipping to your doorstep</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>Safe and encrypted transactions for your peace of mind</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💯</div>
              <h3>100% Authentic</h3>
              <p>All products are genuine and verified from authorized sellers</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Customer Support</h3>
              <p>24/7 dedicated support team to help you anytime</p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="about-section our-story">
          <h2>Our Story</h2>
          <div className="story-timeline">
            <div className="timeline-item">
              <div className="timeline-date">2024</div>
              <h4>Founded</h4>
              <p>Shoppy Mart was founded with a vision to transform online retail</p>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">2025</div>
              <h4>Growth</h4>
              <p>Expanded to multiple categories and reached 10,000+ customers</p>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">2026</div>
              <h4>Excellence</h4>
              <p>Became the go-to platform for quality shopping experiences</p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <h2>Our Team</h2>
          <p className="section-subtitle">Meet the passionate team behind Shoppy Mart</p>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">👨‍💼</div>
              <h4>Rahul Kumar</h4>
              <p className="member-role">Founder & CEO</p>
              <p className="member-bio">Visionary leader with 10+ years in e-commerce</p>
            </div>
            <div className="team-member">
              <div className="member-image">👩‍💼</div>
              <h4>Priya Singh</h4>
              <p className="member-role">Operations Manager</p>
              <p className="member-bio">Expert in logistics and supply chain management</p>
            </div>
            <div className="team-member">
              <div className="member-image">👨‍💻</div>
              <h4>Amit Patel</h4>
              <p className="member-role">Tech Lead</p>
              <p className="member-bio">Full-stack developer with passion for innovation</p>
            </div>
            <div className="team-member">
              <div className="member-image">👩‍💻</div>
              <h4>Sarah Johnson</h4>
              <p className="member-role">Customer Service Lead</p>
              <p className="member-bio">Dedicated to providing exceptional customer experiences</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
