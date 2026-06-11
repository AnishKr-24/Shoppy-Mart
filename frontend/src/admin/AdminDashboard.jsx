import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/admin-dashboard.scss';

const AdminDashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      navigate('/');
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch('/api/analytics', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setStats(data);
        } else {
          if (res.status === 401) {
            navigate('/login');
          }
          setStats({ totalOrders: 0, totalProducts: 0, totalUsers: 0, totalRevenue: 0 });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchStats();
  }, [user, loading, navigate]);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <img src="/ShopNestLogo.png" alt="Logo" className="header-logo" />
        <h2>Admin Dashboard</h2>
      </div>   
      <p className="dashboard-welcome">Welcome back, <span className="welcome-name">{user?.name}</span></p>

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
            <div className="stat-number">₹{stats.totalRevenue.toFixed(2)}</div>
          </div>
        </div>
      ) : (
        <div className="loading-message">Loading metrics...</div>
      )}

      <div className="admin-controls">
        <h3>Administrative Controls</h3>

        <div className="controls-buttons">
          <button className="btn" onClick={() => navigate('/admin/add-product')}>+ Add Product</button>
          <button className="btn secondary" onClick={() => navigate('/admin/products')}>📦 Manage Products</button>
          <button className="btn secondary" onClick={() => navigate('/admin/orders')}>🚚 Manage Orders</button>
          <button className="btn secondary" onClick={() => navigate('/admin/users')}>👥 Users Directory</button>
        </div>

      </div>
      
    </div>
  );
};

export default AdminDashboard;