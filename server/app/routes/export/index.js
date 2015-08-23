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
var Commit = require('./commit');
module.exports = router;

//SAMPLE DATA -> DELETE ONCE ROUTE IS WORKING CORRECTLY
var htmlData = [
    {
        className: ['drop-area','view-1'],
        children: [
            {type: 'Navbar',
             className: ['ui-navbar', 'view-1-navbar-1'],
             props: [
                 { "name": "title", "value": "my cool app", type: "string" }
             ]
            },
            {type: 'Navbar',
             className: ['ui-navbar', 'view-1-navbar-2'],
             props: [
                 { "name": "title", "value": "my okay app", type: "string" }
             ]
            },
            {type: 'Navbar',
             className: ['ui-navbar', 'view-1-navbar-3'],
             props: [
                 { "name": "title", "value": "my bad app", type: "string" }
             ]
            },
            {type: 'Navbar',
             className: ['ui-navbar', 'view-1-navbar-3'],
             props: [
                 { "name": "title", "value": "the title", type: "string" }
             ]
            }

        ]
    },
    {
        className: ['drop-area','view-2'],
        children: [
            {type: 'Image',
             className: ["ui-image",'view-2-image-1'],
                 props: [
                 { "name": "source", "value": "http://www.joomlaworks.net/images/demos/galleries/abstract/7.jpg", type: "string" }
             ]
            },
            {type: 'Image',
             className: ['ui-image', 'view-2-image-2'],
             props: [
                 { "name": "source", "value": "https://imgs.xkcd.com/comics/perl_problems.png", type: "string" }
             ]    
            }             
        ]

    }
]


var styleData = {
    "view1": {
        "flex": '1',
        "justify-content": 'center',
        "align-items": 'center',
        "background-color": '#F5FCFF',
    },
    "img1": {
        "width": '200px',
        "height": '200px',
    },
    "view2": {
        "flex": '1',
        "justify-content": 'center',
        "align-items": 'center',
        "background-color": '#F5FCFF',
    },
    "img2": {
        "width": '200px',
        "height": '200px',
    }
};


var data = {
	html: htmlData,
	css: styleData,
	userId: "55d9f2c2085bdd22ea5af6d0",
    buildId: "1234567"
}

router.post('/', function (req, res, next) {
	//generator(req.body.html, req.body.css, req.body.userId, req.body.buildId)
	generator(data.html, data.css, data.userId, data.buildId)
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

		// User.findById(req.body.userId).exec()
		User.findById(data.userId).exec() //fix data
		.then(function(currentUser){
			// user is not logged in with github
			if(!currentUser.github.username){
				// either asked them to login with github, or just download zipped file
				console.log("No github account...")
				return;
			}

			var github = new Github({
				id: currentUser.github.id,
				token: currentUser.github.token,
				auth: "oauth"
			});
			createNewRepo(currentUser, github)
			.then(function(repoInfo){
				//instantiate the Commit object
				var commit = new Commit(github, repoInfo.owner.login, repoInfo.name, 'heads/master')

				//I want to commit something!
				commit.commit(
				    [{
				      path: 'test.txt',
				      content: 'Some content for this file'
				    }],
				    'Exported BreezeBlocks Project',
				    function(err, data){
				      //data is the response from the reference update.
				      if(err) console.log(err);
				      else console.log("data", data);
				    }
				  )
/*				console.log("repoInfo", repoInfo.owner.login, repoInfo.name);
				var repo = github.getRepo(repoInfo.owner.login, repoInfo.name);
				repo.write('master', 'https://github.com/cez213/Test.git', zippedProjectPath, 'Exported BreezeBlocks Project', function(err) {
					console.log("writing to file");
					if(err) console.log(err);
				});*/
			})
		})
	})
	.then(null, next);
	
})
