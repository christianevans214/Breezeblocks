/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Build = Promise.promisifyAll(mongoose.model("Build"));

var seedBuilds = function() {
    var builds = [{
        html: [{
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

        }],
        css: {
            'view-1': {
                'height': '40px'
            },
            'view-1-navbar-1': {
                'background-color': '#F00',
                'flex-grow': 2
            },
            'view-1-navbar-2': {
                'background-color': '#0F0',
                'flex-grow': 1
            },
            'view-1-navbar-3': {
                'background-color': '#00F',
                'flex-grow': 1
            },
            'view-2': {
                'height': '30px'
            },
            'view-2-image-1': {
                'flex-grow': 1
            },
            'view-2-image-2': {
                'flex-grow': 4
            }
        }
    }, {
        html: [{
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

        }],
        css: {
            'view-1': {
                'height': '40px'
            },
            'view-1-navbar-1': {
                'background-color': '#F00',
                'flex-grow': 2
            },
            'view-1-navbar-2': {
                'background-color': '#0F0',
                'flex-grow': 1
            },
            'view-1-navbar-3': {
                'background-color': '#00F',
                'flex-grow': 1
            },
            'view-2': {
                'height': '30px'
            },
            'view-2-image-1': {
                'flex-grow': 1
            },
            'view-2-image-2': {
                'flex-grow': 4
            }
        }

    }]
    return Build.createAsync(builds)
}



var users = [{
    email: 'testing@fsa.com',
    password: 'password'
}, {
    email: 'obama@gmail.com',
    password: 'potus'
}];


connectToDb.then(function() {
    mongoose.connection.db.dropDatabase(function() {
        seedBuilds()
            .then(function(buildsArr) {
                console.log("buildsArr", buildsArr);
                users.map(function(user, index) {
                    user.projects = [buildsArr[i]._id]
                    return user;
                })
                Users.create(users)
                    .then(function(users) {
                        console.log('Seed completed');
                        process.kill(0);
                    })
            })
    })
});