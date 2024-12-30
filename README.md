# Wishlist Tracker - Backend

Welcome to the **Wishlist Tracker** backend! This server is built with **Node.js**, **Express**, **JWT Authentication**, and uses **MongoDB** for data storage. It powers the wishlist app and handles user authentication, wishlist data management, and item storage.

## 🚀 Features

- **User Authentication**: Secure user sign-up, login, and JWT-based authentication.
- **Wishlist Management**: CRUD operations for managing user wishlists.
- **Item Management**: Add, edit, and remove items in the wishlist.
- **API Security**: JWT authentication for protecting routes.
- **MongoDB**: Persistent data storage for users and wishlists.

## 🛠️ Tech Stack

- **Backend Framework**: Express.js
- **Database**: MongoDB (Mongoose for ODM)
- **Authentication**: JWT (JSON Web Token)
- **Environment Configuration**: dotenv
- **CORS**: Cross-Origin Resource Sharing support

## 🔧 Setup Instructions

### 1. Clone the Repository
```
git clone https://github.com/SarahE-Dev/wishlist-backend.git
cd wishlist-backend```

## Install Dependencies

```
npm install```

## Environment Variables

Create a .env file in the root directory and add the following:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/wishlist_tracker
JWT_SECRET=your_jwt_secret```

## Start the Server


```
npm start```

This will start the Express server and the app will be accessible at http://localhost:3001.

## 5. Build the App for Production
```
npm run build```
###📂 Project Structure

* **models/:** Mongoose models for User and Wishlist
* **routes/:** API route definitions

###📄 API Documentation

#### Authentication
```
POST /api/users/signup: Sign up a new user and return a JWT Token
POST /api/users/login: Login and return a JWT token```

#### Wishlists
```
GET /api/wishlist: Get all wishlists for the logged-in user
POST /api/wishlist: Create a new wishlist
PUT /api/wishlist/:id: Update a wishlist
DELETE /api/wishlist/:id: Delete a wishlist```