'use strict';
var router = require('express').Router();
var path = require('path');
var mongoose = require('mongoose');
var Build = mongoose.model('Build');
var generator = require('../../reactUtils/generator');
var fs = require('fs-extra');
module.exports = router;


router.post('/', function (req, res, next) {
	generator(req.body.html, req.body.css, req.body.userId, req.body.buildId)
	.then(function(zippedProject){
		//prompt user to download zipped project
		res.status(201).sendFile(zippedProject, function(err){
			if(err) console.error('Your project failed to zip correctly', err);
			else{
				console.log('download complete');
				//remove files?
				// fs.remove(directoryPath, function(err){
				// 	if(err) console.error('Error deleting', err)
				// 	else console.log("files deleted");
				// })
			}
		})
	})
	.then(function(){
		//perform github stuff if user has a github account
	})
	.then(null, next);
	
})