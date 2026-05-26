import React, { useState } from 'react';
import '../styles/faq.scss';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqCategories = {
    'Orders & Shipping': [
      {
        q: 'How do I place an order?',
        a: 'Browse our products, add items to your cart, and proceed to checkout. Enter your shipping and payment details to complete your order.'
      },
      {
        q: 'What are the shipping options?',
        a: 'We offer standard shipping (5-7 business days) and express shipping (2-3 business days). Free shipping is available on orders above ₹500.'
      },
      {
        q: 'How can I track my order?',
        a: 'You\'ll receive a tracking number via email once your order ships. You can track it from your account dashboard or click the tracking link.'
      },
      {
        q: 'Do you ship internationally?',
        a: 'Currently, we only ship within India. We\'re expanding our services soon!'
      }
    ],
    'Products': [
      {
        q: 'Are all products authentic?',
        a: 'Yes! All products on Shoppy Mart are 100% authentic and sourced from authorized sellers.'
      },
      {
        q: 'How do you ensure product quality?',
        a: 'We carefully vet all sellers and conduct quality checks on products before they reach you.'
      },
      {
        q: 'Can I see product reviews?',
        a: 'Yes, you can find detailed customer reviews on each product page. Read real feedback from verified buyers.'
      },
      {
        q: 'How do I report a defective product?',
        a: 'Contact our support team within 7 days of delivery with photos. We\'ll arrange a replacement or refund.'
      }
    ],
    'Returns & Refunds': [
      {
        q: 'What is your return policy?',
        a: 'We offer a 30-day money-back guarantee. If you\'re not satisfied, return the product for a full refund.'
      },
      {
        q: 'How do I return a product?',
        a: 'Log in to your account, go to your orders, and click "Return". Print the label and drop off at any pickup point.'
      },
      {
        q: 'How long does refund processing take?',
        a: 'Refunds are processed within 5-7 business days after we receive your return.'
      },
      {
        q: 'What if the product is damaged during delivery?',
        a: 'Report the damage immediately with photos. We\'ll replace it or refund you completely.'
      }
    ],
    'Payment': [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept credit/debit cards, UPI, net banking, and cash on delivery for select locations.'
      },
      {
        q: 'Is my payment information secure?',
        a: 'Yes! We use 256-bit SSL encryption and comply with international security standards.'
      },
      {
        q: 'Can I use multiple payment methods?',
        a: 'You can use one payment method per order. However, you can split payments using our installment options.'
      },
      {
        q: 'Do you offer payment plans?',
        a: 'Yes! For orders above ₹5000, we offer 3-month EMI options with selected cards.'
      }
    ],
    'Account': [
      {
        q: 'How do I create an account?',
        a: 'Click "Sign Up" and enter your email, name, and password. That\'s it!'
      },
      {
        q: 'Can I change my email address?',
        a: 'Yes, you can update your email from your account settings. We\'ll send a verification link.'
      },
      {
        q: 'How do I reset my password?',
        a: 'Click "Forgot Password" on the login page and follow the instructions sent to your email.'
      },
      {
        q: 'Is my personal information safe?',
        a: 'Your data is encrypted and protected. We never share your information with third parties.'
      }
    ]
  };

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-container">
        
        {/* Page Header */}
        <div className="faq-header">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about shopping at Shoppy Mart</p>
        </div>

        {/* Search Bar */}
        <div className="faq-search">
          <input
            type="text"
            placeholder="Search FAQs..."
            className="search-input"
          />
        </div>

        {/* FAQ Categories */}
        <div className="faq-categories">
          {Object.entries(faqCategories).map(([category, faqs], categoryIndex) => (
            <section key={categoryIndex} className="faq-category">
              <h2>{category}</h2>
              <div className="faq-list">
                {faqs.map((faq, faqIndex) => (
                  <div
                    key={faqIndex}
                    className={`faq-item ${activeIndex === `${categoryIndex}-${faqIndex}` ? 'active' : ''}`}
                    onClick={() => toggleFAQ(`${categoryIndex}-${faqIndex}`)}
                  >
                    <div className="faq-question">
                      <span className="q-icon">Q</span>
                      <h3>{faq.q}</h3>
                      <span className={`toggle-icon ${activeIndex === `${categoryIndex}-${faqIndex}` ? 'open' : ''}`}>
                        ▼
                      </span>
                    </div>
                    {activeIndex === `${categoryIndex}-${faqIndex}` && (
                      <div className="faq-answer">
                        <span className="a-icon">A</span>
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Contact CTA */}
        <section className="faq-cta">
          <h2>Still have questions?</h2>
          <p>Can't find the answer you're looking for? We're here to help!</p>
          <a href="/contact" className="btn-primary">Contact Us</a>
        </section>
      </div>
    </div>
  );
};

export default FAQ;
