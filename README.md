# 💳 PayShop Frontend

A full-stack e-commerce frontend that simulates a real-world payment flow inspired by Razorpay's architecture. Built with React, Vite, and Tailwind CSS.

---

## 🚀 Live Demo

> Frontend: [https://payment-practice-frontend.vercel.app](https://payment-practice-frontend.vercel.app)
> Backend API: [https://payment-practice-backend.onrender.com](https://payment-practice-backend.onrender.com)

---

## 🛠 Tech Stack

- **Framework** — React 18
- **Build Tool** — Vite
- **Styling** — Tailwind CSS
- **Routing** — React Router DOM
- **HTTP Client** — Axios
- **State Management** — React Context API

---

## ✨ Features

- ✅ User Signup & Login
- ✅ JWT token stored in localStorage
- ✅ Protected routes (redirect to login if not authenticated)
- ✅ Role-based access (Admin route protected)
- ✅ Product listing with emoji display
- ✅ Add to cart with quantity management
- ✅ Cart count badge on navbar
- ✅ Active page highlight on navbar
- ✅ Simulated payment modal (Razorpay pattern)
- ✅ Payment success and failure simulation
- ✅ Order history page
- ✅ Admin panel — view all orders from all users
- ✅ Fully responsive UI

---

## 💡 Payment Flow (Razorpay Pattern)

```
User clicks Checkout
        ↓
POST /orders → Backend creates order
               Returns orderId + paymentId + signature
        ↓
💳 Payment Modal opens
User clicks "Pay" or "Simulate Failure"
        ↓
Pay → sends correct signature → POST /payment/verify → status: PAID ✅
Fail → sends wrong signature → POST /payment/verify → status: FAILED ❌
```

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   ├── axios.js          # Axios instance with interceptors
│   │   ├── authApi.js        # Signup, Login
│   │   ├── orderApi.js       # Create, get, admin orders
│   │   ├── paymentApi.js     # Verify payment
│   │   └── productApi.js     # Get products
│   ├── components/
│   │   ├── Navbar.jsx        # With cart count + active page
│   │   ├── ProductCard.jsx   # With emoji mapping
│   │   ├── PaymentModal.jsx  # Simulated payment gateway
│   │   ├── ProtectedRoute.jsx
│   │   ├── AdminRoute.jsx    # Admin only access
│   │   └── Loader.jsx
│   ├── context/
│   │   └── CartContext.jsx   # Global cart state
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Products.jsx
│   │   ├── Cart.jsx
│   │   ├── Orders.jsx
│   │   └── Admin.jsx
│   ├── App.jsx
│   └── main.jsx
├── vercel.json               # SPA routing fix for Vercel
└── .env                      # Environment variables (not pushed)
```

---

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/kishan1801/payment-practice-frontend.git
cd payment-practice-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file in root

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 4. Start the development server

```bash
npm run dev
```

App runs at `http://localhost:5173`

> Make sure the backend is running locally on port 3000!

---

## 🔐 Environment Variables

| Variable            | Description          |
| ------------------- | -------------------- |
| `VITE_API_BASE_URL` | Backend API base URL |

---

## 🔗 Backend Repository

[https://github.com/kishan1801/payment-practice-backend](https://github.com/kishan1801/payment-practice-backend)

---

## 👨‍💻 Author

**Kishan** — [github.com/kishan1801](https://github.com/kishan1801)
