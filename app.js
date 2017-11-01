// Imports:
// 'express' allows MVC implementation on server side code
// 'body-parser' populates req.body with the value of the POST command
// 'path' allows us to get other files from the project directory
// 'express-handlebars' 
const express = require('express'); 
const bodyParser = require('body-parser');
const path = require('path');
var exphbs = require('express-handlebars');

// Initialize App
let app = express();

// Initialize Routes
let routes = require('./routes/index');
let users = require('./routes/users');

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use('/', routes);
app.use('/users', users);

// Start Server
app.listen(27017, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:27017/");
});