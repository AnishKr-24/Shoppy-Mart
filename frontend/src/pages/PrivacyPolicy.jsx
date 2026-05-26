import React from 'react';
import '../styles/legal.scss';

const PrivacyPolicy = () => {
  return (
    <div className="legal-page privacy-policy">
      <div className="legal-container">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last updated: May 26, 2026</p>

        <section className="legal-section">
          <h2>1. Introduction</h2>
          <p>
            Welcome to Shoppy Mart ("Company," "we," "our," or "us"). Shoppy Mart is committed to protecting your 
            privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
            you visit our website and use our services.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Information We Collect</h2>
          <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
          <ul>
            <li><strong>Personal Data:</strong> Name, email address, phone number, shipping address, billing address, payment information</li>
            <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
            <li><strong>Usage Data:</strong> Pages viewed, links clicked, time spent on pages, search queries</li>
            <li><strong>Cookies and Tracking:</strong> We use cookies to track user preferences and behavior</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect in the following ways:</p>
          <ul>
            <li>To process transactions and send related information</li>
            <li>To send promotional communications (with your consent)</li>
            <li>To improve our website and services</li>
            <li>To respond to your inquiries and customer service requests</li>
            <li>To detect and prevent fraudulent transactions</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. Disclosure of Your Information</h2>
          <p>
            We may share your information with third parties in certain situations:
          </p>
          <ul>
            <li><strong>Service Providers:</strong> Payment processors, shipping partners, email service providers</li>
            <li><strong>Legal Requirements:</strong> When required by law or legal process</li>
            <li><strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale</li>
            <li><strong>Your Consent:</strong> With your explicit permission</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>5. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to protect your personal information. 
            However, no method of transmission over the Internet is 100% secure. While we strive to use commercially 
            acceptable means to protect your personal information, we cannot guarantee its absolute security.
          </p>
        </section>

        <section className="legal-section">
          <h2>6. Your Privacy Rights</h2>
          <p>Depending on your location, you may have the following rights:</p>
          <ul>
            <li>Right to access your personal data</li>
            <li>Right to correct inaccurate data</li>
            <li>Right to delete your data</li>
            <li>Right to opt-out of marketing communications</li>
            <li>Right to data portability</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>7. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your browsing experience. You can set your 
            browser to refuse cookies or alert you when cookies are being sent.
          </p>
        </section>

        <section className="legal-section">
          <h2>8. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices 
            of other sites. We encourage you to review their privacy policies.
          </p>
        </section>

        <section className="legal-section">
          <h2>9. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
            new Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section className="legal-section">
          <h2>10. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at:<br />
            Email: privacy@shoppymart.com<br />
            Phone: +91 6200402982<br />
            Address: Bihar Sharif, Bihar 803101, India
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
