const express = require('express');
const router = express.Router();
const api = require('./api');
const books = require('./books');
const indexRoute = require('./indexRoute');
router.use('/', indexRoute);
router.use('/books', books);
router.use('/api', api);


module.exports = router;
