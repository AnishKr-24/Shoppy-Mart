import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/admin-dashboard.scss';

const AdminUsers = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (loading || !user || user.role !== 'admin') {
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/auth/users', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        if (!res.ok) {
          throw new Error('Failed to load users');
        }
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message || 'Unable to fetch users');
      } finally {
        setFetchLoading(false);
      }
    };

    fetchUsers();
  }, [user, loading]);

  const updateUser = async (userId, payload) => {
    setUpdatingId(userId);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`/api/auth/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(payload)
      });

      const updatedUser = await res.json();
      if (!res.ok) {
        throw new Error(updatedUser.message || 'Unable to update user');
      }

      setUsers(prev => prev.map(userItem => userItem._id === userId ? updatedUser : userItem));
      setSuccess('User updated successfully.');
    } catch (err) {
      setError(err.message || 'Unable to update user');
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('Delete this user?')) {
      return;
    }

    setUpdatingId(userId);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`/api/auth/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` }
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Unable to delete user');
      }

      setUsers(prev => prev.filter(userItem => userItem._id !== userId));
      setSuccess('User deleted successfully.');
    } catch (err) {
      setError(err.message || 'Unable to delete user');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return <div className="admin-dashboard"><div className="loading-message">Checking admin access...</div></div>;
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="admin-dashboard">
        <div className="admin-access-card">
          <h2>Admin Access Only</h2>
          <p>Please log in with an admin account to view users.</p>
          <button className="btn" onClick={() => navigate('/login')}>Go to Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Users Directory</h2>
      </div>

      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}

      {fetchLoading ? (
        <div className="loading-message">Loading users...</div>
      ) : (
        <div className="admin-table">
          {users.length === 0 ? (
            <div className="empty-state">No users found.</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Verified</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(userItem => (
                  <tr key={userItem._id}>
                    <td data-label="Name">{userItem.name}</td>
                    <td data-label="Email">{userItem.email}</td>
                    <td data-label="Role">
                      <select
                        value={userItem.role}
                        disabled={updatingId === userItem._id}
                        onChange={(e) => updateUser(userItem._id, { role: e.target.value })}
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                    <td data-label="Verified">
                      <label className="inline-toggle">
                        <input
                          type="checkbox"
                          checked={!!userItem.verified}
                          disabled={updatingId === userItem._id}
                          onChange={(e) => updateUser(userItem._id, { verified: e.target.checked })}
                        />
                        <span>{userItem.verified ? 'Yes' : 'No'}</span>
                      </label>
                    </td>
                    <td data-label="Actions">
                      <div className="table-actions">
                        <button
                          className="action-btn danger"
                          disabled={updatingId === userItem._id || userItem._id === user._id}
                          onClick={() => deleteUser(userItem._id)}
                        >
                          Delete
                        </button>
                      </div>
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

export default AdminUsers;
