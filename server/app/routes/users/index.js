'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var _ = require("lodash");
var path = require('path');
var User = mongoose.model('User');
module.exports = router;

router.param('id', function(req, res, next, id) {
	User.findById(id).populate('projects').exec()
		.then(function(user) {
			console.log("USER", user);
			if (!user) throw new Error('No user found');
			else req.user = user;
			next()
		})
		.then(null, next);
})

//GET All users
router.get('/', function(req, res, next) {
	User.find({}).populate("projects").exec()
		.then(function(users) {
			res.json(users);
		})
		.then(null, next);
});

//GET One user
router.get('/:id', function(req, res, next) {
	res.json(req.user);
});

//POST new user
router.post('/', function(req, res, next) {
	User.create(req.body)
		.then(function(user) {
			res.json(user);
		})
		.then(null, next);
});

//PUT update user
router.put('/:id', function(req, res, next) {
	_.extend(req.user, req.body);
	req.user.save()
		.then(function(user) {
			res.json(user);
		})
		.then(null, next);
});

//DELETE remove user
router.delete('/:id', function(req, res, next) {
	req.user.remove()
		.then(function() {
			res.sendStatus(200);
		})
		.then(null, next);
});