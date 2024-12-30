const mongoose = require('mongoose');

const WishlistItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    priority: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model('WishlistItem', WishlistItemSchema);