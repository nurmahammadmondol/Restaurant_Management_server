# 🍽️ Restaurant Management - Server

This is the **server-side** application for the Restaurant Management web app. It is built using **Node.js**, **Express.js**, and **MongoDB**. The server handles food data, orders, and exposes RESTful API endpoints for frontend consumption.

---

## 🚀 Features

- 📦 Manage all food items (CRUD)
- 🛒 Manage food orders (place, retrieve, delete)
- 📃 Pagination support for food listing
- 🌐 MongoDB Atlas integration
- 🔐 Environment variable support

---

## 📁 Folder Structure

restaurant-management-server/
├── .vercel/                         # Business logic for handling routes
│   ├── project.json                 # AllFoods APIs logic
│   └── Readme.txt                   # OrderFoods APIs logic
├── node modules/                    # Route definitions for APIs
│   ├── foodRoutes.js                # AllFoods routes
│   └── orderRoutes.js               # OrderFoods routes
├── .env                             # Environment variables (not committed to Git)
├── .gitignore                       # To ignore unwanted files
├── index.js                         # Main server entry point
├── package.json                     # Project metadata & dependencies
└── vercel.json                       

