const express = require('express');
const WishlistItem = require('../models/WishlistItem');

const wishlistRouter = express.Router();

// # Get all wishlist items for a specific user
wishlistRouter.get('/', async (req, res) => {
  try {
    const { user } = req.query;
    const wishlistItems = await WishlistItem.find({ user });
    res.status(200).json(wishlistItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// # Create a new wishlist item
wishlistRouter.post('/', async (req, res) => {
  try {
    let { title, description, user, priority } = req.body;

    // # Validate input data
    if (!title || !description || !user) {
      return res.status(400).json({ message: 'Please provide a title, description, and user' });
    }

    // # Set default priority if not provided
    if (!priority) {
      priority = 1;
    }

    // # Validate priority type and value
    if (priority && typeof priority !== 'number') {
      return res.status(400).json({ message: 'Priority must be a number' });
    }
    if (priority && priority < 1) {
      return res.status(400).json({ message: 'Priority must be greater than 0' });
    }
    if (priority && priority > 3) {
      return res.status(400).json({ message: 'Priority must be less than 6' });
    }

    // # Check for existing item with the same title
    const item = await WishlistItem.find({ title });
    if (item.length) {
      return res.status(400).json({ message: 'Item already exists' });
    }

    // # Create and save a new wishlist item
    const wishlistItem = new WishlistItem({ title, description, user, priority });
    await wishlistItem.save();
    res.status(201).json({ message: 'Wishlist item created successfully', wishlistItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// # Update a wishlist item
wishlistRouter.put('/:id', async (req, res) => {
  try {
    const { title, description, user, priority } = req.body;

    // # Validate input data
    if (!title || !description || !user) {
      return res.status(400).json({ message: 'Please provide a title, description, and user' });
    }

    // # Update wishlist item with the given ID
    const wishlistItem = await WishlistItem.findByIdAndUpdate(req.params.id, { title, description, user, priority }, { new: true });
    if (!wishlistItem) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }
    res.status(200).json({ message: 'Wishlist item updated successfully', wishlistItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// # Delete a wishlist item
wishlistRouter.delete('/:id', async (req, res) => {
  try {
    const wishlistItem = await WishlistItem.findByIdAndDelete(req.params.id);
    if (!wishlistItem) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }
    res.status(200).json({ message: 'Wishlist item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = wishlistRouter;