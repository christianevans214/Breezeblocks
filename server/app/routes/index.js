'use strict';
var router = require('express').Router();
var path = require('path');
module.exports = router;


var pathToTemplate = path.join(__dirname, './../reactUtils/template.html');
var pathToGenerator = path.join(__dirname, './../reactUtils/generator.js');

router.use('/members', require('./members'));

router.get('/view', function(req, res){
	res.send(exampleData);
});

router.get('/template', function(req, res){
	res.sendFile(pathToTemplate);
});

router.get('/generator', function(req, res){
	res.sendFile(pathToGenerator);
})

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
