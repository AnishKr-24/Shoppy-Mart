import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/admin-dashboard.scss';

const createProductForm = (product) => ({
  name: product.name || '',
  category: product.category || '',
  price: product.price ?? '',
  stock: product.stock ?? '',
  description: product.description || '',
  imageUrl: product.imageUrl || product.image || ''
});

const AdminProducts = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (loading || !user || user.role !== 'admin') {
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
  }, [user, loading]);

  const startEdit = (product) => {
    setError('');
    setSuccess('');
    setEditingId(product._id);
    setEditForm(createProductForm(product));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const saveProduct = async (productId) => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(editForm)
      });

      const updatedProduct = await res.json();
      if (!res.ok) {
        throw new Error(updatedProduct.message || 'Unable to update product');
      }

      setProducts(prev => prev.map(product => product._id === productId ? updatedProduct : product));
      setSuccess('Product updated successfully.');
      cancelEdit();
    } catch (err) {
      setError(err.message || 'Unable to update product');
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm('Delete this product?')) {
      return;
    }

    setError('');
    setSuccess('');

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` }
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Unable to delete product');
      }

      setProducts(prev => prev.filter(product => product._id !== productId));
      setSuccess('Product deleted successfully.');
    } catch (err) {
      setError(err.message || 'Unable to delete product');
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
          <p>Please log in with an admin account to manage products.</p>
          <button className="btn" onClick={() => navigate('/login')}>Go to Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header admin-page-header">
        <h2>Manage Grocery Products</h2>
        <button className="btn compact" onClick={() => navigate('/admin/add-product')}>+ Add Product</button>
      </div>

      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}

      {fetchLoading ? (
        <div className="loading-message">Loading products...</div>
      ) : (
        <div className="admin-table">
          {products.length === 0 ? (
            <div className="empty-state">No products found in database.</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => {
                  const imageSrc = product.imageUrl || product.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop';
                  return (
                    <tr key={product._id}>
                      <td data-label="Image">
                        {editingId === product._id ? (
                          <input 
                            name="imageUrl" 
                            value={editForm.imageUrl} 
                            onChange={handleEditChange} 
                            placeholder="Image URL"
                            style={{ width: '120px' }}
                          />
                        ) : (
                          <img 
                            src={imageSrc} 
                            alt={product.name} 
                            style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '6px' }}
                          />
                        )}
                      </td>
                      <td data-label="Name">
                        {editingId === product._id ? (
                          <input name="name" value={editForm.name} onChange={handleEditChange} />
                        ) : product.name}
                      </td>
                      <td data-label="Category">
                        {editingId === product._id ? (
                          <input name="category" value={editForm.category} onChange={handleEditChange} />
                        ) : product.category}
                      </td>
                      <td data-label="Price">
                        {editingId === product._id ? (
                          <input name="price" type="number" min="0" value={editForm.price} onChange={handleEditChange} />
                        ) : `₹${product.price}`}
                      </td>
                      <td data-label="Stock">
                        {editingId === product._id ? (
                          <input name="stock" type="number" min="0" value={editForm.stock} onChange={handleEditChange} />
                        ) : product.stock}
                      </td>
                      <td data-label="Actions">
                        {editingId === product._id ? (
                          <div className="table-actions">
                            <button className="action-btn save" onClick={() => saveProduct(product._id)} disabled={saving}>Save</button>
                            <button className="action-btn" onClick={cancelEdit} disabled={saving}>Cancel</button>
                          </div>
                        ) : (
                          <div className="table-actions">
                            <button className="action-btn" onClick={() => startEdit(product)}>Edit</button>
                            <button className="action-btn danger" onClick={() => deleteProduct(product._id)}>Delete</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
