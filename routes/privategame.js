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


const userPoints = 20;
const aiPoints = 30;
//const userCards = _.sample(cardList, 5);
// const aiCards = _.sample(allcards, 5);

router.get("/", protectPrivate, async function (req, res) {
    console.log("here");
    const cardList = await cards.getAllCards();
    const userCards = _.sample(cardList, 5);
    res.render('pages/privategame', {
        aiHP: userPoints,
        userHP: aiPoints,
        cards: userCards
    });
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
