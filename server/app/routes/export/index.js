'use strict';
var router = require('express').Router();
var path = require('path');
var mongoose = require('mongoose');
var Build = mongoose.model('Build');
var generator = require('../../reactUtils/generator');
module.exports = router;

router.get('/:id', function (req, res, next) {
	Build.findById(id).exec()
	.then(function(app){
		return generator(app.html, app.css);
	})
	.then(function(folder){
		//return whole react native folder....
	})
	.then(null, next);
})