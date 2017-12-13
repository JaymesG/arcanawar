const express = require("express");
const router = express.Router();
const app = require("../app");

module.exports = router;



function protectPrivate(req, res, next) {
    if (req.user) {
        return next();
    } else {
        console.log(req.user);
        res.redirect('/');
    }
}


router.get("/", protectPrivate, function (req, res) {
    res.render('pages/profile', {
        user: req.user
    });
});




