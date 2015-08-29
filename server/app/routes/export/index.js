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
var chalk = require('chalk')

//for deep inspection in console
// var util = require('util');
// console.log(util.inspect(variable, false, null));

module.exports = router;

router.get('/:user/:build', function(req, res, next){
	console.log("Yup, it's here")
	var filePath = path.join(__dirname, '../../reactUtils/UserBuilds', req.params.user, 'target.zip');
	var directoryPath = path.join(__dirname, '../../reactUtils/UserBuilds', req.params.user);
	res.download(filePath, "reactNativeZipped.zip", function(err){
		if(err) console.log("There was an error downloading zipped file", err)
		// 	fs.remove(directoryPath, function(err){
		// 		if(err) console.error("error deleting", err);
		// 	});
	});

});

router.post('/', function (req, res, next) {

	var directoryPath = path.join(__dirname,'../../reactUtils/UserBuilds', req.body.userId);

	generator(req.body.pages, req.body.userId, req.body.buildId)
	.then(function(zippedProject){
		if(!zippedProject) throw err;

		return zippedProject;

	})
	.then(function(zippedProjectPath){
		//Change project title to be acceptable syntax for Github repo name
		var repoName = req.body.title.replace(/\s/ig,'_').replace(/\W/ig,'');
		
		User.findById(req.body.userId).exec()
		.then(function(currentUser){
			// user is not logged in with github
			if(!currentUser.github.username){
				console.log("this is the zipped project path", zippedProjectPath);
				res.sendStatus(201);
				//give user 5 minutes to download file before deleting
				setTimeout(function(){
					fs.remove(directoryPath, function(err){
						if(err) console.error("error deleting", err);
					});
				}, 60000*5);
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
			createNewRepo(currentUser, github, repoName, directoryPath)
			.then(function(repoInfo){
				repoData = repoInfo;
				var repo = github.getRepo(repoInfo.owner.login, repoInfo.name);
				return writeFiles(req.body.userId, req.body.buildId, repo, 'reactNative');
			})
			.then(function(){
				console.log(chalk.black.bgGreen("Files complete"));
				console.log(chalk.magenta("repoData.html_url"), chalk.blue.underline(repoData.html_url));
				res.status(201).json(repoData.html_url);
				
				fs.remove(directoryPath, function(err){
					if(err) console.error("error deleting", err);
				});
			})
			.then(null, function(err){
				var response = JSON.parse(err.request.responseText).errors;

				var errorMessage = response.filter(function(error){
					return error.message === "name already exists on this account";
				})
				if(errorMessage && errorMessage.length > 0){
					//send message to front end, to inform user to rename app.
					res.send(errorMessage[0].message);
				}
			})
		});
	})
	.then(null, next);
});

