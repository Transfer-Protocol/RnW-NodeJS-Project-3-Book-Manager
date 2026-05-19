const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookname: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const book = mongoose.model('BookDB', bookSchema);
module.exports = book;