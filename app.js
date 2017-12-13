// Hashing algorithm makes login slow.

const express = require("express");
const bodyParser = require("body-parser");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const users = require('./data/users');
const cards = require('./data/cards');
const _ = require('underscore');
const app = express();
const exphbs = require("express-handlebars");
const handlebars = require("handlebars");

app.use(bodyParser.json());
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('express-session')({secret: 'top secret', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    function (username, password, done) {
        users.getUserByUsername(username).then((user) => {
            bcrypt.compare(password, user.hashedPassword, (err, res) => {
                if (res === true) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }).catch(function () {
            return done(null, false);
        });
    }));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    users.getUserById(id).then((user) => {
        if (!user) {
            return done("Error");
        }
        done(null, user);
    });
});

function noDupeLogin(req, res, next) {
	if (req.user) {
		res.redirect('privategame');
	} else {
		return next();
	}
}

app.get("/", noDupeLogin, async function (req, res) {
    res.render("pages/login");
});

function protectPrivate(req, res, next) {
    if (req.user) {
        return next();
    } else {
        res.redirect('/');
    }
}


//const cardString = JSON.stringify(cardList);

const userPoints = 20;
const aiPoints = 30;
//const userCards = _.sample(cardList, 5);
// const aiCards = _.sample(allcards, 5);

app.get("/privategame", protectPrivate, async function (req, res) {
    const cardList = await cards.getAllCards();
    const userCards = _.sample(cardList, 5);
    res.render('pages/privategame', {
        aiHP: userPoints,
        userHP: aiPoints,
        cards: userCards
    });
});

app.get("/profile", protectPrivate, function (req, res) {
    res.render('pages/profile', {
        user: req.user
    });
});

app.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.render('pages/login', {
                message: "Authentication Failed"
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/privategame');
        });
    })(req, res, next);
});

app.post("/logout", function (req, res) {
    req.logout();
    res.redirect('/');
});

app.listen(27017, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:27017/");
});