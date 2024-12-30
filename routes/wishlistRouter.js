const express = require('express');
const WishlistItem = require('../models/WishlistItem');

const wishlistRouter = express.Router();

wishlistRouter.get('/', async (req, res) => {
    try {
        const wishlistItems = await WishlistItem.find({});
        res.status(200).json(wishlistItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

wishlistRouter.post('/', async (req, res) => {
    try {
        let { title, description, user, priority } = req.body;
        if(!title || !description || !user) {
            return res.status(400).json({ message: 'Please provide a title, description, and user' });
        }
        if(!priority){
            priority = 1;
        }
        if(priority && typeof priority !== 'number') {
            return res.status(400).json({ message: 'Priority must be a number' });
        }
        if(priority && priority < 1) {
            return res.status(400).json({ message: 'Priority must be greater than 0' });
        }
        if(priority && priority > 3) {
            return res.status(400).json({ message: 'Priority must be less than 6' });
        }
        const item = await WishlistItem.find({ title });
        if(item.length) {
            return res.status(400).json({ message: 'Item already exists' });
        }
        const wishlistItem = new WishlistItem({ title, description, user, priority });
        await wishlistItem.save();
        res.status(201).json({ message: 'Wishlist item created successfully', wishlistItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


wishlistRouter.put('/:id', async (req, res) => {
    try {
        const { title, description, user, priority } = req.body;
        if(!title || !description || !user) {
            return res.status(400).json({ message: 'Please provide a name, description, and user' });
        }
        const wishlistItem = await WishlistItem.findByIdAndUpdate(req.params.id, { title, description, user, priority }, { new: true });
        if(!wishlistItem) {
            return res.status(404).json({ message: 'Wishlist item not found' });
        }
        res.status(200).json({ message: 'Wishlist item updated successfully', wishlistItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

wishlistRouter.delete('/:id', async (req, res) => {
    try {
        const wishlistItem = await WishlistItem.findByIdAndDelete(req.params.id);
        if(!wishlistItem) {
            return res.status(404).json({ message: 'Wishlist item not found' });
        }
        res.status(200).json({ message: 'Wishlist item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
});

module.exports = wishlistRouter;