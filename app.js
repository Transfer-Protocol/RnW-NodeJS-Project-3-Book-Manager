const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const book = require('./model/bookModel.js');

mongoose.connect('mongodb://localhost:27017/bookstore').then(() => {
    console.log('Successfully connected to mongoose...');
})
.catch((err) => {
    console.log(err);
});

const app = express();
app.use(express.urlencoded());
const mediaFolder = 'uploads';
app.use('/' + mediaFolder, express.static(path.join(__dirname, mediaFolder)));
app.set('view engine', ejs);
app.set('views', __dirname + '/views');

app.get('/', async (_req, res) => {
    const datas = await book.find();
    res.render('index.ejs', {datas});
});

app.get('/bookdetail/:id', async (_req, res) => {
    const data = await book.findById(_req.params.id);
    res.render('bookdetail.ejs', {data});
});

app.get('/viewbooks', async (_req, res) => {
    const datas = await book.find();
    res.render('view-book.ejs', {datas});
});

app.post('/addbook', book.uploader, async (req, res) => {
    await book.create({
        ...req.body,
        image: req.file.filename
    });
    res.redirect('/');
});

app.post('/update', book.uploader, async (req, res) => {
    const { id, bookname, author, category, price, quantity, description } = req.body;

    const olddata = await book.findById(id);

    let oldImage = olddata.image;

    if (req.file) {
        fs.unlinkSync(path.join(__dirname, mediaFolder, oldImage));
        oldImage = req.file.filename;
    }

    await book.findByIdAndUpdate(id,
        {
            bookname,
            author,
            category,
            price,
            quantity,
            description,
            image: oldImage
        });
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
    const oldData = await book.findById(id);
    fs.unlinkSync(path.join(__dirname, mediaFolder, oldData.image));
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