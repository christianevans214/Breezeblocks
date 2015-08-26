'use strict';
var router = require('express').Router();
var path = require('path');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Build = mongoose.model('Build');
var generator = require('../../reactUtils/generator');
var fs = require('fs-extra');
var Github = require('github-api');
var createNewRepo = require('../../reactUtils/githubCreator');
var writeFiles = require('../../reactUtils/writeFiles');
var fileContent = require('../../reactUtils/recursiveRead');
var _ = require('lodash');

//for deep inspection in console
// var util = require('util');
// console.log(util.inspect(variable, false, null));

module.exports = router;

router.post('/', function (req, res, next) {
	// console.log(util.inspect(req.body.pages, false, null));
	generator(req.body.pages, req.body.userId, req.body.buildId)
	.then(function(zippedProject){
		if(!zippedProject) throw err;
		else{
			console.log('download complete');
		}
		return zippedProject;

	})
	.then(function(zippedProjectPath){
		//Change project title to be acceptable syntax for Github repo name
		var repoName = req.body.title.replace(/\s/ig,'_').replace(/\W/ig,'');
		
		User.findById(req.body.userId).exec()
		.then(function(currentUser){
			// user is not logged in with github
			if(!currentUser.github.username){
				console.log("No github account...");
				res.status(201).sendFile(zippedProject, function(err){
					if(err) throw err;
					else{
						console.log('zipped file was sent');
					}
				})
				return;
			}

			//Authenticate github user
			var github = new Github({
				id: currentUser.github.id,
				token: currentUser.github.token,
				auth: "oauth"
			});
			
			var repoData;
			//create new repo then write all files to new repo
			createNewRepo(currentUser, github, repoName)
			.then(function(repoInfo){
				repoData = repoInfo;
				var repo = github.getRepo(repoInfo.owner.login, repoInfo.name);
				return writeFiles(req.body.userId, req.body.buildId, repo, 'reactNative');
			})
			.then(function(){
				console.log("repoData.html_url", repoData.html_url)
				res.status(201).json(repoData.html_url);
/*				Build.findById(req.body.buildId).exec()
				.then(function(project){
					project.gitUrl = repoData.html_url;
					project.save()
					.then(function(updatedProject){
						res.status(201).json(project);
					})
				})*/
			})
		})
	})
	.then(null, next);
})

