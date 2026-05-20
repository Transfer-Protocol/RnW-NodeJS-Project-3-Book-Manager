const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');


const uploadsFolder = 'uploads';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', uploadsFolder));
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + '-File.' + file.originalname.split('.').pop());
    }
});



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
bookSchema.statics.uploader = multer({
    storage
}).single('image');

const book = mongoose.model('BookDB', bookSchema);


module.exports = book;