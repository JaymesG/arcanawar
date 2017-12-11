const express = require("express");
const bodyParser = require("body-parser");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
//const users = require('./data/users');
const app = express();
const exphbs = require("express-handlebars");
const handlebars = require("handlebars");

const users = require("./userDatabaseUserCollection");
const cards = require("./cardCollection");

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
		res.redirect('/private');
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

app.get("/private", protectPrivate, function (req, res) {
    res.render('pages/private', {
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
            return res.redirect('/private');
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


// Dependencies:
// 'express' allows MVC implementation on server side code
// 'body-parser' populates req.body with the value of the POST command
// 'path' allows us to get other files from the project directory
// 'express-handlebars' allows us to construct different views for different pages
// const express = require('express'); 
// const bodyParser = require('body-parser');
// const path = require('path');
// var exphbs = require('express-handlebars');

// Initialize App
// let app = express();

// Initialize Routes
// let routes = require('./routes/index');
// let users = require('./routes/users');

// View Engine
// app.set('views', path.join(__dirname, 'views'));
// app.engine('handlebars', exphbs({defaultLayout:'layout'}));
// app.set('view engine', 'handlebars');

// BodyParser Middleware
// app.use(bodyParser.json());

// Set Static Folder (for bootstrap)
// app.use(express.static(path.join(__dirname, 'public')));

// Add routes to express application
// app.use('/', routes);
// app.use('/users', users);

// Start Server
// app.listen(27017, () => {
//     console.log("We've now got a server!");
//     console.log("Your routes will be running on http://localhost:27017/");
// });