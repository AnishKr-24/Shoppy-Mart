import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { mockProducts } from '../data/mockProducts';
import '../styles/shop.scss';

const categories = [
  'all',
  'staples & flour',
  'rice & grains',
  'edible oils & ghee',
  'spices & masalas',
  'dairy & bakery',
  'beverages & tea',
  'snacks & sweets',
  'pulses & dals'
];

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' }
];

const Shop = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'all',
    priceRange: [0, 5000],
    sortBy: 'newest'
  });

  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true);
      try {
        let rawProducts = [];
        try {
          const res = await fetch('/api/products');
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
              rawProducts = data;
            }
          }
        } catch (apiErr) {
          console.warn('API product fetch error, using mock data:', apiErr);
        }

        if (rawProducts.length === 0) {
          rawProducts = mockProducts;
        }

        let filtered = [...rawProducts];

        // Filter by category
        if (filters.category && filters.category.toLowerCase() !== 'all') {
          filtered = filtered.filter(p =>
            p.category && p.category.toLowerCase() === filters.category.toLowerCase()
          );
        }

        // Filter by price range
        filtered = filtered.filter(p =>
          p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
        );

        // Sort
        if (filters.sortBy === 'price-low') {
          filtered.sort((a, b) => a.price - b.price);
        } else if (filters.sortBy === 'price-high') {
          filtered.sort((a, b) => b.price - a.price);
        } else if (filters.sortBy === 'popular') {
          filtered.sort((a, b) => (b.rating || 5) - (a.rating || 5));
        }

        setProducts(filtered);
      } catch (error) {
        console.error('Error in shop products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsData();
  }, [filters]);

  const handleAddToCart = (e, productId) => {
    e.stopPropagation();
    console.log('Added to cart:', productId);
    alert('Item added to cart!');
  };

  return (
    <div className="shop-page">
      <div className="shop-container">
        
        {/* Shop Header */}
        <div className="shop-header">
          <h1>Shop Daily Indian Grocery</h1>
          <p>Explore authentic Indian kitchen staples, fresh dairy, spices, edible oils & pantry essentials</p>
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
                      checked={filters.category.toLowerCase() === cat}
                      onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    />
                    <span>{cat.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h3>Max Price Range</h3>
              <div className="price-range">
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="50"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters({ ...filters, priceRange: [0, parseInt(e.target.value)] })}
                  className="price-slider"
                />
                <div className="price-display">
                  ₹0 - ₹{filters.priceRange[1].toLocaleString('en-IN')}
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

            <button className="reset-filters" onClick={() => setFilters({ category: 'all', priceRange: [0, 5000], sortBy: 'newest' })}>
              Reset Filters
            </button>
          </aside>

          {/* Products Grid */}
          <main className="products-section">
            {loading ? (
              <div className="loading">Loading grocery products...</div>
            ) : (
              <div className="products-grid">
                {products.length > 0 ? (
                  products.map((product) => {
                    const imgSrc = product.imageUrl || product.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop';
                    return (
                      <div
                        key={product._id}
                        className="product-card"
                        onClick={() => navigate(`/product/${product._id}`)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="product-image-wrapper">
                          <img
                            src={imgSrc}
                            alt={product.name}
                            className="product-image"
                          />
                          <div className="product-badge">{(product.stock ?? 10) > 0 ? 'In Stock' : 'Out of Stock'}</div>
                        </div>
                        <div className="product-info">
                          <h3 className="product-name">{product.name}</h3>
                          <p className="product-category">{product.category}</p>
                          <div className="product-rating">
                            <span className="stars">★★★★★</span>
                            <span className="rating-count">({product.numReviews || product.reviews || 45} reviews)</span>
                          </div>
                          <div className="product-footer">
                            <span className="product-price">₹{product.price}</span>
                            <button
                              className="add-to-cart-btn"
                              onClick={(e) => handleAddToCart(e, product._id)}
                              disabled={(product.stock ?? 10) === 0}
                            >
                              {(product.stock ?? 10) > 0 ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="no-products">
                    <p>No grocery products found matching your filters.</p>
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
