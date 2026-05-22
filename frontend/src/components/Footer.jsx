import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.scss";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Brand Section */}
                <div className="footer-section brand-section">
                    <h3 className="footer-brand">Shoppy Mart</h3>
                    <p className="brand-description">
                        Your one-stop shop for quality products at unbeatable prices.
                    </p>
                    <div className="social-links">
                        <a href="https://facebook.com" className="social-icon">
                            <FaFacebook />
                        </a>

                        <a href="https://twitter.com" className="social-icon">
                            <FaTwitter />
                        </a>

                        <a href="https://instagram.com" className="social-icon">
                            <FaInstagram />
                        </a>

                        <a href="https://linkedin.com" className="social-icon">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                {/* <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div> */}

                {/* Categories */}
                <div className="footer-section">
                    <h4>Categories</h4>
                    <ul className="footer-links">
                        <li><Link to="/products">All Products</Link></li>
                        <li><Link to="/products?category=electronics">Electronics</Link></li>
                        <li><Link to="/products?category=fashion">Fashion</Link></li>
                        <li><Link to="/products?category=home">Home & Garden</Link></li>
                    </ul>
                </div>

                {/* Support & Help */}
                <div className="footer-section">
                    <h4>Support</h4>
                    <ul className="footer-links">
                        <li><Link to="/faq">FAQ</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="/terms">Terms & Conditions</Link></li>
                        <li><Link to="/shipping">Shipping Info</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <ul className="contact-info">
                        <li>📧 Email: <a href="mailto:support@shoppymart.com">support@shoppymart.com</a></li>
                        <li>📞 Phone: <a href="tel:+91 6200402982">+91 6200402982</a></li>
                        <li>📍 Address: Bihar Sharif, 803101</li>
                        <li>🕐 Hours: Mon-Sun 9AM-6PM EST</li>
                    </ul>
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="newsletter-section">
                <h4>Subscribe to Our Newsletter</h4>
                <p>Get exclusive deals and updates delivered to your inbox</p>
                <form className="newsletter-form">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="newsletter-input"
                        required
                    />
                    <button type="submit" className="newsletter-btn">Subscribe</button>
                </form>
            </div>

            {/* Copyright */}
            <div className="footer-bottom">
                <p>&copy; 2026 Shoppy Mart. All rights reserved.</p>
                <div className="payment-methods">
                    <span>We Accept: </span>
                    <span className="payment-icon">💳 Credit Card</span>
                    <span className="payment-icon">🏦 Debit Card</span>
                    <span className="payment-icon">📱 Digital Wallet</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
