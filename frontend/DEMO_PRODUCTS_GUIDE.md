# Demo Products & Images Guide

## Overview
This document provides information about the demo products and images used in the Shoppy Mart application.

## Mock Products Data
All demo products are stored in `/src/data/mockProducts.js`

### Available Products (8 total)

#### 1. Premium Wireless Headphones
- **Price**: ₹2,499 (Original: ₹3,499)
- **Category**: Electronics
- **Rating**: 4.8/5 (124 reviews)
- **Stock**: 50 units
- **Features**: 
  - Active Noise Cancellation
  - 30-hour battery life
  - Bluetooth 5.0
  - Premium sound quality

#### 2. Smart Watch Pro
- **Price**: ₹1,899 (Original: ₹2,499)
- **Category**: Electronics
- **Rating**: 4.6/5 (89 reviews)
- **Stock**: 35 units
- **Features**:
  - AMOLED 1.4" display
  - 7-day battery
  - Health monitoring
  - 5ATM water resistance

#### 3. Professional Camera
- **Price**: ₹4,599 (Original: ₹5,999)
- **Category**: Electronics
- **Rating**: 4.9/5 (156 reviews)
- **Stock**: 15 units
- **Features**:
  - 24MP resolution
  - 4K 60fps video
  - Advanced autofocus
  - Professional DSLR

#### 4. Portable Speaker
- **Price**: ₹899 (Original: ₹1,299)
- **Category**: Audio
- **Rating**: 4.5/5 (78 reviews)
- **Stock**: 60 units
- **Features**:
  - 360-degree sound
  - IP67 waterproof
  - 12-hour battery
  - Bluetooth 5.0

#### 5. Laptop Stand
- **Price**: ₹399 (Original: ₹599)
- **Category**: Accessories
- **Rating**: 4.4/5 (45 reviews)
- **Stock**: 100 units
- **Features**:
  - Aluminum alloy
  - Adjustable height
  - Supports up to 15kg
  - Universal fit

#### 6. USB-C Hub
- **Price**: ₹599 (Original: ₹899)
- **Category**: Accessories
- **Rating**: 4.7/5 (92 reviews)
- **Stock**: 75 units
- **Features**:
  - 7-in-1 design
  - 4K HDMI
  - 100W Power Delivery
  - SD card reader

#### 7. Mechanical Keyboard
- **Price**: ₹1,299 (Original: ₹1,799)
- **Category**: Accessories
- **Rating**: 4.8/5 (134 reviews)
- **Stock**: 40 units
- **Features**:
  - Hot-swappable switches
  - RGB lighting
  - Wireless connectivity
  - 50-hour battery

#### 8. Wireless Mouse
- **Price**: ₹699 (Original: ₹999)
- **Category**: Accessories
- **Rating**: 4.5/5 (67 reviews)
- **Stock**: 85 units
- **Features**:
  - Adjustable DPI (1600-3200)
  - 2.4GHz wireless
  - Ergonomic design
  - 18-month battery

## Image Sources

All product images are sourced from **Unsplash** (unsplash.com) - a free stock photo service.

### Image URLs Used

| Product | URL |
|---------|-----|
| Headphones | https://images.unsplash.com/photo-1505740420928-5e560c06d30e |
| Smart Watch | https://images.unsplash.com/photo-1523275335684-37898b6baf30 |
| Camera | https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f |
| Speaker | https://images.unsplash.com/photo-1589003077984-894e133814c9 |
| Laptop Stand | https://images.unsplash.com/photo-1527864550417-7fd91fc51a46 |
| USB-C Hub | https://images.unsplash.com/photo-1625948515291-69613efd103f |
| Keyboard | https://images.unsplash.com/photo-1587829191301-72f86e09dcf0 |
| Mouse | https://images.unsplash.com/photo-1527814050087-3793815479db |

## Using Mock Products

### In Components

**Example 1: Get a single product**
```javascript
import { getProductById } from '../data/mockProducts';

const product = getProductById('1'); // Returns Premium Wireless Headphones
```

**Example 2: Get products by category**
```javascript
import { getProductsByCategory } from '../data/mockProducts';

const electronics = getProductsByCategory('Electronics', 10);
const accessories = getProductsByCategory('Accessories', 5);
```

**Example 3: Get related products**
```javascript
import { getRelatedProducts } from '../data/mockProducts';

const related = getRelatedProducts('Electronics', '1', 4); // Get 4 products similar to product 1
```

**Example 4: Get all products**
```javascript
import { getAllProducts } from '../data/mockProducts';

const all = getAllProducts(6); // Get first 6 products
```

## Categories Available

- **Electronics** - Headphones, Smartwatch, Camera
- **Audio** - Portable Speaker
- **Accessories** - Laptop Stand, USB-C Hub, Keyboard, Mouse

## Price Range

- **Minimum**: ₹399 (Laptop Stand)
- **Maximum**: ₹4,599 (Professional Camera)
- **Average**: ₹1,699

## Pages Using Mock Data

1. **Home Page** (`Home.jsx`) - Displays 6 featured products
2. **Shop Page** (`Shop.jsx`) - Shows all products with filtering
3. **Product Details** (`ProductDetails.jsx`) - Shows individual product with related products
4. **Contact Page** (`Contact.jsx`) - Simulates form submission

## Transitioning to Real API

When your backend API is ready, update the pages as follows:

### ProductDetails.jsx
```javascript
// Replace mock data with:
const res = await fetch(`/api/products/${productId}`);
const data = await res.json();
setProduct(data);
```

### Shop.jsx
```javascript
// Replace mock data with:
const query = new URLSearchParams();
// ... build query
const res = await fetch(`/api/products?${query}`);
const data = await res.json();
setProducts(data);
```

### Home.jsx
```javascript
// Replace mock data with:
const res = await fetch('/api/products?limit=6');
const data = await res.json();
setProducts(data);
```

## Notes

- All images are high-quality (500x500 pixels minimum)
- Images are optimized for web use
- Mock data includes complete product specifications
- Benefits array contains emoji icons for visual appeal
- All prices are in Indian Rupees (₹)
- Stock quantities range from 15-100 units

## Adding More Products

To add more demo products, edit `/src/data/mockProducts.js`:

```javascript
{
  _id: '9',
  name: 'Your Product Name',
  category: 'Your Category',
  price: 1999,
  originalPrice: 2999,
  image: 'https://images.unsplash.com/photo-xxx',
  images: [/* array of image URLs */],
  description: 'Product description',
  specs: {
    /* specification key-value pairs */
  },
  stock: 50,
  rating: 4.5,
  reviews: 100,
  benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3']
}
```

---

**Last Updated**: May 26, 2026
