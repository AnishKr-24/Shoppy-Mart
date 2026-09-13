import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import Logo from '../assets/Logo.png';
import "../styles/navbar.scss";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
    const { user, logout } = useContext(AuthContext);
    const { totalItemsCount } = useContext(CartContext) || { totalItemsCount: 0 };
    const isLoggedIn = !!user;

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const toggleTheme = () => {
        setTheme((currentTheme) => currentTheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="brand-link" onClick={closeMenu}>
                    <img src={Logo} alt="Shoppy_Mart Logo" className="navbar-logo" />
                    <span>Shoppy Mart</span>
                </Link>
            </div>

            <button
                className={`theme-toggle ${theme === 'light' ? 'light' : 'dark'}`}
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
                <span className="theme-toggle-icon">{theme === 'dark' ? '☀' : '☾'}</span>
            </button>

            <button
                className={`menu-toggle ${menuOpen ? "active" : ""}`}
                onClick={toggleMenu}
                type="button"
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
                <ul className="navbar-links">
                    <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                    <li><Link to="/shop" onClick={closeMenu}>Products</Link></li>
                    <li><Link to="/about" onClick={closeMenu}>About Us</Link></li>
                    <li><Link to="/contact" onClick={closeMenu}>Contact Us</Link></li>
                    <li>
                        <Link to="/cart" className="cart-link" onClick={closeMenu}>
                            Cart {totalItemsCount > 0 && <span className="cart-badge" style={{
                                background: '#f97316',
                                color: '#fff',
                                borderRadius: '10px',
                                padding: '2px 8px',
                                fontSize: '0.8rem',
                                marginLeft: '6px',
                                fontWeight: 'bold'
                            }}>{totalItemsCount}</span>}
                        </Link>
                    </li>
                </ul>

                <div className="navbar-actions">
                    {user?.role === 'admin' && (
                        <Link to="/admin/dashboard" className="btn-admin" onClick={closeMenu}>
                            Admin
                        </Link>
                    )}
                    {isLoggedIn ? (
                        <>
                            <Link to="/profile" className="profile-link" onClick={closeMenu}>
                                Profile
                            </Link>
                            <button className="btn-logout" onClick={() => { logout(); closeMenu(); }}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn-login" onClick={closeMenu}>
                                Login
                            </Link>
                            <Link to="/signup" className="btn-signup" onClick={closeMenu}>
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
