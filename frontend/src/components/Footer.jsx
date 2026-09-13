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
                        Your trusted Indian grocery store for quality fresh staples, spices, rice, ghee, and daily essentials at unbeatable prices.
                    </p>
                    <div className="social-links">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                            <FaFacebook />
                        </a>

                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
                            <FaTwitter />
                        </a>

                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                            <FaInstagram />
                        </a>

                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/shop">Shop Grocery</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Categories */}
                <div className="footer-section">
                    <h4>Grocery Categories</h4>
                    <ul className="footer-links">
                        <li><Link to="/shop">All Products</Link></li>
                        <li><Link to="/shop?category=Staples%20%26%20Flour">Staples & Flour</Link></li>
                        <li><Link to="/shop?category=Rice%20%26%20Grains">Rice & Grains</Link></li>
                        <li><Link to="/shop?category=Edible%20Oils%20%26%20Ghee">Oils & Ghee</Link></li>
                        <li><Link to="/shop?category=Spices%20%26%20Masalas">Spices & Masalas</Link></li>
                    </ul>
                </div>

                {/* Support & Help */}
                <div className="footer-section">
                    <h4>Support & Legal</h4>
                    <ul className="footer-links">
                        <li><Link to="/faq">FAQ</Link></li>
                        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                        <li><Link to="/terms">Terms & Conditions</Link></li>
                        <li><Link to="/shipping-info">Shipping Info</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <ul className="contact-info">
                        <li>📧 Email: <a href="mailto:support@shoppymart.com">support@shoppymart.com</a></li>
                        <li>📞 Phone: <a href="tel:+916200402982">+91 6200402982</a></li>
                        <li>📍 Address: Bihar Sharif, Bihar 803101</li>
                        <li>🕐 Hours: Mon-Sun 8AM - 9PM IST</li>
                    </ul>
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="newsletter-section">
                <h4>Subscribe to Fresh Grocery Offers</h4>
                <p>Get exclusive discounts, festival deals, and weekly grocery updates</p>
                <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to Shoppy Mart!'); }}>
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="newsletter-input"
                        required
                    />
                    <button type="submit" className="newsletter-btn">Subscribe</button>
                </form>
            </div>

            {/* Copyright */}
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Shoppy Mart. All rights reserved.</p>
                <div className="payment-methods">
                    <span>We Accept: </span>
                    <span className="payment-icon">💳 UPI / GPay</span>
                    <span className="payment-icon">🏦 Net Banking</span>
                    <span className="payment-icon">📱 Credit / Debit Cards</span>
                    <span className="payment-icon">💵 Cash on Delivery</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
