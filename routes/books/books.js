const express = require('express');
const router = express.Router();
const formData = require("express-form-data");
const {Book} = require('../../models');

const stor = require('../../store');



router.get('/', (req, res) => {
    const {books} = stor;
    res.render("books/index", {
        title: "Library",
        books,
    });

});

router.get('/create', (req, res) => {
    console.log('books/create')
    res.render("books/create", {
        title: "Library | create",
        book: {},
    });

});


router.post('/create', (req, res) => {
    const {books} = stor;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName);
    books.push(newBook);

    res.redirect('/books')

});

router.get('/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.render("books/view", {
            title: "Library | view",
            book: books[idx],
        });

    } else {
        res.status(404).redirect('/404');
    }
});

router.get('/update/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);
    if (idx !== -1) {
        res.render("books/update", {
            title: "Library | update",
            book: books[idx],
        });
    } else {
        res.status(404).redirect('/404');
    }
});

router.post('/update/:id', (req, res) => {
    const {books} = stor;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);
    //console.log(title)
    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName
        };
        res.redirect(`/books/${id}`);

    } else {
        res.status(404).redirect('/404');
    }
});





router.post('/delete/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.redirect(`/books`);
    } else {
        res.status(404).redirect('/404');
    }

});






module.exports = router;

//GET: /api/books/:id/download