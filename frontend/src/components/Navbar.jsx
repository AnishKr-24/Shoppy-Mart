import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.scss";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Change based on your auth state

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">
            
            <div className="navbar-brand">
                <Link to="/" className="brand-link">
                    <img src="./src/assets/Logo.png" alt="Shoppy_Mart Logo" className="navbar-logo" />
                    <span>Shoppy Mart</span>
                </Link>
            </div>

            <button className={`menu-toggle ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </button>

            <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
                <li><Link to="/shop">Shop</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/cart" className="cart-link" style={{ marginRight: '20px' }}>🛒 Cart</Link></li>
            </ul>

            <div className="navbar-actions">
                
                
                {isLoggedIn ? (
                    <>
                        <Link to="/profile" className="profile-link">
                            👤 Profile
                        </Link>
                        <button className="btn-logout" onClick={() => setIsLoggedIn(false)}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn-login">
                            Login
                        </Link>
                        <Link to="/signup" className="btn-signup">
                            Sign Up
                        </Link>
                    </>
                )}
            </div>

        </nav>
    )
}

export default Navbar;