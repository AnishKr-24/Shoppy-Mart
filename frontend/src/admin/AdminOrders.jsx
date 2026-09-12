import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AdminNav from './AdminNav';
import '../styles/admin-dashboard.scss';

const AdminOrders = () => {
  const { user, loading, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

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

  useEffect(() => {
    if (loading || !user || user.role !== 'admin') {
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
  }, [user, loading]);

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

  if (loading || loggingIn) {
    return <div className="admin-dashboard"><div className="loading-message">Checking admin access...</div></div>;
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="admin-dashboard">
        <div className="admin-access-card">
          <h2>Admin Access Required</h2>
          <p>Please log in with an admin account to manage orders.</p>
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

  return (
    <div className="admin-dashboard">
      <AdminNav />
      <div className="dashboard-header">
        <h2>Manage Orders</h2>
      </div>

      {fetchLoading ? (
        <div className="loading-message">Loading orders...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="admin-table">
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
                    <td data-label="Order ID">{order._id}</td>
                    <td data-label="User">{order.user?.name || order.user?.email || 'Unknown'}</td>
                    <td data-label="Total">Rs. {order.totalAmount}</td>
                    <td data-label="Status">{order.status}</td>
                    <td data-label="Action">
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
