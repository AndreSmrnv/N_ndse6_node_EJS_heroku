const express = require('express');
const router = express.Router();
const {User} = require('../../models');
const stor = require('../../store');

router.post('/login', (req, res) => {
    const {users} = stor;
    res.status(201);
    res.json(users[0]);
});




module.exports = router;

