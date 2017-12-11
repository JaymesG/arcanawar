var express = require('express');
var router = express.Router();

// Register (get view)
router.get('/register', function (req, res) {
    res.render('register');
});

// Login (get view)
router.get('/login', function (req, res) {
    res.render('login');
});

module.exports = router;