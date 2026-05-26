import React, { useState } from 'react';
import '../styles/contact.scss';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Simulate API call
            setTimeout(() => {
                setSubmitted(true);
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setSubmitted(false), 5000);
            }, 500);

            // Uncomment when API is ready
            /*
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setSubmitted(true);
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setSubmitted(false), 5000);
            }
            */
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-page">
            <div className="contact-container">

                {/* Page Header */}
                <div className="contact-header">
                    <h1>Contact Us</h1>
                    <p>We'd love to hear from you. Get in touch with us today!</p>
                </div>

                <div className="contact-content">

                    {/* Contact Form */}
                    <div className="contact-form-section">
                        <h2>Send us a Message</h2>
                        {submitted && (
                            <div className="success-message">
                                Thank you for contacting us! We'll get back to you soon.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="How can we help?"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Your message..."
                                    rows="6"
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="btn-primary" disabled={loading}>
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <aside className="contact-info-section">
                        <h2>Contact Information</h2>

                        <div className="contact-info-group">
                            <h3>📧 Email</h3>
                            <a href="mailto:support@shoppymart.com">support@shoppymart.com</a>
                            <a href="mailto:info@shoppymart.com">info@shoppymart.com</a>
                        </div>

                        <div className="contact-info-group">
                            <h3>📞 Phone</h3>
                            <a href="tel:+916200402982">+91 6200402982</a>
                            <p className="availability">Mon-Sun: 9 AM - 6 PM IST</p>
                        </div>

                        <div className="contact-info-group">
                            <h3>📍 Address</h3>
                            <p>
                                Shoppy Mart Headquarters<br />
                                Bihar Sharif, Bihar 803101<br />
                                India
                            </p>
                        </div>

                        <div className="contact-info-group">
                            <h3>🌐 Follow Us</h3>
                            <div className="social-links">
                                <a href="https://facebook.com" className="social-link">Facebook</a>
                                <a href="https://twitter.com" className="social-link">Twitter</a>
                                <a href="https://instagram.com" className="social-link">Instagram</a>
                                <a href="https://linkedin.com" className="social-link">LinkedIn</a>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* FAQ Section */}
                <section className="faq-preview">
                    <h2>Frequently Asked Questions</h2>
                    <div className="faq-items">
                        <div className="faq-item">
                            <h4>What are your business hours?</h4>
                            <p>We operate 24/7 online. Our support team is available Mon-Sun from 9 AM to 6 PM IST.</p>
                        </div>
                        <div className="faq-item">
                            <h4>How can I track my order?</h4>
                            <p>You'll receive a tracking link via email once your order ships. You can also track from your account.</p>
                        </div>
                        <div className="faq-item">
                            <h4>What's your return policy?</h4>
                            <p>We offer a 30-day money-back guarantee on all products. No questions asked!</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Contact;
