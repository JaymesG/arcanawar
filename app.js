// Hashing algorithm makes login slow.

const express = require("express");
const bodyParser = require("body-parser");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const users = require('./data/users');
const cards = require('./data/cards');
// const cards = [{
//             "title": "Glare",
//             "desc": "It seems looks really can kill.",
//             "type": "Attack",
//             "value": 2
//         },
//         {
//             "title": "Final Presentation",
//             "desc": "It's like that dream, where you're standing in your underwear.",
//             "type": "Attack",
//             "value": 10
//         },
//         {
//             "title": "Black Cat",
//             "desc": "Some think black cats are unlucky, this one isn't.",
//             "type": "Defense",
//             "value": 5
//         },
//         {
//             "title": "Glowing Butterfly",
//             "desc": "Oooh, something shiny!",
//             "type": "Defense",
//             "value": 1
//         },
//         {
//             "title": "Vlad",
//             "desc": "He vants to suck your blood.",
//             "type": "Attack",
//             "value": 7
//         },
//         {
//             "title": "Lucky Goldfish",
//             "desc": "Heart of gold, this fish is worth its weight in gold.",
//             "type": "Defense",
//             "value": 6
//         },
//         {
//             "title": "Green Thumb",
//             "desc": "They said she could grow anything, so she grows vines that choke the life out of her enemy.",
//             "type": "Attack",
//             "value": 5
//         },
//         {
//             "title": "Luna Sol",
//             "desc": "Sunrise, sunset, you don't want to get this celestial being upset.",
//             "type": "Attack",
//             "value": 3
//         }, {
//             "title": "Beyonce",
//             "desc": "She doesn't really need a description.",
//             "type": "Attack",
//             "value": 10
//         },
//         {
//             "title": "Water Bender",
//             "desc": "Can heal you with the power of water.",
//             "type": "Defense",
//             "value": 10
//         },
//         {
//             "title": "Gray wolf",
//             "desc": "attack",
//             "type": "Yes, this wolf is really wicked. Spine - tingling howl is all which is required",
//             "value": 7
//         },
//         {
//             "title": "Sea cucumber",
//             "type": "defense",
//             "desc": "This isn't an ordinary Sea cucumber. It expels out its internal organs, which is sticky and very toxic",
//             "value": 8
//         }
//     ]



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

app.get("/", noDupeLogin, function (req, res) {
    res.render("pages/login");
});

function protectPrivate(req, res, next) {
    if (req.user) {
        return next();
    } else {
        res.redirect('/');
    }
}

const cardList = cards.getAllCards();
console.log("Here1: " + cardList[1]);
console.log("Here2: " + cardList);
console.log("Here3: " + JSON.stringify(cardList));
//const cardString = JSON.stringify(cardList);

const userPoints = 20;
const aiPoints = 30;
// const userCards = _.sample(allcards, 5);
// const aiCards = _.sample(allcards, 5);

app.get("/privategame", protectPrivate, function (req, res) {
    res.render('pages/privategame', {
        aiHP: userPoints,
        userHP: aiPoints,
        cards: cardList
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