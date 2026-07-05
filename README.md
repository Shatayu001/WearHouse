# 🛍️ Full-Stack E-Commerce Platform

A modern full-stack e-commerce web application built using the MERN stack. The application provides a seamless shopping experience with secure authentication, product management, cart functionality, order tracking, and PayPal payment integration.

---

## 🚀 Features

- 🔐 User Authentication & Authorization
- 🛒 Shopping Cart Management
- 💳 Secure Online Payments with PayPal
- 📦 Product Listing & Product Details
- 📑 Order Management
- 👤 User Profile & Order History
- 🛠️ Admin Dashboard for Product Management
- 📱 Fully Responsive Design

---

## 🛠️ Tech Stack

### Frontend
- React 19
- Redux Toolkit
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Payment
- PayPal React SDK

---

## ✨ Highlights

- Built a full-stack e-commerce platform using **React 19** with **Redux Toolkit** for centralized state management across user authentication, shopping cart, and order processing.
- Integrated **PayPal React SDK** to enable secure online payment processing.
- Developed a responsive user interface using **Tailwind CSS** for an optimized experience across desktop and mobile devices.
- Consumed REST APIs using **Axios** for efficient communication between the frontend and backend.
- Implemented product browsing, order placement, and user account management with role-based access.

---

## 📂 Project Structure

```
FullStack-Ecommerce-Website/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/Shatayu001/FullStack-Ecommerce-Website.git
```

### Navigate to the project

```bash
cd FullStack-Ecommerce-Website
```

### Install frontend dependencies

```bash
cd frontend
npm install
```

### Install backend dependencies

```bash
cd ../backend
npm install
```

---

## ▶️ Run Locally

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

```bash
cd frontend
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend` directory and add:

```env
PORT=9000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PAYPAL_CLIENT_ID=your_paypal_client_id
```

---

## 📸 Screenshots

> Add screenshots of your application here.

- Home Page
- Product Details
- Shopping Cart
- Checkout
- Admin Dashboard

---

## 📈 Future Improvements

- Wishlist
- Product Reviews & Ratings
- Coupon & Discount System
- Email Notifications
- Inventory Management
- AI Product Recommendations

---

## 👨‍💻 Author

**Shatayu Khante**

- GitHub: https://github.com/Shatayu001
- LinkedIn: *(Add your LinkedIn profile)*

---

## 📄 License

This project is licensed under the MIT License.
