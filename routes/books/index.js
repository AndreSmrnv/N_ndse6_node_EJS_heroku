const express = require('express');
const router = express.Router();

const books = require('./books');

router.use('/', books);

module.exports = router;
