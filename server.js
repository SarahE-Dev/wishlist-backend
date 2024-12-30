const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

require('dotenv').config();

app.use('/api/users', require('./routes/userRouter'));
app.use('/api/wishlist', require('./routes/wishlistRouter'));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

app.get('/', (req, res) => {
    res.json({ message: 'API Working' });
});

app.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT}`);
});