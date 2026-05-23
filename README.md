# Book Manager System

## YouTube Explaination

[Go To YouTube Video](https://www.youtube.com/watch?v=7U5p_ecXzNs)

<br>

## Problem Definition
User want to store book data in mongodb while using Browser interface to manage book store. Image uploads happens through multer middleware.

<hr>

## Folder Structure

<pre>
Book-manager
├── app.js
├── model
│   └── bookModel.js
├── mongodbscript.txt
├── package-lock.json
├── package.json
├── uploads
│   └── photo.png
└── views
    ├── addbook.ejs
    ├── editbook.ejs
    └── index.ejs

4 directories, 9 files
</pre>

<hr>

## Features

- MongoDB Integration
- Multer Middleware
- Uses nodemon
- Uses no client-side JavaScript

<hr>

## Screenshots

### View Book (or dashboard):
<img width="1440" height="760" alt="Screenshot 2026-05-20 at 1 48 05 PM" src="https://github.com/user-attachments/assets/3873e645-bee0-4124-bb19-6f75054feb50" />

## Add Book
<img width="1440" height="720" alt="Screenshot 2026-05-20 at 1 48 25 PM" src="https://github.com/user-attachments/assets/a4f948cb-d7c9-4b6d-8f76-f90dfa56a83d" />

## Edit Book
<img width="1440" height="757" alt="Screenshot 2026-05-20 at 1 48 38 PM" src="https://github.com/user-attachments/assets/0756b180-2d9e-4b83-abae-31dea828b77b" />

<hr>

## MongoDB Schema

<pre>
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
</pre>
