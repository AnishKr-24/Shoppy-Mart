import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/cart.scss';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    // Sample cart items - replace with context/redux
    // { _id: 1, name: 'Product 1', price: 999, quantity: 2, image: '/placeholder.png' }
  ]);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(productId);
    } else {
      setCartItems(cartItems.map(item =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (productId) => {
    setCartItems(cartItems.filter(item => item._id !== productId));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateSubtotal = () => calculateTotal();
  const shippingCost = calculateTotal() > 500 ? 0 : 50;
  const tax = Math.round(calculateTotal() * 0.05);
  const finalTotal = calculateTotal() + shippingCost + tax;

  if (cartItems.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <div className="empty-cart-content">
          <div className="empty-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Add some items to your cart to get started!</p>
          <button className="continue-shopping-btn" onClick={() => navigate('/shop')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>Shopping Cart</h1>

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
                  <img src={item.image || '/placeholder.png'} alt={item.name} />
                  <div className="product-info">
                    <h4>{item.name}</h4>
                    <p className="product-category">{item.category || 'Uncategorized'}</p>
                  </div>
                </div>
                <div className="col-price">₹{item.price}</div>
                <div className="col-quantity">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                    className="quantity-input"
                  />
                </div>
                <div className="col-total">₹{item.price * item.quantity}</div>
                <div className="col-action">
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item._id)}
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
              <span>₹{calculateSubtotal().toLocaleString()}</span>
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
              <span>Tax (5%)</span>
              <span>₹{tax}</span>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <span>₹{finalTotal.toLocaleString()}</span>
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

            <div className="promo-code">
              <input type="text" placeholder="Enter promo code" />
              <button>Apply</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;
