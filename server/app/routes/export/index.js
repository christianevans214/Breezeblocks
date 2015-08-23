'use strict';
var router = require('express').Router();
var path = require('path');
var mongoose = require('mongoose');
var Build = mongoose.model('Build');
var generator = require('../../reactUtils/generator');
var fs = require('fs-extra');
module.exports = router;

var data = [{
	className: ['drop-area', 'view-1'],
	children: [{
			type: 'Navbar',
			className: ['ui-navbar', 'view-1-navbar-1'],
			props: [{
				"name": "title",
				"value": "my cool app",
				type: "string"
			}]
		}, {
			type: 'Navbar',
			className: ['ui-navbar', 'view-1-navbar-2'],
			props: [{
				"name": "title",
				"value": "my okay app",
				type: "string"
			}]
		}, {
			type: 'Navbar',
			className: ['ui-navbar', 'view-1-navbar-3'],
			props: [{
				"name": "title",
				"value": "my bad app",
				type: "string"
			}]
		}, {
			type: 'Navbar',
			className: ['ui-navbar', 'view-1-navbar-3'],
			props: [{
				"name": "title",
				"value": "the title",
				type: "string"
			}]
		}

	]
}, {
	className: ['drop-area', 'view-2'],
	children: [{
		type: 'Image',
		className: ["ui-image", 'view-2-image-1'],
		props: [{
			"name": "source",
			"value": "http://www.joomlaworks.net/images/demos/galleries/abstract/7.jpg",
			type: "string"
		}]
	}, {
		type: 'Image',
		className: ['ui-image', 'view-2-image-2'],
		props: [{
			"name": "source",
			"value": "https://imgs.xkcd.com/comics/perl_problems.png",
			type: "string"
		}]
	}]

}]

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

var fakeUser = "obama";
var fakeBuild = "123";

router.post('/', function(req, res, next) {
	// generator(req.body.html, req.body.css, req.body.userId, req.body.buildId)
	generator(data, styleData, fakeUser, fakeBuild)
		.then(function(zippedProject) {
			//prompt user to download zipped project
			res.status(201).sendFile(zippedProject, function(err) {
				if (err) console.error('Your project failed to zip correctly', err);
				else {
					console.log('download complete');
					//remove files?
					// fs.remove(directoryPath, function(err){
					// 	if(err) console.error('Error deleting', err)
					// 	else console.log("files deleted");
					// })
				}
			})
		})
		.then(function() {
			console.log("this is where github stuff would happen");
			//perform github stuff if user has a github account
		})
		.then(null, next);

})