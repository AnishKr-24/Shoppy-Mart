import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminNav from './AdminNav';
import Logo from '../assets/Logo.png';
import '../styles/admin-dashboard.scss';

const emptyStats = {
  totalOrders: 0,
  totalProducts: 0,
  totalUsers: 0,
  totalRevenue: 0
};

const AdminDashboard = () => {
  const { user, loading, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    if (loading || !user || user.role !== 'admin') {
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch('/api/analytics', {
          headers: { Authorization: `Bearer ${user.token}` }
        });

        if (!res.ok) {
          setStats(emptyStats);
          return;
        }

        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error(error);
        setStats(emptyStats);
      }
    };

    fetchStats();
  }, [user, loading]);

  const handleAdminQuickLogin = async () => {
    setLoggingIn(true);
    try {
      const res = await login('admin@shoppymart.com', 'admin123');
      if (!res.success) {
        alert(res.error || 'Admin login failed. Ensure database seeder was run.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoggingIn(false);
    }
  };

  if (loading || loggingIn) {
    return <div className="admin-dashboard"><div className="loading-message">Checking admin access...</div></div>;
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="admin-dashboard">
        <div className="admin-access-card">
          <h2>Admin Login Required</h2>
          <p>You need an admin account to access the administrative dashboard and controls.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn" onClick={handleAdminQuickLogin}>
              Log in as Admin (Demo)
            </button>
            <button className="btn secondary" onClick={() => navigate('/login')}>
              Custom Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalRevenue = Number(stats?.totalRevenue || 0);

  return (
    <div className="admin-dashboard">
      <AdminNav />

      <div className="dashboard-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={Logo} alt="Shoppy Mart Logo" className="header-logo" />
          <h2>Admin Dashboard</h2>
        </div>
      </div>

      <p className="dashboard-welcome">Welcome back, <span className="welcome-name">{user.name}</span></p>

      {stats ? (
        <div className="stats-grid">
          <div className="stat-card">
            <h4 className="stat-label">Total Orders</h4>
            <div className="stat-number">{stats.totalOrders}</div>
          </div>
          <div className="stat-card">
            <h4 className="stat-label">Total Products</h4>
            <div className="stat-number">{stats.totalProducts}</div>
          </div>
          <div className="stat-card">
            <h4 className="stat-label">Total Users</h4>
            <div className="stat-number">{stats.totalUsers}</div>
          </div>
          <div className="stat-card">
            <h4 className="stat-label">Total Revenue</h4>
            <div className="stat-number">₹{totalRevenue.toFixed(2)}</div>
          </div>
        </div>
      ) : (
        <div className="loading-message">Loading metrics...</div>
      )}

      <div className="admin-controls">
        <h3>Administrative Controls</h3>

        <div className="controls-buttons">
          <button className="btn" onClick={() => navigate('/admin/add-product')}>+ Add Product</button>
          <button className="btn secondary" onClick={() => navigate('/admin/products')}>Manage Products</button>
          <button className="btn secondary" onClick={() => navigate('/admin/orders')}>Manage Orders</button>
          <button className="btn secondary" onClick={() => navigate('/admin/users')}>Users Directory</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
