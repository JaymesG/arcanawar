const express = require("express");
const router = express.Router();
const app = require("../app");
const db = require("../data/users");

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
        user: req.user,

    });
});

router.post("/", protectPrivate, async function (req, res) {
    console.log(req.user.valueOf());
    console.log("favoriteCard : " + JSON.stringify(req.user.favoriteCard));
    await db.updateUserProfile(req.user, req.user.username, req.body.favoriteCard);
    res.render('pages/profile', {
        user: req.user,
    });
});




