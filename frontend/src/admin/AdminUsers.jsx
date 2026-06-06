import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/admin-dashboard.scss';

const AdminUsers = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
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
  }, [user, loading, navigate]);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Users Directory</h2>
      </div>

      {(loading || fetchLoading) ? (
        <div className="loading-message">Loading users...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="stats-grid admin-table">
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
                </tr>
              </thead>
              <tbody>
                {users.map(userItem => (
                  <tr key={userItem._id}>
                    <td>{userItem.name}</td>
                    <td>{userItem.email}</td>
                    <td>{userItem.role}</td>
                    <td>{userItem.verified ? 'Yes' : 'No'}</td>
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
