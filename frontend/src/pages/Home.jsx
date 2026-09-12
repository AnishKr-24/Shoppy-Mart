import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../data/mockProducts';
import { CartContext } from '../context/CartContext';
import '../styles/home.scss';

const Home = () => {
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    const [allProducts, setAllProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [activeTab, setActiveTab] = useState('All');
    const [loading, setLoading] = useState(true);

    const categoryTabs = [
        'All',
        'Staples & Flour',
        'Rice & Grains',
        'Edible Oils & Ghee',
        'Spices & Masalas',
        'Dairy & Bakery',
        'Beverages & Tea',
        'Snacks & Sweets',
        'Pulses & Dals'
    ];

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const res = await fetch('/api/products');
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data) && data.length > 0) {
                        setAllProducts(data);
                        setDisplayedProducts(data);
                        setLoading(false);
                        return;
                    }
                }
            } catch (err) {
                console.warn('API error in Home page, using mock products:', err);
            }
            const fallback = getAllProducts(24);
            setAllProducts(fallback);
            setDisplayedProducts(fallback);
            setLoading(false);
        };

        fetchFeaturedProducts();
    }, []);

    const handleTabChange = (categoryName) => {
        setActiveTab(categoryName);
        if (categoryName === 'All') {
            setDisplayedProducts(allProducts);
        } else {
            const filtered = allProducts.filter(
                p => p.category && p.category.toLowerCase() === categoryName.toLowerCase()
            );
            setDisplayedProducts(filtered);
        }
    };

    const categoriesList = [
        { name: 'Staples & Flour', icon: '🌾' },
        { name: 'Rice & Grains', icon: '🍚' },
        { name: 'Edible Oils & Ghee', icon: '🛢️' },
        { name: 'Spices & Masalas', icon: '🌶️' },
        { name: 'Dairy & Bakery', icon: '🥛' },
        { name: 'Beverages & Tea', icon: '☕' },
        { name: 'Snacks & Sweets', icon: '🍿' },
        { name: 'Pulses & Dals', icon: '🫘' }
    ];

    const handleCategoryCardClick = (category) => {
        handleTabChange(category.name);
        const featuredSection = document.getElementById('featured-products-section');
        if (featuredSection) {
            featuredSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleAddToCart = (e, product) => {
        e.stopPropagation();
        addToCart(product, 1);
        alert(`Added ${product.name} to cart!`);
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
                        Shop All Grocery Products
                    </button>
                </section>

                {/* Categories Section */}
                <section className="categories-section">
                    <h2>Browse Grocery Departments</h2>
                    <div className="categories-grid">
                        {categoriesList.map((category) => (
                            <div
                                key={category.name}
                                className="category-card"
                                onClick={() => handleCategoryCardClick(category)}
                            >
                                <div className="category-icon">{category.icon}</div>
                                <div className="category-name">{category.name}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Featured Products Section */}
                <section className="featured-section" id="featured-products-section">
                    <h2>Featured Indian Grocery Products</h2>
                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '25px', marginTop: '-25px' }}>
                        Showing products across all categories
                    </p>

                    {/* Category Filter Tabs */}
                    <div className="category-tabs" style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '10px',
                        justifyContent: 'center',
                        marginBottom: '35px'
                    }}>
                        {categoryTabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTabChange(tab)}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    border: activeTab === tab ? 'none' : '1px solid var(--border)',
                                    background: activeTab === tab ? 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' : 'var(--surface)',
                                    color: activeTab === tab ? '#fff' : 'var(--text)',
                                    fontWeight: '600',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.25s ease',
                                    boxShadow: activeTab === tab ? '0 4px 12px rgba(249, 115, 22, 0.3)' : 'none'
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '40px', color: '#f97316' }}>
                            Loading products from all categories...
                        </div>
                    ) : (
                        <div className="products-grid">
                            {displayedProducts.length > 0 ? (
                                displayedProducts.map((product) => {
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
                                                        onClick={(e) => handleAddToCart(e, product)}
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
                                    No products found for {activeTab} category.
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
