const express = require('express'); 
const logger = require('morgan'); 
const cors = require('cors'); 
const mongoose = require('mongoose'); 

const PORT = process.env.PORT || 3001; // Define the port to listen on

const app = express(); // Create an Express application instance

// Middleware 
app.use(logger('dev')); // Log requests to the console
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON data

// Load environment variables from .env file
require('dotenv').config();

// Define API routes
app.use('/api/users', require('./routes/userRouter')); // Route for user-related requests
app.use('/api/wishlist', require('./routes/wishlistRouter')); // Route for wishlist-related requests

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI) 
  .then(() => console.log('Connected to MongoDB')) 
  .catch(err => console.error(err));

// Define a simple GET route for testing
app.get('/', (req, res) => {
  res.json({ message: 'API Working' });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});