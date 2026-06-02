import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts, mockCategories } from '../data/mockProducts';
import '../styles/home.scss';

const Home = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching featured products
        setTimeout(() => {
            try {
                const data = getAllProducts(6);
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        }, 300);
    }, []);

    const categories = [
        { name: 'Electronics', icon: '💻' },
        // { name: 'Audio', icon: '🎵' },
        { name: 'Accessories', icon: '🎒' },
        { name: 'Home & Garden', icon: '🏠' },
        { name: 'Sports', icon: '⚽' },
        { name: 'All Products', icon: '🛍️' }
    ];

    const handleCategoryClick = (category) => {
        if (category.name === 'All Products') {
            navigate('/shop');
        } else {
            navigate(`/shop?category=${category.name.toLowerCase()}`);
        }
    };

    const handleAddToCart = (productId) => {
        // Add to cart logic here
        console.log('Added product to cart:', productId);
    };

    return (
        <div className="home-page">
            <div className="home-container">

                {/* Hero Section */}
                <section className="hero-section">
                    <h1>
                        Welcome to <span className="highlight">Shoppy Mart</span>
                    </h1>
                    <p>Discover amazing products at unbeatable prices. Shop now and save big!</p>
                    <button className="cta-button" onClick={() => navigate('/shop')}>
                        Shop All Products
                    </button>
                </section>

                {/* Categories Section */}
                <section className="categories-section">
                    <h2>Browse Categories</h2>
                    <div className="categories-grid">
                        {categories.map((category) => (
                            <div
                                key={category.name}
                                className="category-card"
                                onClick={() => handleCategoryClick(category)}
                            >
                                <div className="category-icon">{category.icon}</div>
                                <div className="category-name">{category.name}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Featured Products Section */}
                <section className="featured-section">
                    <h2>Featured Products</h2>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '40px', color: '#f97316' }}>
                            Loading featured products...
                        </div>
                    ) : (
                        <div className="products-grid">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <div key={product._id} className="product-card">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="product-image"
                                        />
                                        <div className="product-info">
                                            <h3 className="product-name">{product.name}</h3>
                                            <p className="product-category">{product.category}</p>
                                            <p className="product-description">
                                                {product.description?.substring(0, 100)}...
                                            </p>
                                            <div className="product-footer">
                                                <span className="product-price">₹{product.price}</span>
                                                <button
                                                    className="add-to-cart-btn"
                                                    onClick={() => handleAddToCart(product._id)}
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#a1a1aa' }}>
                                    No products found
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Home;
