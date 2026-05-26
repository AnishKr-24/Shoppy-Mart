# Frontend UI Structure & Styling Guide

## Overview
The Shoppy Mart frontend has been organized with **separate CSS/SCSS files for each component**. All inline styles have been removed and moved to dedicated stylesheet files.

---

## Component Structure

### 1. **Global Styles**
**File:** `global.scss`
- Base styling for the entire application
- Font imports and global reset
- Common button styles (`.btn`)
- Main content container styling

---

### 2. **App Component**
**Component File:** `App.jsx`
**Stylesheet:** `app.scss`

**Purpose:** Root application component that sets up routing and layout

**Classes Used:**
- `.app-container` - Main flex container
- `.main-content` - Content area between navbar and footer

**Features:**
- Responsive layout with flex display
- Fade-in animation for content
- Mobile-friendly padding

---

### 3. **Navbar Component**
**Component File:** `components/Navbar.jsx`
**Stylesheet:** `navbar.scss` (existing)

**Features:**
- Sticky navigation bar
- Responsive mobile menu toggle
- Brand logo and name
- Navigation links with hover effects
- Authentication action buttons (Login/Signup/Profile)
- Shopping cart link

**Classes:**
- `.navbar` - Main nav container
- `.navbar-brand` - Brand section
- `.navbar-logo` - Logo image
- `.navbar-links` - Navigation menu
- `.navbar-actions` - Auth buttons
- `.menu-toggle` - Mobile menu button

---

### 4. **Footer Component**
**Component File:** `components/Footer.jsx`
**Stylesheet:** `footer.scss` (existing)

**Features:**
- Multiple footer sections (Brand, Categories, Support, Contact)
- Social media icons
- Newsletter subscription form
- Payment method display
- Responsive grid layout

**Classes:**
- `.footer` - Main footer container
- `.footer-container` - Grid layout
- `.footer-section` - Individual sections
- `.social-links` - Social media icons
- `.newsletter-section` - Subscription form

---

### 5. **Home Page**
**Component File:** `pages/Home.jsx`
**Stylesheet:** `home.scss`

**Features:**
- Hero section with call-to-action
- Category browsing section
- Featured products grid
- Product cards with images, prices, and add-to-cart
- Loading states
- Responsive design for all screen sizes

**Classes:**
- `.home-page` - Main page container
- `.hero-section` - Hero banner
- `.categories-section` - Category cards grid
- `.featured-section` - Products section
- `.product-card` - Individual product card
- `.product-image` - Product photo
- `.product-info` - Product details
- `.stat-grid` - Responsive grid

**Responsive Breakpoints:**
- Desktop: Full layout
- Tablet (1024px): Adjusted grid columns
- Mobile (768px): Single column layout
- Small Mobile (480px): Optimized spacing

---

### 6. **Admin Dashboard**
**Component File:** `admin/AdminDashboard.jsx`
**Stylesheet:** `admin-dashboard.scss`

**Features:**
- Admin statistics cards (Orders, Products, Users, Revenue)
- Dashboard header with logo
- Welcome message
- Loading states with animation
- Administrative control buttons
- Hover effects on stat cards

**Classes:**
- `.admin-dashboard` - Main container
- `.dashboard-header` - Header section
- `.dashboard-welcome` - Welcome message
- `.stats-grid` - Statistics cards grid
- `.stat-card` - Individual stat card
- `.admin-controls` - Control buttons section
- `.loading-message` - Loading animation

**Features:**
- Grid layout for stats
- Color-coded stat numbers (#f97316 orange)
- Smooth hover animations
- Mobile responsive layout

---

### 7. **Add Product Form**
**Component File:** `admin/AddProduct.jsx`
**Stylesheet:** `add-product.scss`

**Features:**
- Product form with validation
- Image upload with file selector
- Form input styling
- Submit button with loading state
- Responsive form layout

**Classes:**
- `.add-product-container` - Main form container
- `.product-form` - Form wrapper
- `.form-group` - Individual form field
- `.image-upload-section` - File upload area
- `.submit-button` - Submit button

**Form Fields:**
- Product Name (text)
- Description (textarea)
- Price (number)
- Category (text)
- Stock Quantity (number)
- Product Image (file upload)

---

## Color Scheme

**Primary Colors:**
- Orange: `#f97316`
- Orange (hover): `#ea580c`
- Dark Background: `#09090b`
- Card Background: `#18181b`

**Text Colors:**
- Primary: `#ffffff` (White)
- Secondary: `#a1a1aa` (Gray)
- Accent: `#f97316` (Orange)

**Borders:**
- Light border: `rgba(255, 255, 255, 0.05)`
- Focus border: `#f97316`

---

## Responsive Design

All components follow mobile-first design with breakpoints at:

| Breakpoint | Screen Size | Purpose |
|-----------|------------|---------|
| Desktop | 1024px+ | Full feature layout |
| Tablet | 768px - 1023px | Medium screen adjustments |
| Mobile | 480px - 767px | Compact mobile layout |
| Small Mobile | < 480px | Ultra-compact layout |

---

## Animation Effects

**Global Animations:**
- `fadeIn` - 0.6s fade in animation
- `fadeInDown` - Hero section entrance
- `pulse` - Loading state animation
- `translateY` - Hover elevation effects

---

## Usage Example

### Importing Component with Styles
```jsx
import Home from './pages/Home';
import '../styles/home.scss';
```

### Using CSS Classes
```jsx
<div className="home-page">
  <section className="hero-section">
    <h1>Welcome</h1>
  </section>
</div>
```

---

## File Organization

```
frontend/src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
├── pages/
│   └── Home.jsx
├── admin/
│   ├── AdminDashboard.jsx
│   └── AddProduct.jsx
├── styles/
│   ├── global.scss
│   ├── app.scss
│   ├── navbar.scss
│   ├── footer.scss
│   ├── home.scss
│   ├── admin-dashboard.scss
│   └── add-product.scss
└── App.jsx
```

---

## Best Practices

1. **Always separate CSS from JSX** - Keep styles in `.scss` files
2. **Use semantic class names** - BEM methodology is recommended
3. **Maintain color consistency** - Use defined color variables
4. **Responsive-first design** - Build mobile-first, scale up
5. **Organize imports** - Import global styles first, then component styles
6. **Comment complex styles** - Document animations and complex selectors

---

## Future Enhancements

- Extract color palette to SCSS variables
- Create reusable component mixins
- Add CSS modules for component isolation
- Implement dark/light theme switching
- Add page transition animations

---

## Notes

- All components use CSS Grid and Flexbox for layout
- Gradient buttons with shadow effects for premium feel
- Smooth transitions on all interactive elements
- Full mobile responsiveness
- Performance optimized animations

