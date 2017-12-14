const express = require("express");
const router = express.Router();
const app = require("../app");
const cards = require('../data/cards');
const _ = require('underscore');

module.exports = router;

function protectPrivate(req, res, next) {
    if (req.user) {
        return next();
    } else {
        console.log(req.user);
        res.redirect('/');
    }
}

router.get("/", protectPrivate, async function (req, res) {
    //console.log("here");
    const cardList = await cards.getAllCards();
    const userCards = _.sample(cardList, 5);
    res.render('pages/privategame', {
        // cards: userCards
    });
});

router.get("/cards", protectPrivate, async function (req, res) {
    //console.log("here");
    const cardList = await cards.getAllCards();
    const userCards = _.sample(cardList, 5);
    res.json({userCards: userCards})
});


router.post("/logout", function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/win', function (req, res, next){
    req.render('pages/win');
});

router.get('/lose', function (req, res, next){
    req.render('pages/lose');
});
