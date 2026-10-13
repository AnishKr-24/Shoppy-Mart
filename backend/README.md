# Shoppy Mart - Java & Spring Boot Backend

Enterprise Spring Boot 3 backend for Shoppy Mart, providing 100% API compatibility with the React frontend.

---

## Tech Stack

- **Language**: Java 17+
- **Framework**: Spring Boot 3.3.4
- **Build Tool**: Apache Maven (with Maven Wrapper `mvnw` / `mvnw.cmd`)
- **Database**: Spring Data MongoDB (`Shoppy_Mart-demo`)
- **Security**: Spring Security + JJWT (Stateless Bearer JWT Authentication)
- **Media Storage**: Cloudinary (with local `/uploads` directory fallback)
- **Payments**: Razorpay Java SDK + HMAC-SHA256 signature verification
- **Mailing**: Spring Mail (Gmail SMTP)

---

## Quick Start

### 1. Prerequisites
- **Java 17** or newer installed (`java -version`)
- **MongoDB** running locally on port 27017 (or MongoDB Atlas URI)
- **Maven** (or use the provided `mvnw` wrapper)

### 2. Run the Application

#### On Windows:
```cmd
cd backend
mvn spring-boot:run
```
Or with Maven Wrapper:
```cmd
mvnw.cmd spring-boot:run
```

#### On Linux / macOS:
```bash
cd backend
./mvnw spring-boot:run
```

The server starts on **`http://localhost:5000`**.

---

## Default Seeded Credentials

When starting for the first time, the `DatabaseSeeder` automatically initializes:
- **Admin User**: `admin@shoppymart.com` / `admin123`
- **Customer User**: `user@shoppymart.com` / `user123`
- **24 Grocery Products**: 3 items across 8 categories (Staples & Flour, Rice & Grains, Edible Oils & Ghee, Spices & Masalas, Dairy & Bakery, Beverages & Tea, Snacks & Sweets, Pulses & Dals).

---

## Environment Configuration

Configurations are stored in `src/main/resources/application.properties` with environment variable overrides:

| Property | Default Value | Description |
|---|---|---|
| `server.port` | `5000` | Server HTTP port (proxied by Vite) |
| `spring.data.mongodb.uri` | `mongodb://localhost:27017/Shoppy_Mart-demo` | MongoDB URI |
| `jwt.secret` | (built-in 256-bit secure key) | Secret for signing JWTs |
| `CLOUDINARY_CLOUD_NAME` | `dlzypllzf` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | `JU6vEBNoJbOkoKRAqG8j-aUFfiI` | Cloudinary API secret |
| `RAZORPAY_KEY_ID` | | Razorpay Key ID |
| `RAZORPAY_KEY_SECRET` | | Razorpay Key Secret |
| `EMAIL_USER` | | Gmail address for sending OTP/orders |
| `EMAIL_PASS` | | Gmail 16-character App Password |

---

## API Endpoints

### 🔐 Authentication (`/api/auth`)
- `POST /api/auth/register` & `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Authenticate and get JWT token
- `GET /api/auth/profile` - Get logged-in user profile
- `PUT /api/auth/profile` - Update user profile
- `GET /api/auth/users` - Admin: List all users
- `PUT /api/auth/users/{id}` - Admin: Update user role / status
- `DELETE /api/auth/users/{id}` - Admin: Remove user account

### 🛒 Products (`/api/products`)
- `GET /api/products` - List all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Admin: Create product (JSON or Multipart with image)
- `PUT /api/products/{id}` - Admin: Update product (JSON or Multipart)
- `DELETE /api/products/{id}` - Admin: Delete product

### 📦 Orders (`/api/orders`)
- `POST /api/orders` - Place new order
- `GET /api/orders/myorders` - Get current user orders (with populated products)
- `GET /api/orders` - Admin: Get all orders (with populated users and products)
- `GET /api/orders/{id}` - Get specific order details
- `PUT /api/orders/{id}` - Admin: Update order status (`pending`, `shipped`, `delivered`)

### 💳 Payments (`/api/payment`)
- `POST /api/payment/order` - Generate Razorpay payment order
- `POST /api/payment/verify` - Verify payment HMAC-SHA256 signature

### 📊 Analytics (`/api/analytics`)
- `GET /api/analytics` - Admin dashboard summary (`totalOrders`, `totalProducts`, `totalUsers`, `totalRevenue`)
- `GET /api/analytics/sales`, `/products`, `/users`, `/revenue` - Section metrics

### 💓 Health Check
- `GET /` - Root health ping
- `GET /uploads/**` - Local static media uploads
