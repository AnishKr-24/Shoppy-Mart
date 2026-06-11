import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/admin-dashboard.scss';

const AdminOrders = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      navigate('/');
      return;
    }

    if (!user || user.role !== 'admin') {
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        if (!res.ok) {
          throw new Error('Failed to load orders');
        }
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message || 'Unable to fetch orders');
      } finally {
        setFetchLoading(false);
      }
    };

    fetchOrders();
  }, [user, loading, navigate]);

  const updateStatus = async (orderId, status) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ status })
      });
      if (!res.ok) {
        throw new Error('Unable to update order status');
      }
      const updated = await res.json();
      setOrders(prev => prev.map(order => order._id === updated.order._id ? updated.order : order));
    } catch (err) {
      setError(err.message || 'Failed to update order');
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Manage Orders</h2>
      </div>

      {(loading || fetchLoading) ? (
        <div className="loading-message">Loading orders...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="stats-grid admin-table">
          {orders.length === 0 ? (
            <div className="empty-state">No orders found.</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user?.name || order.user?.email || 'Unknown'}</td>
                    <td>₹{order.totalAmount}</td>
                    <td>{order.status}</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                      >
                        <option value="pending">pending</option>
                        <option value="shipped">shipped</option>
                        <option value="delivered">delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
