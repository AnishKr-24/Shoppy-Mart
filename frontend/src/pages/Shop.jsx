import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../styles/shop.scss';

const Shop = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'all',
    priceRange: [0, 50000],
    sortBy: 'newest'
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = new URLSearchParams();
        if (filters.category !== 'all') query.append('category', filters.category);
        query.append('sort', filters.sortBy);

        const res = await fetch(`/api/products?${query.toString()}`);
        const data = await res.json();
        if (res.ok) {
          setProducts(data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [filters]);

  const categories = ['all', 'electronics', 'fashion', 'home', 'sports', 'books', 'toys'];
  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' }
  ];

  const handleAddToCart = (productId) => {
    console.log('Added to cart:', productId);
  };

  return (
    <div className="shop-page">
      <div className="shop-container">
        
        {/* Shop Header */}
        <div className="shop-header">
          <h1>Shop All Products</h1>
          <p>Explore our wide range of high-quality products</p>
        </div>

        <div className="shop-content">
          
          {/* Sidebar Filters */}
          <aside className="filters-sidebar">
            <div className="filter-group">
              <h3>Categories</h3>
              <div className="filter-options">
                {categories.map((cat) => (
                  <label key={cat} className="filter-option">
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={filters.category === cat}
                      onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    />
                    <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h3>Price Range</h3>
              <div className="price-range">
                <input
                  type="range"
                  min="0"
                  max="50000"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters({ ...filters, priceRange: [0, parseInt(e.target.value)] })}
                  className="price-slider"
                />
                <div className="price-display">
                  ₹0 - ₹{filters.priceRange[1].toLocaleString()}
                </div>
              </div>
            </div>

            <div className="filter-group">
              <h3>Sort By</h3>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                className="sort-select"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <button className="reset-filters" onClick={() => setFilters({ category: 'all', priceRange: [0, 50000], sortBy: 'newest' })}>
              Reset Filters
            </button>
          </aside>

          {/* Products Grid */}
          <main className="products-section">
            {loading ? (
              <div className="loading">Loading products...</div>
            ) : (
              <div className="products-grid">
                {products.length > 0 ? (
                  products.map((product) => (
                    <div key={product._id} className="product-card">
                      <div className="product-image-wrapper">
                        <img
                          src={product.image || '/placeholder.png'}
                          alt={product.name}
                          className="product-image"
                        />
                        <div className="product-badge">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</div>
                      </div>
                      <div className="product-info">
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-category">{product.category}</p>
                        <div className="product-rating">
                          <span className="stars">★★★★★</span>
                          <span className="rating-count">(24 reviews)</span>
                        </div>
                        <div className="product-footer">
                          <span className="product-price">₹{product.price}</span>
                          <button
                            className="add-to-cart-btn"
                            onClick={() => handleAddToCart(product._id)}
                            disabled={product.stock === 0}
                          >
                            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-products">
                    <p>No products found matching your filters.</p>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;
