import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../data/mockProducts';
import '../styles/home.scss';

const Home = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const res = await fetch('/api/products');
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data) && data.length > 0) {
                        setProducts(data.slice(0, 6));
                        setLoading(false);
                        return;
                    }
                }
            } catch (err) {
                console.warn('API error in Home page, using mock products:', err);
            }
            setProducts(getAllProducts(6));
            setLoading(false);
        };

        fetchFeaturedProducts();
    }, []);

    const categories = [
        { name: 'Staples & Flour', icon: '🌾' },
        { name: 'Rice & Grains', icon: '🍚' },
        { name: 'Edible Oils & Ghee', icon: '🛢️' },
        { name: 'Spices & Masalas', icon: '🌶️' },
        { name: 'Dairy & Bakery', icon: '🥛' },
        { name: 'Beverages & Tea', icon: '☕' },
        { name: 'All Grocery', icon: '🛒' }
    ];

    const handleCategoryClick = (category) => {
        if (category.name === 'All Grocery') {
            navigate('/shop');
        } else {
            navigate(`/shop?category=${encodeURIComponent(category.name)}`);
        }
    };

    const handleAddToCart = (e, productId) => {
        e.stopPropagation();
        console.log('Added product to cart:', productId);
        alert('Added to cart!');
    };

    return (
        <div className="home-page">
            <div className="home-container">

                {/* Hero Section */}
                <section className="hero-section">
                    <h1>
                        Fresh Indian Grocery at <span className="highlight">Shoppy Mart</span>
                    </h1>
                    <p>Authentic kitchen staples, whole wheat atta, basmati rice, pure cow ghee & daily essentials delivered fast to your doorstep!</p>
                    <button className="cta-button" onClick={() => navigate('/shop')}>
                        Shop Fresh Grocery Now
                    </button>
                </section>

                {/* Categories Section */}
                <section className="categories-section">
                    <h2>Browse Grocery Categories</h2>
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
                    <h2>Featured Indian Grocery Products</h2>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '40px', color: '#f97316' }}>
                            Loading featured products...
                        </div>
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
                                            <img
                                                src={imgSrc}
                                                alt={product.name}
                                                className="product-image"
                                            />
                                            <div className="product-info">
                                                <h3 className="product-name">{product.name}</h3>
                                                <p className="product-category">{product.category}</p>
                                                <p className="product-description">
                                                    {product.description?.substring(0, 90)}...
                                                </p>
                                                <div className="product-footer">
                                                    <span className="product-price">₹{product.price}</span>
                                                    <button
                                                        className="add-to-cart-btn"
                                                        onClick={(e) => handleAddToCart(e, product._id)}
                                                    >
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
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
