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
				console.log("No github account...");
				res.status(201).download(zippedProject, function(err){
					if(err) throw err;
					else{
						console.log('zipped file was sent');
					}
				});
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
			});
		});
	})
	.then(null, next);
});

