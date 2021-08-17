const express = require('express');
const router = express.Router();
const formData = require("express-form-data");
const {Book} = require('../../models');
const fileMiddleware = require('../../middleware/file');
const stor = require('../../store');





router.get('/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json(`book id ${id} | not found`);
    }
});

router.get('/', formData.parse(), (req, res) => {
    const {books} = stor;
    res.json(books);
});

router.post('/', formData.parse(),(req, res) => {
    const {books} = stor;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName);
    books.push(newBook);

    res.status(201);
    res.json(newBook);
});

router.put('/:id', formData.parse(),(req, res) => {
    const {books} = stor;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

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
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json(`book id ${id} | not found`);
    }
});

router.delete('/:id',formData.parse(), (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.json(true);
    } else {
        res.status(404);
        res.json(`book id ${id} | not found`);
    }
});




router.post('/upload', fileMiddleware.single('cover-img'), (req, res) => {

    console.log(req.body.id);
    const {books} = stor;
    const { id } = req.body;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        if (req.file) {
            const { path, filename } = req.file;
            console.log(path);
            console.log(filename);
            books[idx] = {
                ...books[idx],
                fileBook: filename
            };
            res.json(books[idx]);
        } else {
            res.status(204);
            res.json(`file img | not found`);
        }
    } else {
        res.status(404);
        res.json(`book id ${id} | not found`);
    }
   
});

router.get('/:id/download',formData.parse(), (req, res) => {
    const {books} = stor;
    const { id } = req.params;
    const idx = books.findIndex(el => el.id === id);
    
    if (idx !== -1) {
        console.log('download ', books[idx].fileBook);
        res.download(__dirname+`/../public/img/${books[idx].fileBook}`, `${books[idx].fileBook}`, err=>{        
            if (err){
                res.status(404).json();
            }
        });
    } else {
        res.status(404);
        res.json(`book id ${id} | not found`);
    }    
});

module.exports = router;

//GET: /api/books/:id/download