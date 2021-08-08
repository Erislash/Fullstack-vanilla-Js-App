// @ts-check

const path = require('path');
const express = require('express');
const router = express.Router();
const fileSys = require('fs-extra');

const BookModel = require(path.join(__dirname, '..', 'models', 'book.js'));

// Function
// It sends a json object as a response with a msg property
// param: request {express.Request} the request object
// param: response {express.Response} the response object
const booksRoutePost = async (request, response, next) => {
    const { title, author, isbn } = request.body;
    const imgPath = `/uploads/${request.file.filename}`;
    const newBook = new BookModel({ title, author, isbn, imgPath });

    await newBook.save();

    response.json({ msg: 'New Book created' });
};

const booksRouteGet = async (request, response, next) => {
    const books = await BookModel.find();
    response.json(books);
};

const booksRouteDelete = async (request, response, next) => {
    const book = await BookModel.findByIdAndDelete(request.params.id);
    fileSys.unlink(path.resolve('backend/public' + book.imgPath));

    response.json({ msg: 'Book deleted', book: book.title });
};

router.get('/books', booksRouteGet);
router.delete('/:id', booksRouteDelete);
router.post('/books', booksRoutePost);

module.exports = router;
