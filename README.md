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

```bash
git clone https://github.com/SarahE-Dev/wishlist-backend.git
cd wishlist-tracker-backend
2. Install Dependencies
bash
Copy code
npm install
3. Environment Variables
Create a .env file in the root directory and add the following:

bash
Copy code
PORT=5000
MONGODB_URI=mongodb://localhost:27017/wishlist_tracker
JWT_SECRET=your_jwt_secret
4. Run the Development Server
bash
Copy code
npm run dev
This will start the Express server and the app will be accessible at http://localhost:3001.

5. Build the App for Production
bash
Copy code
npm run build
📂 Project Structure
src/: Contains all the source code for the backend
controllers/: Functions to handle requests for wishlists, items, and users
models/: Mongoose models for User and Wishlist
routes/: API route definitions
middleware/: Middleware functions like authentication verification
utils/: Helper functions (e.g., JWT signing, password hashing)
📄 API Documentation
Authentication
POST /api/auth/signup: Sign up a new user
POST /api/auth/login: Login and return a JWT token
GET /api/auth/me: Get current user info (authenticated route)
Wishlists
GET /api/wishlists: Get all wishlists for the logged-in user
POST /api/wishlists: Create a new wishlist
PUT /api/wishlists/:id: Update a wishlist
DELETE /api/wishlists/:id: Delete a wishlist
Wishlist Items
POST /api/wishlists/:id/items: Add an item to a wishlist
PUT /api/wishlists/:id/items/:itemId: Update an item in a wishlist
DELETE /api/wishlists/:id/items/:itemId: Delete an item from a wishlist
