# Wanderlust 🏕️

Wanderlust is a full-stack web application inspired by Airbnb, where users can create, view, review, and manage vacation property listings. It features user authentication, image uploads, server-side form validation, session management, and database persistence using MongoDB Atlas.

---

## 🌐 Live Demo

- Visit the deployed app here: https://wanderlust-vbrf.onrender.com

## ⚙️ Tech Stack

- Frontend: EJS (templating), Bootstrap 5
- Backend: Node.js, Express.js
- Database: MongoDB Atlas, Mongoose
- Authentication: Passport.js (LocalStrategy)
- Image Hosting: Cloudinary
- Session Storage: connect-mongo
- Other Libraries: method-override, connect-flash, dotenv


## ✨ Features

- User authentication (Register/Login/Logout)
- Flash messages for success and error feedback
- Add/edit/delete campground listings
- Upload multiple images per listing
- Leave/delete reviews for listings
- Server-side form validation using Joi
- Error handling with custom middleware
- Secure session storage with cookies
- Uses MongoDB Atlas in production

## 📁 Project Structure

- wanderlust/
    ├── models/ # Mongoose models (User, Listing, Review)
    ├── routes/ # Express route modules (listing.js, review.js, user.js)
    ├── views/ # EJS templates
    ├── public/ # Static files (CSS, JS, images)
    ├── utils/ # Custom error class (ExpressError.js)
    ├── middleware/ # Custom middleware (if any)
    ├── app.js # Entry point
    ├── .env # Environment variables (not committed)
    ├── package.json
    └── README.md