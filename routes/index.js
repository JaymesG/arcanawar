var express = require('express');
var router = express.Router();

// Get Homepage (get view)
router.get('/', function(req, res){
	res.render('index');
});

module.exports = router;