import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/product-details.scss';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();
        if (res.ok) {
          setProduct(data);
          // Fetch related products
          fetchRelatedProducts(data.category);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedProducts = async (category) => {
      try {
        const res = await fetch(`/api/products?category=${category}&limit=4`);
        const data = await res.json();
        if (res.ok) {
          setRelatedProducts(data.filter(p => p._id !== productId));
        }
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  if (loading) {
    return <div className="loading-page">Loading product details...</div>;
  }

  if (!product) {
    return <div className="error-page">Product not found</div>;
  }

  return (
    <div className="product-details-page">
      <div className="product-details-container">
        
        {/* Product Images */}
        <div className="product-images">
          <div className="main-image">
            <img src={product.image || '/placeholder.png'} alt={product.name} />
          </div>
          <div className="image-thumbnails">
            {[product.image, product.image, product.image].map((img, idx) => (
              <img
                key={idx}
                src={img || '/placeholder.png'}
                alt={`${product.name} ${idx + 1}`}
                className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
                onClick={() => setSelectedImage(idx)}
              />
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="product-details-info">
          <div className="product-header">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-category">{product.category}</p>
          </div>

          {/* Rating */}
          <div className="product-rating">
            <div className="stars">★★★★★</div>
            <span className="rating-count">(124 reviews)</span>
          </div>

          {/* Price */}
          <div className="product-pricing">
            <div className="price">₹{product.price}</div>
            <div className="original-price">₹{Math.round(product.price * 1.2)}</div>
            <div className="discount">20% OFF</div>
          </div>

          {/* Description */}
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {/* Specifications */}
          <div className="product-specs">
            <h3>Specifications</h3>
            <ul>
              <li><strong>Category:</strong> {product.category}</li>
              <li><strong>Stock Available:</strong> {product.stock} units</li>
              <li><strong>Shipping:</strong> Free shipping on orders above ₹500</li>
              <li><strong>Returns:</strong> 30-day money-back guarantee</li>
            </ul>
          </div>

          {/* Add to Cart Section */}
          <div className="product-actions">
            <div className="quantity-selector">
              <label>Quantity:</label>
              <select value={quantity} onChange={handleQuantityChange} disabled={product.stock === 0}>
                {Array.from({ length: Math.min(product.stock, 10) }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>

            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? `Add to Cart (₹${product.price * quantity})` : 'Out of Stock'}
            </button>

            <button className="wishlist-btn">♡ Add to Wishlist</button>
          </div>

          {/* Benefits */}
          <div className="product-benefits">
            <div className="benefit">
              <span className="icon">✓</span>
              <p>100% Authentic Products</p>
            </div>
            <div className="benefit">
              <span className="icon">✓</span>
              <p>Secure Checkout</p>
            </div>
            <div className="benefit">
              <span className="icon">✓</span>
              <p>Fast & Free Delivery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related-products">
          <h2>Related Products</h2>
          <div className="related-grid">
            {relatedProducts.slice(0, 4).map((prod) => (
              <div
                key={prod._id}
                className="related-card"
                onClick={() => navigate(`/product/${prod._id}`)}
              >
                <img src={prod.image || '/placeholder.png'} alt={prod.name} />
                <h4>{prod.name}</h4>
                <p className="price">₹{prod.price}</p>
                <button className="quick-view">Quick View</button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
