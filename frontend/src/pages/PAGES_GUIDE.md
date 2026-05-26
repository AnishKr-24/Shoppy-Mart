# Shoppy Mart - All Pages Documentation

This document provides an overview of all pages created for the Shoppy Mart e-commerce application.

## Pages Created

### 1. **Home Page** (`Home.jsx`)
- Hero section with featured products
- Product categories showcase
- Call-to-action sections
- Newsletter subscription
- Responsive design for all devices
- **Styling:** `home.scss`

### 2. **Shop Page** (`Shop.jsx`)
- Complete product listing
- Sidebar filters (categories, price range, sorting)
- Responsive product grid
- Product cards with images and prices
- Search and filter functionality
- **Styling:** `shop.scss`

### 3. **Product Details Page** (`ProductDetails.jsx`)
- Product image gallery with thumbnails
- Detailed product information
- Product specifications
- Quantity selector
- Add to cart and wishlist buttons
- Related products section
- Customer benefits display
- **Styling:** `product-details.scss`

### 4. **Shopping Cart** (`Cart.jsx`)
- Display all cart items
- Update quantity for each item
- Remove items from cart
- Order summary with calculations:
  - Subtotal
  - Shipping costs
  - Tax (5%)
  - Final total
- Promo code input
- Empty cart state with call-to-action
- **Styling:** `cart.scss`

### 5. **Checkout Page** (`Checkout.jsx`)
- Multi-step checkout process:
  - **Step 1:** Shipping address form
  - **Step 2:** Payment method selection
  - **Step 3:** Order review
- Form validation
- Order summary sidebar
- Security badge
- **Styling:** `checkout.scss`

### 6. **Login Page** (`Login.jsx`)
- Email and password fields
- Remember me option
- Forgot password link
- Social login options (Google, Facebook)
- Sign-up link for new users
- Error message handling
- **Styling:** `auth.scss`

### 7. **Sign Up Page** (`Signup.jsx`)
- Full name, email, password fields
- Confirm password field
- Terms & conditions agreement
- Social login options
- Sign-in link for existing users
- **Styling:** `auth.scss`

### 8. **User Profile Page** (`Profile.jsx`)
- User information display
- Edit profile functionality
- Order history with status
- Saved addresses management
- Logout functionality
- Tabbed interface:
  - Profile tab
  - Orders tab
  - Addresses tab
- **Styling:** `profile.scss`

### 9. **About Us Page** (`About.jsx`)
- Company mission statement
- Why choose Shoppy Mart section with 6 features
- Company story timeline
- Team member cards with roles
- Responsive feature cards
- **Styling:** `about.scss`

### 10. **Contact Us Page** (`Contact.jsx`)
- Contact form with validation
- Success message display
- Contact information section:
  - Email addresses
  - Phone number
  - Business address
  - Social media links
- FAQ preview section
- **Styling:** `contact.scss`

### 11. **FAQ Page** (`FAQ.jsx`)
- 5 categories of FAQs:
  - Orders & Shipping
  - Products
  - Returns & Refunds
  - Payment
  - Account
- Expandable/collapsible FAQ items
- Search functionality
- Contact CTA
- **Styling:** `faq.scss`

### 12. **Privacy Policy Page** (`PrivacyPolicy.jsx`)
- 10 comprehensive sections covering:
  - Data collection methods
  - How data is used
  - Third-party disclosures
  - Security measures
  - User privacy rights
  - Cookie policy
  - Policy updates
- Contact information
- **Styling:** `legal.scss`

### 13. **Terms & Conditions Page** (`Terms.jsx`)
- 14 sections including:
  - License terms
  - User responsibilities
  - Product information
  - Pricing and availability
  - Payment terms
  - Return/refund policy
  - Limitation of liability
  - Prohibited activities
- Governing law information
- **Styling:** `legal.scss`

### 14. **Shipping Information Page** (`ShippingInfo.jsx`)
- 3 shipping method options:
  - Standard (5-7 days)
  - Express (2-3 days)
  - Same-day
- Processing and dispatch details
- Shipping rates table by region
- Tracking information
- Damage/loss handling
- FAQ section
- Contact support details
- **Styling:** `legal.scss`

### 15. **Order Confirmation Page** (`OrderConfirmation.jsx`)
- Success confirmation header
- Order details display
- Order summary with items
- Shipping address display
- Delivery timeline steps
- Order tracking button
- Support options
- Email notification info
- **Styling:** `order-confirmation.scss`

