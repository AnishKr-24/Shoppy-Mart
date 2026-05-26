import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/order-confirmation.scss';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  
  // Sample order data - would come from backend
  const orderData = {
    orderNumber: '#ORD20260526001',
    date: new Date().toLocaleDateString(),
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    items: [
      // { name: 'Product 1', quantity: 2, price: 999 }
    ],
    subtotal: 1998,
    shipping: 0,
    tax: 100,
    total: 2098,
    shippingAddress: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 9876543210',
      address: '123 Main St, City, State 12345'
    }
  };

  return (
    <div className="order-confirmation-page">
      <div className="confirmation-container">
        
        {/* Success Header */}
        <div className="success-header">
          <div className="success-icon">✓</div>
          <h1>Order Confirmed!</h1>
          <p>Thank you for your purchase</p>
        </div>

        {/* Confirmation Content */}
        <div className="confirmation-content">
          
          {/* Order Details */}
          <section className="order-details">
            <div className="detail-row">
              <span className="label">Order Number:</span>
              <span className="value">{orderData.orderNumber}</span>
            </div>
            <div className="detail-row">
              <span className="label">Order Date:</span>
              <span className="value">{orderData.date}</span>
            </div>
            <div className="detail-row">
              <span className="label">Estimated Delivery:</span>
              <span className="value">{orderData.estimatedDelivery}</span>
            </div>
            <div className="detail-row">
              <span className="label">Status:</span>
              <span className="value status confirmed">Order Confirmed</span>
            </div>
          </section>

          <div className="confirmation-grid">
            
            {/* Order Items */}
            <section className="order-items">
              <h2>Order Summary</h2>
              {orderData.items.length > 0 ? (
                <div className="items-list">
                  {orderData.items.map((item, idx) => (
                    <div key={idx} className="item-row">
                      <span className="item-name">{item.name}</span>
                      <span className="item-qty">x {item.quantity}</span>
                      <span className="item-price">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-items">No items in this order</p>
              )}
              
              <div className="order-total">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>₹{orderData.subtotal.toLocaleString()}</span>
                </div>
                <div className="total-row">
                  <span>Shipping</span>
                  <span className={orderData.shipping === 0 ? 'free' : ''}>
                    {orderData.shipping === 0 ? 'FREE' : `₹${orderData.shipping}`}
                  </span>
                </div>
                <div className="total-row">
                  <span>Tax</span>
                  <span>₹{orderData.tax}</span>
                </div>
                <div className="total-row grand-total">
                  <span>Total</span>
                  <span>₹{orderData.total.toLocaleString()}</span>
                </div>
              </div>
            </section>

            {/* Shipping Details */}
            <section className="shipping-details">
              <h2>Shipping Address</h2>
              <div className="address-block">
                <p><strong>{orderData.shippingAddress.name}</strong></p>
                <p>{orderData.shippingAddress.address}</p>
                <p>📧 {orderData.shippingAddress.email}</p>
                <p>📞 {orderData.shippingAddress.phone}</p>
              </div>

              <div className="next-steps">
                <h3>What's Next?</h3>
                <ul>
                  <li>✓ Order confirmed</li>
                  <li>⏳ Processing (24 hours)</li>
                  <li>📦 Shipped</li>
                  <li>🚚 Out for delivery</li>
                  <li>✓ Delivered</li>
                </ul>
              </div>
            </section>
          </div>

          {/* Action Buttons */}
          <div className="confirmation-actions">
            <button className="btn-primary" onClick={() => navigate('/orders')}>
              Track Your Order
            </button>
            <button className="btn-secondary" onClick={() => navigate('/shop')}>
              Continue Shopping
            </button>
          </div>

          {/* Email Notification */}
          <div className="notification-info">
            <p>
              📧 A confirmation email has been sent to <strong>{orderData.shippingAddress.email}</strong>
            </p>
            <p>
              Track your shipment with the tracking number sent to your email and SMS.
            </p>
          </div>
        </div>

        {/* Support Section */}
        <section className="support-section">
          <h2>Questions? We're Here to Help</h2>
          <div className="support-options">
            <div className="support-option">
              <span className="icon">💬</span>
              <h4>Live Chat</h4>
              <p>Chat with our team</p>
            </div>
            <div className="support-option">
              <span className="icon">📧</span>
              <h4>Email Support</h4>
              <p>support@shoppymart.com</p>
            </div>
            <div className="support-option">
              <span className="icon">📞</span>
              <h4>Call Us</h4>
              <p>+91 6200402982</p>
            </div>
            <div className="support-option">
              <span className="icon">❓</span>
              <h4>FAQ</h4>
              <p>Check our help center</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OrderConfirmation;
