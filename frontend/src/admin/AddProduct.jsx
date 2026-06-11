import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/add-product.scss';

const AddProduct = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', category: '', stock: ''
  });
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert('Please select an image');
    
    setSubmitting(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('stock', formData.stock);
    data.append('image', image);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { Authorization: `Bearer ${user.token}` },
        body: data
      });
      const responseData = await res.json();
      
      if (res.ok) {
        alert('Product created successfully with Cloudinary Image URL!');
        navigate('/shop');
      } else {
        alert(responseData.message || 'Error creating product');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Product Name" 
            required 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
          />
        </div>

        <div className="form-group">
          <textarea 
            placeholder="Description" 
            required 
            rows="4"
            onChange={(e) => setFormData({...formData, description: e.target.value})} 
          />
        </div>

        <div className="form-group">
          <input 
            type="number" 
            placeholder="Price" 
            required 
            onChange={(e) => setFormData({...formData, price: e.target.value})} 
          />
        </div>

        <div className="form-group">
          <input 
            type="text" 
            placeholder="Category" 
            required 
            onChange={(e) => setFormData({...formData, category: e.target.value})} 
          />
        </div>

        <div className="form-group">
          <input 
            type="number" 
            placeholder="Stock Quantity" 
            required 
            onChange={(e) => setFormData({...formData, stock: e.target.value})} 
          />
        </div>
        
        <div className="image-upload-section">
          <label>Upload Product Image (Cloudinary)</label>
          <input 
            type="file" 
            accept="image/*" 
            required 
            onChange={(e) => setImage(e.target.files[0])} 
          />
        </div>

        <button type="submit" disabled={submitting} className="submit-button">
          {submitting ? 'Uploading & Creating...' : 'Publish Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;