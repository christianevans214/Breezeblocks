'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var path = require('path');
var Build = mongoose.model('Build');
var _ = require('lodash');
module.exports = router;

router.param('id', function(req, res, next, id){
	Build.findById(id).exec()
	.then(function(app){
		if(!app) throw new Error('No app found');
		else req.app = app;
	})
	.then(null, next);
})

//GET All apps
router.get('/', function(req, res, next){
	Build.find({}).exec()
	.then(function(apps){
		res.json(apps);
	})
	.then(null, next);
});

//GET One app
router.get('/:id', function(req, res, next){
	res.json(req.app);
});

//POST new app
router.post('/', function(req, res, next){
	Build.create(req.body)
	.then(function(app){
		res.json(app);
	})
	.then(null, next);
});

//PUT update app
router.put('/:id', function(req, res, next){
	_.extend(req.app, req.body);
	req.app.save()
	.then(function(app){
		res.json(app);
	})
	.then(null, next);
});

//DELETE remove app
router.delete('/:id', function(req, res, next) {
	req.app.remove()
		.then(function() {
			res.sendStatus(200);
		})
		.then(null, next);
});
