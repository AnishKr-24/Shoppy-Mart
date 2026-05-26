import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/checkout.scss';

const Checkout = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    // Payment
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStepClick = (step) => {
    if (step < activeStep) {
      setActiveStep(step);
    }
  };

  const handleNextStep = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const handlePlaceOrder = async () => {
    console.log('Placing order with:', formData);
    // API call would go here
    navigate('/order-confirmation');
  };

  // Sample order data
  const orderItems = [
    // { _id: 1, name: 'Product 1', price: 999, quantity: 2 }
  ];
  const subtotal = 1998;
  const shipping = 0;
  const tax = 100;
  const total = 2098;

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        
        {/* Progress Steps */}
        <div className="checkout-steps">
          <div
            className={`step ${activeStep >= 1 ? 'active' : ''} ${activeStep > 1 ? 'completed' : ''}`}
            onClick={() => handleStepClick(1)}
          >
            <div className="step-number">1</div>
            <div className="step-label">Shipping</div>
          </div>
          <div className="step-line"></div>
          
          <div
            className={`step ${activeStep >= 2 ? 'active' : ''} ${activeStep > 2 ? 'completed' : ''}`}
            onClick={() => handleStepClick(2)}
          >
            <div className="step-number">2</div>
            <div className="step-label">Payment</div>
          </div>
          <div className="step-line"></div>
          
          <div
            className={`step ${activeStep >= 3 ? 'active' : ''}`}
            onClick={() => handleStepClick(3)}
          >
            <div className="step-number">3</div>
            <div className="step-label">Review</div>
          </div>
        </div>

        <div className="checkout-content">
          
          {/* Main Content */}
          <div className="checkout-main">
            
            {/* Step 1: Shipping */}
            {activeStep === 1 && (
              <div className="checkout-step">
                <h2>Shipping Address</h2>
                <form className="shipping-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Street address"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Zip Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </form>
              </div>
            )}

            {/* Step 2: Payment */}
            {activeStep === 2 && (
              <div className="checkout-step">
                <h2>Payment Method</h2>
                <div className="payment-methods">
                  <label className="payment-option">
                    <input type="radio" name="payment" defaultChecked />
                    <span>Credit/Debit Card</span>
                  </label>
                  <label className="payment-option">
                    <input type="radio" name="payment" />
                    <span>UPI</span>
                  </label>
                  <label className="payment-option">
                    <input type="radio" name="payment" />
                    <span>Net Banking</span>
                  </label>
                  <label className="payment-option">
                    <input type="radio" name="payment" />
                    <span>Cash on Delivery</span>
                  </label>
                </div>

                <form className="payment-form">
                  <div className="form-group">
                    <label>Cardholder Name *</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Card Number *</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date *</label>
                      <input
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV *</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Step 3: Review */}
            {activeStep === 3 && (
              <div className="checkout-step">
                <h2>Review Your Order</h2>
                
                <div className="review-section">
                  <h3>Shipping Address</h3>
                  <p>
                    {formData.firstName} {formData.lastName}<br />
                    {formData.address}<br />
                    {formData.city}, {formData.state} {formData.zipCode}<br />
                    {formData.email} | {formData.phone}
                  </p>
                </div>

                <div className="review-section">
                  <h3>Order Items</h3>
                  {orderItems.length > 0 ? (
                    <ul className="order-items-list">
                      {orderItems.map(item => (
                        <li key={item._id}>
                          {item.name} × {item.quantity} = ₹{item.price * item.quantity}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No items in order</p>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="step-navigation">
              <button
                className="btn-secondary"
                onClick={handlePreviousStep}
                disabled={activeStep === 1}
              >
                ← Back
              </button>
              {activeStep < 3 ? (
                <button className="btn-primary" onClick={handleNextStep}>
                  Next →
                </button>
              ) : (
                <button className="btn-primary" onClick={handlePlaceOrder}>
                  Place Order
                </button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <aside className="order-summary">
            <h2>Order Summary</h2>
            
            <div className="order-items">
              {orderItems.length > 0 ? (
                orderItems.map(item => (
                  <div key={item._id} className="order-item">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))
              ) : (
                <p className="no-items">No items selected</p>
              )}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span className={shipping === 0 ? 'free' : ''}>
                {shipping === 0 ? 'FREE' : `₹${shipping}`}
              </span>
            </div>

            <div className="summary-row">
              <span>Tax</span>
              <span>₹{tax}</span>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>

            <div className="security-badge">
              <span>🔒 Secure Checkout</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
