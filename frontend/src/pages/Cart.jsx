import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../styles/cart.scss';

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalAmount
  } = useContext(CartContext);

  const calculateSubtotal = () => totalAmount;
  const shippingCost = totalAmount > 500 ? 0 : (totalAmount > 0 ? 50 : 0);
  const tax = Math.round(totalAmount * 0.05);
  const finalTotal = totalAmount + shippingCost + tax;

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <div className="empty-cart-content">
          <div className="empty-icon">🛒</div>
          <h2>Your Grocery Cart is Empty</h2>
          <p>Explore our fresh Indian grocery products and add items to your cart!</p>
          <button className="continue-shopping-btn" onClick={() => navigate('/shop')}>
            Start Grocery Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ margin: 0 }}>Shopping Cart</h1>
          <button
            onClick={clearCart}
            style={{
              background: 'rgba(239, 68, 68, 0.12)',
              color: '#ef4444',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              padding: '6px 14px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Clear Cart
          </button>
        </div>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            <div className="cart-header">
              <span className="col-product">Product</span>
              <span className="col-price">Price</span>
              <span className="col-quantity">Quantity</span>
              <span className="col-total">Total</span>
              <span className="col-action"></span>
            </div>

            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="col-product">
                  <img src={item.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop'} alt={item.name} />
                  <div className="product-info">
                    <h4>{item.name}</h4>
                    <p className="product-category">{item.category || 'Grocery'}</p>
                  </div>
                </div>
                <div className="col-price">₹{item.price}</div>
                <div className="col-quantity">
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item._id, parseInt(e.target.value) || 1)}
                    className="quantity-input"
                  />
                </div>
                <div className="col-total">₹{item.price * item.quantity}</div>
                <div className="col-action">
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item._id)}
                    title="Remove item"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <aside className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{calculateSubtotal().toLocaleString('en-IN')}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span className={shippingCost === 0 ? 'free' : ''}>
                {shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}
              </span>
            </div>

            {shippingCost > 0 && (
              <p className="shipping-info">
                Free shipping on orders above ₹500
              </p>
            )}

            <div className="summary-row">
              <span>Tax (5% GST)</span>
              <span>₹{tax}</span>
            </div>

            <div className="summary-row total">
              <span>Total Amount</span>
              <span>₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>

            <button className="checkout-btn" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>

            <button
              className="continue-shopping-btn"
              onClick={() => navigate('/shop')}
            >
              Continue Shopping
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;
