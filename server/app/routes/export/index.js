'use strict';
var router = require('express').Router();
var path = require('path');
var mongoose = require('mongoose');
var Build = mongoose.model('Build');
var generator = require('../../reactUtils/generator');
module.exports = router;

router.post('/', function (req, res, next) {
	generator(req.body.html, req.body.css)
	.then(function(){
		res.sendStatus(200);
	})
	.then(null, next);
	
	//return whole react native folder....
})