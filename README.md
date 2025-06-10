# Wanderlust 🏕️

Wanderlust is a full-stack web application inspired by Airbnb, where users can create, view, review, and manage vacation property listings. It features user authentication, image uploads, server-side form validation, session management, and database persistence using MongoDB Atlas.

---

## 🌐 Live Demo

- Visit the deployed app here: https://wanderlust-vbrf.onrender.com


## 🛠️ Tech Stack

### 🔧 Backend
- **Node.js** – JavaScript runtime environment  
- **Express.js** – Web application framework for building routes and middleware  
- **MongoDB** – NoSQL database for storing users, listings, and reviews  
- **Mongoose** – ODM (Object Data Modeling) library for MongoDB
### 🔐 Authentication & Authorization
- **Passport.js** – Authentication middleware  
- **passport-local** – Strategy for handling username/password login  
- **express-session** – Middleware for managing sessions  
- **connect-mongo** – Stores session data in MongoDB for persistence
### 📦 Middleware & Utilities
- **dotenv** – Loads environment variables from a `.env` file  
- **method-override** – Allows usage of HTTP verbs like PUT and DELETE in HTML forms  
- **connect-flash** – Flash message support for displaying alerts  
- **path** – Node.js core module for file path operations  
### 📤 File Uploads & Media
- **Multer** – Handles `multipart/form-data` for uploading images  
- **Cloudinary** – Cloud-based image hosting and delivery platform  
### 🖼️ View Layer & Frontend
- **EJS** – Templating engine for rendering dynamic HTML on the server  
- **ejs-mate** – Provides layout and partial support for EJS templates  
- **Bootstrap** – CSS framework used for responsive design and styling  
### 🗺️ Location Services
- **LocationIQ API** – Used for geocoding (converting address to coordinates) and rendering map views for listings  


## ✨ Features
- **View listings**
- **Search** for listings
- **Apply category filters** to listings
- **Sign up, log in and log out**
- **Authentication** (login required for certain actions)
- **Authorization** (only authors can edit/delete their own content)
- **Create, view, edit, and delete listings**
- **Add, view, and delete reviews** (includes comment and rating)
- **View location** of listings using **LocationIQ**
- **Upload image** while creating a new listing
- **Responsive navbar** using toggle bar
- **Filter price display** with or without taxes
- **Flash messages** for success and error feedback
- **form validation**- Server-side using Joi, client side using bootstrap
- **Error handling** with custom middleware
