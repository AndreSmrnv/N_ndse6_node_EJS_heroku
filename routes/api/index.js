const express = require('express');
const books = require('./books');
const user = require('./user');

const router = express.Router();
router.use('/user', user);
router.use('/books', books);

module.exports = router;
