/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      try {
        return JSON.parse(storedCart);
      } catch (err) {
        console.error('Error parsing stored cart:', err);
        localStorage.removeItem('cartItems');
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, qty = 1) => {
    if (!product || !product._id) return;
    const addQuantity = Number(qty) > 0 ? Number(qty) : 1;

    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(
        item => String(item._id) === String(product._id)
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + addQuantity
        };
        return updated;
      } else {
        const newItem = {
          _id: product._id,
          name: product.name,
          price: Number(product.price),
          category: product.category || 'Grocery',
          image: product.imageUrl || product.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop',
          quantity: addQuantity
        };
        return [...prevItems, newItem];
      }
    });
  };

  const updateQuantity = (productId, newQty) => {
    const qty = Number(newQty);
    if (qty <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prev =>
        prev.map(item =>
          String(item._id) === String(productId) ? { ...item, quantity: qty } : item
        )
      );
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => String(item._id) !== String(productId)));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        totalAmount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