## Styling Files

All pages have dedicated SCSS files with:
- Dark theme styling (#18181b background)
- Orange accent color (#f97316)
- Fully responsive design
- Mobile-first approach
- Smooth animations and transitions
- Hover effects
- Consistent spacing and typography

### SCSS Files Created:
1. `shop.scss` - Shop page styling
2. `product-details.scss` - Product details page styling
3. `cart.scss` - Shopping cart styling
4. `checkout.scss` - Checkout page styling
5. `auth.scss` - Login and signup styling
6. `profile.scss` - User profile styling
7. `about.scss` - About us page styling
8. `contact.scss` - Contact us page styling
9. `faq.scss` - FAQ page styling
10. `legal.scss` - Privacy, terms, and shipping info styling
11. `order-confirmation.scss` - Order confirmation styling

## Features Implemented

### User Authentication
- Login with email/password
- Sign up with validation
- Social login options
- Forgot password functionality (placeholder)

### Shopping Experience
- Browse products with filters
- View detailed product information
- Add items to cart
- Update quantities
- Remove items
- Apply promo codes

### Checkout Process
- Multi-step checkout wizard
- Shipping address collection
- Payment method selection
- Order review
- Order confirmation

### User Account Management
- View profile information
- Edit profile
- View order history
- Manage addresses
- Logout functionality

### Information Pages
- About company
- Contact support
- FAQs
- Privacy Policy
- Terms & Conditions
- Shipping Information

## Responsive Design

All pages are optimized for:
- Desktop (1024px and above)
- Tablet (768px - 1023px)
- Mobile (480px - 767px)
- Small mobile (below 480px)

## Component Structure

```
frontend/src/
├── pages/
│   ├── Home.jsx
│   ├── Shop.jsx
│   ├── ProductDetails.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Profile.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── FAQ.jsx
│   ├── PrivacyPolicy.jsx
│   ├── Terms.jsx
│   ├── ShippingInfo.jsx
│   └── OrderConfirmation.jsx
└── styles/
    ├── global.scss
    ├── navbar.scss
    ├── footer.scss
    ├── home.scss
    ├── shop.scss
    ├── product-details.scss
    ├── cart.scss
    ├── checkout.scss
    ├── auth.scss
    ├── profile.scss
    ├── about.scss
    ├── contact.scss
    ├── faq.scss
    ├── legal.scss
    └── order-confirmation.scss
```

## Integration Notes

### Before Using These Pages

1. **Create Context/Redux Store** for:
   - Authentication (AuthContext)
   - Shopping cart (CartContext/Redux)
   - Product data
   - User profile

2. **API Endpoints Needed**:
   - `/api/auth/login` - User login
   - `/api/auth/signup` - User registration
   - `/api/auth/profile` - Update user profile
   - `/api/products` - Get all products
   - `/api/products/:id` - Get product details
   - `/api/checkout` - Process checkout
   - `/api/contact` - Submit contact form

3. **Update App.jsx** with React Router:
   ```jsx
   import { BrowserRouter, Routes, Route } from 'react-router-dom';
   ```

4. **Import all pages** and set up routes

5. **Add styles to App.jsx**:
   ```jsx
   import './styles/shop.scss';
   import './styles/product-details.scss';
   // ... import all other style files
   ```

## Future Enhancements

- [ ] Connect to real backend APIs
- [ ] Implement authentication flow
- [ ] Add Redux for state management
- [ ] Implement product search
- [ ] Add customer reviews
- [ ] Implement order tracking
- [ ] Add payment gateway integration
- [ ] Create admin dashboard routes
- [ ] Add notification system
- [ ] Implement wishlist functionality

## Color Scheme

- **Primary Background**: `#18181b` (Dark gray)
- **Secondary Background**: `#27272a` (Lighter gray)
- **Accent Color**: `#f97316` (Orange)
- **Secondary Accent**: `#ea580c` (Darker orange)
- **Text Primary**: `#ffffff` (White)
- **Text Secondary**: `#a1a1aa` (Light gray)
- **Success**: `#22c55e` (Green)
- **Error**: `#ff4444` (Red)

## Typography

- **Font Family**: System fonts (CSS defaults)
- **Headings**: 700-800 font weight
- **Body Text**: 400-600 font weight
- **Sizes**: 0.8rem to 3rem depending on context

---

**Created:** May 26, 2026  
**Total Pages:** 15  
**Total SCSS Files:** 11  
**Responsive Breakpoints:** 4
