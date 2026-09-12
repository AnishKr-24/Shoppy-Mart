import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, mockProducts } from '../data/mockProducts';
import { CartContext } from '../context/CartContext';
import '../styles/product-details.scss';

const ProductDetails = () => {
  const params = useParams();
  const activeId = params.id || params.productId || '1';
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      setLoading(true);
      setSelectedImage(0);
      setQuantity(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      try {
        let foundProduct = null;
        let allProds = [];

        // Try API fetch first
        try {
          const res = await fetch(`/api/products/${activeId}`);
          if (res.ok) {
            foundProduct = await res.json();
          }

          const resAll = await fetch('/api/products');
          if (resAll.ok) {
            const dataAll = await resAll.json();
            if (Array.isArray(dataAll) && dataAll.length > 0) {
              allProds = dataAll;
            }
          }
        } catch (apiErr) {
          console.warn('API fetch warning in ProductDetails:', apiErr);
        }

        if (!foundProduct) {
          foundProduct = getProductById(activeId);
        }

        if (allProds.length === 0) {
          allProds = mockProducts;
        }

        if (foundProduct) {
          setProduct(foundProduct);

          // Get related products: Prioritize same category, fill up with other grocery items up to 6 products
          const otherProducts = allProds.filter(
            p => String(p._id) !== String(foundProduct._id) && String(p._id) !== String(activeId)
          );

          const sameCategoryProducts = otherProducts.filter(
            p => p.category && p.category.toLowerCase() === foundProduct.category?.toLowerCase()
          );

          const fallbackProducts = otherProducts.filter(
            p => !p.category || p.category.toLowerCase() !== foundProduct.category?.toLowerCase()
          );

          const combinedRelated = [...sameCategoryProducts, ...fallbackProducts].slice(0, 6);
          setRelatedProducts(combinedRelated);
        }
      } catch (error) {
        console.error('Error loading product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndRelated();
  }, [activeId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert(`Added ${quantity} of ${product.name} to cart!`);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    const maxStock = product?.stock ?? 50;
    if (value > 0 && value <= maxStock) {
      setQuantity(value);
    }
  };

  const handleRelatedClick = (relId) => {
    navigate(`/product/${relId}`);
  };

  if (loading) {
    return <div className="loading-page">Loading grocery product details...</div>;
  }

  if (!product) {
    return (
      <div className="error-page">
        <h2>Product not found</h2>
        <button className="btn" onClick={() => navigate('/shop')}>Back to Shop</button>
      </div>
    );
  }

  const primaryImage = product.imageUrl || product.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop';
  const imageList = product.images && product.images.length > 0 ? product.images : [primaryImage];

  return (
    <div className="product-details-page">
      <div className="product-details-container">
        
        {/* Product Images */}
        <div className="product-images">
          <div className="main-image">
            <img src={imageList[selectedImage] || primaryImage} alt={product.name} />
          </div>
          {imageList.length > 1 && (
            <div className="image-thumbnails">
              {imageList.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.name} ${idx + 1}`}
                  className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
                  onClick={() => setSelectedImage(idx)}
                />
              ))}
            </div>
          )}
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
            <span className="rating-count">({product.numReviews || product.reviews || 50} reviews)</span>
          </div>

          {/* Price */}
          <div className="product-pricing">
            <div className="price">₹{product.price}</div>
            <div className="original-price">₹{product.originalPrice || Math.round(product.price * 1.2)}</div>
            <div className="discount">Special Indian Grocery Deal</div>
          </div>

          {/* Description */}
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {/* Specifications */}
          <div className="product-specs">
            <h3>Product Details & Specifications</h3>
            <ul>
              {product.specs ? (
                Object.entries(product.specs).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                  </li>
                ))
              ) : (
                <>
                  <li><strong>Quality:</strong> 100% Authentic Indian Brand</li>
                  <li><strong>Category:</strong> {product.category}</li>
                </>
              )}
              <li><strong>Stock Available:</strong> {product.stock ?? 50} units</li>
              <li><strong>Delivery:</strong> Free Express Delivery on orders above ₹499</li>
              <li><strong>Guarantee:</strong> 100% Fresh & Authentic Quality</li>
            </ul>
          </div>

          {/* Add to Cart Section */}
          <div className="product-actions">
            <div className="quantity-selector">
              <label>Quantity:</label>
              <select value={quantity} onChange={handleQuantityChange} disabled={(product.stock ?? 50) === 0}>
                {Array.from({ length: Math.min(product.stock ?? 10, 10) }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>

            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={(product.stock ?? 50) === 0}
            >
              {(product.stock ?? 50) > 0 ? `Add to Cart (₹${product.price * quantity})` : 'Out of Stock'}
            </button>

            <button className="wishlist-btn">♡ Add to Wishlist</button>
          </div>

          {/* Benefits */}
          <div className="product-benefits">
            {(product.benefits || [
              '✓ 100% Authentic Indian Grocery',
              '✓ Hygienically Packed & Sealed',
              '✓ Fast Doorstep Delivery'
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
          <h2>Related Grocery Items</h2>
          <div className="related-grid">
            {relatedProducts.map((prod) => {
              const relImg = prod.imageUrl || prod.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop';
              return (
                <div
                  key={prod._id}
                  className="related-card"
                  onClick={() => handleRelatedClick(prod._id)}
                >
                  <img src={relImg} alt={prod.name} />
                  <div className="related-info">
                    <h4>{prod.name}</h4>
                    <p className="category">{prod.category}</p>
                    <p className="price">₹{prod.price}</p>
                    <button className="quick-view">View Details</button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;