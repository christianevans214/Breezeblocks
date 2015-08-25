'use strict';
var router = require('express').Router();
var path = require('path');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Build = mongoose.model('Build');
var generator = require('../../reactUtils/generator');
var fs = require('fs-extra');
var Github = require('github-api');
var createNewRepo = require('./githubCreator');
var writeFiles = require('../../reactUtils/writeFiles');
var fileContent = require('../../reactUtils/recursiveRead');

module.exports = router;

router.post('/', function (req, res, next) {
	generator(req.body.pages, req.body.userId, req.body.buildId)
	.then(function(zippedProject){
		//prompt user to download zipped project
		res.status(201).sendFile(zippedProject, function(err){
			//if(err) console.error('Your project failed to zip correctly', err);
			if(err) throw err;
			else{
				console.log('download complete');
				//remove files?
				// fs.remove(directoryPath, function(err){
				// 	if(err) console.error('Error deleting', err)
				// 	else console.log("files deleted");
				// })
			}
		})
		return zippedProject;

	})
	.then(function(zippedProjectPath){
		//make github repo if user has a github account
		//check user doesn't have a repo with name of new repo
		var repoName = req.body.title.replace(/\s/ig,'_').replace(/\W/ig,'');
		
		User.findById(req.body.userId).exec()
		.then(function(currentUser){
			// user is not logged in with github
			if(!currentUser.github.username){
				// either asked them to login with github, or just download zipped file
				console.log("No github account...");
				return;
			}

			var github = new Github({
				id: currentUser.github.id,
				token: currentUser.github.token,
				auth: "oauth"
			});

			createNewRepo(currentUser, github, repoName)
			.then(function(repoInfo){
				var repo = github.getRepo(repoInfo.owner.login, repoInfo.name);
				writeFiles(req.body.userId, req.body.buildId, repo, 'reactNative');
				

			})
		})
	})
	.then(null, next);
})

