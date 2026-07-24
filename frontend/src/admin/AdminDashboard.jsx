import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import '../styles/admin-dashboard.scss';

const emptyStats = {
  totalOrders: 0,
  totalProducts: 0,
  totalUsers: 0,
  totalRevenue: 0
};

const AdminDashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (loading || !user || user.role !== 'admin') {
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch('/api/analytics', {
          headers: { Authorization: `Bearer ${user.token}` }
        });

        if (res.status === 401 || res.status === 403) {
          navigate('/login');
          return;
        }

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
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="admin-dashboard"><div className="loading-message">Checking admin access...</div></div>;
  }

  if (!user) {
    return (
      <div className="admin-dashboard">
        <div className="admin-access-card">
          <h2>Admin Login Required</h2>
          <p>Please sign in with an admin account to open the dashboard.</p>
          <button className="btn" onClick={() => navigate('/login')}>Go to Login</button>
        </div>
      </div>
    );
  }

  if (user.role !== 'admin') {
    return (
      <div className="admin-dashboard">
        <div className="admin-access-card">
          <h2>Admin Access Only</h2>
          <p>Your current account is a regular user account. Log in with an account whose role is set to admin.</p>
          <button className="btn" onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>
    );
  }

  const totalRevenue = Number(stats?.totalRevenue || 0);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <img src={Logo} alt="Shoppy Mart Logo" className="header-logo" />
        <h2>Admin Dashboard</h2>
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
            <div className="stat-number">Rs. {totalRevenue.toFixed(2)}</div>
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
