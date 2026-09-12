import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/add-product.scss';

const groceryCategories = [
  'Staples & Flour',
  'Rice & Grains',
  'Edible Oils & Ghee',
  'Spices & Masalas',
  'Dairy & Bakery',
  'Beverages & Tea',
  'Snacks & Sweets',
  'Pulses & Dals'
];

const AddProduct = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Staples & Flour',
    stock: ''
  });
  
  const [imageMode, setImageMode] = useState('url'); // 'url' or 'file'
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="loading-message">Checking admin access...</div>;
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let res;
      if (imageMode === 'file' && imageFile) {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('category', formData.category);
        data.append('stock', formData.stock);
        data.append('image', imageFile);

        res = await fetch('/api/products', {
          method: 'POST',
          headers: { Authorization: `Bearer ${user.token}` },
          body: data
        });
      } else {
        const payload = {
          ...formData,
          imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop'
        };

        res = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`
          },
          body: JSON.stringify(payload)
        });
      }

      const responseData = await res.json();
      
      if (res.ok) {
        alert('Product created successfully!');
        navigate('/admin/products');
      } else {
        alert(responseData.message || 'Error creating product');
      }
    } catch (error) {
      console.error(error);
      alert('Network error while creating product.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Grocery Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Product Name</label>
          <input 
            type="text" 
            placeholder="e.g. Aashirvaad Shudh Chakki Whole Wheat Atta 10kg" 
            required 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea 
            placeholder="Detailed product description, nutrients, weight, Indian brand info..." 
            required 
            rows="4"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})} 
          />
        </div>

        <div className="form-group">
          <label>Price (₹ INR)</label>
          <input 
            type="number" 
            placeholder="Price in Rupees" 
            required 
            min="0"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})} 
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select 
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            style={{ width: '100%', padding: '12px', background: '#18181b', color: '#fff', border: '1px solid #3f3f46', borderRadius: '8px' }}
          >
            {groceryCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Stock Quantity</label>
          <input 
            type="number" 
            placeholder="Available units" 
            required 
            min="0"
            value={formData.stock}
            onChange={(e) => setFormData({...formData, stock: e.target.value})} 
          />
        </div>

        <div className="image-upload-section">
          <label>Product Image Source</label>
          <div style={{ display: 'flex', gap: '20px', margin: '10px 0' }}>
            <label style={{ cursor: 'pointer' }}>
              <input 
                type="radio" 
                name="imageMode" 
                checked={imageMode === 'url'} 
                onChange={() => setImageMode('url')} 
              /> Direct Image URL (Recommended)
            </label>
            <label style={{ cursor: 'pointer' }}>
              <input 
                type="radio" 
                name="imageMode" 
                checked={imageMode === 'file'} 
                onChange={() => setImageMode('file')} 
              /> Upload Image File
            </label>
          </div>

          {imageMode === 'url' ? (
            <input 
              type="url" 
              placeholder="https://images.unsplash.com/... or image web link" 
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)} 
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #3f3f46', background: '#09090b', color: '#fff' }}
            />
          ) : (
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setImageFile(e.target.files[0])} 
            />
          )}
        </div>

        <button type="submit" disabled={submitting} className="submit-button">
          {submitting ? 'Publishing Product...' : 'Publish Grocery Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;