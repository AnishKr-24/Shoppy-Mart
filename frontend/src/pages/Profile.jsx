import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.scss';

const Profile = () => {
  const { user, logout } = useContext(AuthContext) || {};
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const [orders] = useState([
    // { _id: 1, orderNumber: '#ORD001', date: '2026-05-20', total: 2099, status: 'Delivered' }
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        },
        body: JSON.stringify(profileData)
      });

      if (res.ok) {
        setEditMode(false);
        alert('Profile updated successfully');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleLogout = () => {
    if (logout) logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="profile-page not-logged-in">
        <div className="profile-container">
          <p>Please log in to view your profile</p>
          <button onClick={() => navigate('/login')} className="btn-primary">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-placeholder">{user.name?.charAt(0).toUpperCase()}</div>
          </div>
          <div className="profile-info">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="profile-tabs">
          <button
            className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
          <button
            className={`tab ${activeTab === 'addresses' ? 'active' : ''}`}
            onClick={() => setActiveTab('addresses')}
          >
            Addresses
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="tab-content profile-tab">
            {!editMode ? (
              <div className="profile-view">
                <div className="info-row">
                  <span className="label">Full Name</span>
                  <span className="value">{profileData.name}</span>
                </div>
                <div className="info-row">
                  <span className="label">Email</span>
                  <span className="value">{profileData.email}</span>
                </div>
                <div className="info-row">
                  <span className="label">Phone</span>
                  <span className="value">{profileData.phone || 'Not provided'}</span>
                </div>
                <button className="btn-secondary" onClick={() => setEditMode(true)}>
                  Edit Profile
                </button>
              </div>
            ) : (
              <form className="profile-edit">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => setEditMode(false)}>
                    Cancel
                  </button>
                  <button type="button" className="btn-primary" onClick={handleSave}>
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="tab-content orders-tab">
            {orders.length > 0 ? (
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id}>
                      <td>{order.orderNumber}</td>
                      <td>{new Date(order.date).toLocaleDateString()}</td>
                      <td>₹{order.total}</td>
                      <td><span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></td>
                      <td><button className="btn-small">View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <p>No orders yet</p>
                <button className="btn-primary" onClick={() => navigate('/shop')}>
                  Start Shopping
                </button>
              </div>
            )}
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === 'addresses' && (
          <div className="tab-content addresses-tab">
            <div className="addresses-list">
              <div className="address-card">
                <h3>Default Address</h3>
                <p>{profileData.address || 'No address added'}</p>
                <button className="btn-small">Edit</button>
              </div>
            </div>
            <button className="btn-secondary">+ Add New Address</button>
          </div>
        )}

        <div className="profile-footer">
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
