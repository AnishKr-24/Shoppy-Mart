import { Link, useLocation } from 'react-router-dom';

const AdminNav = () => {
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    { path: '/admin/dashboard', label: '📊 Dashboard' },
    { path: '/admin/products', label: '🛒 Products' },
    { path: '/admin/add-product', label: '➕ Add Product' },
    { path: '/admin/orders', label: '📦 Orders' },
    { path: '/admin/users', label: '👥 Users' }
  ];

  return (
    <nav className="admin-subnav" style={{
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap',
      marginBottom: '25px',
      padding: '12px 16px',
      background: 'var(--surface)',
      borderRadius: '12px',
      border: '1px solid var(--border)',
      alignItems: 'center'
    }}>
      {navItems.map((item) => {
        const isActive = path === item.path || (path === '/admin' && item.path === '/admin/dashboard');
        return (
          <Link
            key={item.path}
            to={item.path}
            style={{
              padding: '9px 18px',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '0.9rem',
              color: isActive ? '#fff' : 'var(--text-muted)',
              background: isActive ? 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' : 'var(--surface-elevated)',
              textDecoration: 'none',
              boxShadow: isActive ? '0 4px 12px rgba(249, 115, 22, 0.3)' : 'none',
              transition: 'all 0.25s ease'
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default AdminNav;
