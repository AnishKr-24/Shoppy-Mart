import React from 'react';
import '../styles/legal.scss';

const ShippingInfo = () => {
  return (
    <div className="legal-page shipping-info">
      <div className="legal-container">
        <h1>Shipping Information</h1>
        <p className="subtitle">Fast, Reliable, and Affordable Delivery</p>

        <section className="legal-section">
          <h2>Shipping Methods</h2>
          <div className="shipping-methods">
            <div className="method">
              <h3>📦 Standard Shipping</h3>
              <ul>
                <li><strong>Delivery Time:</strong> 5-7 business days</li>
                <li><strong>Cost:</strong> ₹50 (Free on orders above ₹500)</li>
                <li><strong>Coverage:</strong> All locations in India</li>
              </ul>
            </div>
            <div className="method">
              <h3>🚀 Express Shipping</h3>
              <ul>
                <li><strong>Delivery Time:</strong> 2-3 business days</li>
                <li><strong>Cost:</strong> ₹150 (Free on orders above ₹2000)</li>
                <li><strong>Coverage:</strong> Metro cities only</li>
              </ul>
            </div>
            <div className="method">
              <h3>⚡ Same-Day Delivery</h3>
              <ul>
                <li><strong>Delivery Time:</strong> Same day (orders before 2 PM)</li>
                <li><strong>Cost:</strong> ₹300</li>
                <li><strong>Coverage:</strong> Selected areas only</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="legal-section">
          <h2>Processing & Dispatch</h2>
          <p>
            Orders are typically processed within 24 hours of confirmation. During peak seasons, processing may take 
            up to 2-3 business days. You will receive a confirmation email with tracking details once your order is dispatched.
          </p>
          <ul>
            <li>Orders placed before 2 PM are dispatched the same day</li>
            <li>Orders placed after 2 PM are dispatched the next business day</li>
            <li>Processing excludes weekends and public holidays</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Tracking Your Order</h2>
          <p>
            Once your order is dispatched, you'll receive a tracking number via email and SMS. You can track your 
            package in real-time using:
          </p>
          <ul>
            <li>Our website's order tracking page</li>
            <li>The tracking link sent to your email</li>
            <li>The carrier's website directly</li>
            <li>Your Shoppy Mart account dashboard</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Shipping Rates by Region</h2>
          <table className="shipping-table">
            <thead>
              <tr>
                <th>Region</th>
                <th>Standard Shipping</th>
                <th>Express Shipping</th>
                <th>Delivery Days</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Metro Cities (Delhi, Mumbai, Bangalore)</td>
                <td>₹50</td>
                <td>₹150</td>
                <td>2-3 days</td>
              </tr>
              <tr>
                <td>Tier-1 Cities</td>
                <td>₹50</td>
                <td>₹200</td>
                <td>3-4 days</td>
              </tr>
              <tr>
                <td>Tier-2 Cities</td>
                <td>₹50</td>
                <td>₹250</td>
                <td>4-5 days</td>
              </tr>
              <tr>
                <td>Tier-3 Cities & Rural Areas</td>
                <td>₹50</td>
                <td>₹300</td>
                <td>5-7 days</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="legal-section">
          <h2>International Shipping</h2>
          <p>
            Currently, Shoppy Mart delivers only within India. We are working to expand our services to international 
            locations soon. Stay tuned for updates!
          </p>
        </section>

        <section className="legal-section">
          <h2>Damaged or Lost Packages</h2>
          <p>
            If your package arrives damaged or is lost, please contact us immediately with photos and your order details. 
            We will:
          </p>
          <ul>
            <li>File a claim with the carrier</li>
            <li>Arrange a replacement or refund</li>
            <li>Provide compensation if applicable</li>
          </ul>
          <p>Please report issues within 7 days of delivery for faster resolution.</p>
        </section>

        <section className="legal-section">
          <h2>Undeliverable Packages</h2>
          <p>
            If the delivery address is incorrect or the package cannot be delivered:
          </p>
          <ul>
            <li>We will attempt redelivery up to 2 times</li>
            <li>You will be notified for address correction</li>
            <li>If undelivered, the package will be returned and a refund will be processed</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Special Handling Instructions</h2>
          <p>
            If your order requires special handling, please add a note during checkout or contact our support team. 
            We will ensure:
          </p>
          <ul>
            <li>Fragile items are handled with care</li>
            <li>Perishable items are delivered quickly</li>
            <li>High-value items are insured</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Shipping FAQs</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h4>How do I know when my order will arrive?</h4>
              <p>
                After dispatch, you'll get a tracking number. The estimated delivery date is usually shown at checkout 
                and in your confirmation email.
              </p>
            </div>
            <div className="faq-item">
              <h4>Can I change the delivery address after ordering?</h4>
              <p>
                Yes, if the order hasn't been dispatched yet. Contact support immediately with your new address. 
                Changes after dispatch may incur additional costs.
              </p>
            </div>
            <div className="faq-item">
              <h4>Is there a charge for failed delivery?</h4>
              <p>
                No, we absorb the cost of re-delivery attempts. However, incorrect addresses may lead to extra charges 
                after 2 failed attempts.
              </p>
            </div>
            <div className="faq-item">
              <h4>Do you ship on weekends and holidays?</h4>
              <p>
                Standard delivery days exclude weekends and public holidays. Express delivery is available 7 days a week 
                in metro cities.
              </p>
            </div>
          </div>
        </section>

        <section className="legal-section contact-section">
          <h2>Need Help with Shipping?</h2>
          <p>
            Contact our shipping support team:<br />
            Email: shipping@shoppymart.com<br />
            Phone: +91 6200402982<br />
            Hours: Mon-Sun, 9 AM - 6 PM IST
          </p>
        </section>
      </div>
    </div>
  );
};

export default ShippingInfo;
