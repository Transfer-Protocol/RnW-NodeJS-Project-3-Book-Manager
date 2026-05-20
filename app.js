const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const path = require('path');

const book = require('./model/bookModel.js');

mongoose.connect('mongodb://localhost:27017/bookstore').then(() => {
    console.log('Successfully connected to mongoose...');
})
.catch((err) => {
    console.log(err);
});

const app = express();
app.use(express.urlencoded());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.set('view engine', ejs);
app.set('views', __dirname + '/views');

app.get('/', async (_req, res) => {
    const datas = await book.find();
    res.render('index.ejs', {datas});
});

app.post('/addbook', book.uploader, async (req, res) => {
    await book.create({
        ...req.body,
        image: req.file.filename
    });
    res.redirect('/');
});

app.post('/update', async (req, res) => {
    const { id, bookname, author, category, price, quantity, description, image } = req.body;
    await book.findByIdAndUpdate(id, {bookname, author, category, price, quantity, description, image});
    res.redirect('/');
});

app.get('/editbook/:id', async (req, res) => {
    const id = req.params.id;
    res.render('editbook.ejs', {
        targetbook: await book.findById(id)
    })
});

app.get('/addbook', (_req, res) => {
    res.render('addbook.ejs');
});

app.get('/delete/:id', async (req, res) => {
    const id = req.params.id;
    await book.findByIdAndDelete(id);
    res.redirect('/');
    res.end();
});

app.listen(32767, (err) => {
    if (err)
        console.log(err);
    else
        console.log('Server is listening on http://localhost:32767');
})