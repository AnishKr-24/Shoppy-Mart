import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, getRelatedProducts } from '../data/mockProducts';
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
    // Simulate API call with mock data
    setTimeout(() => {
      try {
        const productData = getProductById(productId || '1');
        if (productData) {
          setProduct(productData);
          const related = getRelatedProducts(productData.category, productId, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    }, 300);
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
  };

  if (!product) {
    return <div className="error-page">Product not found</div>;
  };

  return (
    <div className="product-details-page">
      <div className="product-details-container">
        
        {/* Product Images */}
        <div className="product-images">
          <div className="main-image">
            <img src={product.images?.[selectedImage] || product.image} alt={product.name} />
          </div>
          <div className="image-thumbnails">
            {(product.images || [product.image, product.image, product.image]).map((img, idx) => (
              <img
                key={idx}
                src={img}
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
            <div className="stars">{'★'.repeat(Math.round(product.rating || 5))}{'☆'.repeat(5 - Math.round(product.rating || 5))}</div>
            <span className="rating-count">({product.reviews} reviews)</span>
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
              {product.specs && Object.entries(product.specs).map(([key, value]) => (
                <li key={key}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                </li>
              ))}
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
            {(product.benefits || [
              '✓ 100% Authentic Products',
              '✓ Secure Checkout',
              '✓ Fast & Free Delivery'
            ]).map((benefit, idx) => (
              <div key={idx} className="benefit">
                <span className="icon">{benefit.split(' ')[0]}</span>
                <p>{benefit.substring(2)}</p>
              </div>
            ))}
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