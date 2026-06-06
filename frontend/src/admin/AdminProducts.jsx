import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/admin-dashboard.scss';

const AdminProducts = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
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

    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) {
          throw new Error('Failed to load products');
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message || 'Unable to fetch products');
      } finally {
        setFetchLoading(false);
      }
    };

    fetchProducts();
  }, [user, loading, navigate]);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Manage Products</h2>
      </div>

      {(loading || fetchLoading) ? (
        <div className="loading-message">Loading products...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="stats-grid admin-table">
          {products.length === 0 ? (
            <div className="empty-state">No products found.</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>₹{product.price}</td>
                    <td>{product.stock}</td>
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

export default AdminProducts;
