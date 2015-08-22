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
var Build = Promise.promisifyAll(mongoose.model('Build'));


var wipeDB = function () {

    var models = [User, Build];
    var promiseArr = [];
    models.forEach(function (model) {
        promiseArr.push(model.find({}).remove().exec());
    });

    return Promise.all(promiseArr);

};

var users = [
    {
        email: 'testing@fsa.com',
        password: 'password'
    },
    {
        email: 'obama@gmail.com',
        password: 'potus'
    }
];

var seedBuilds = function(){
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


connectToDb.then(function(){
    wipeDB();
    console.log(chalk.cyan.bold('Database wiped clean'));
})
.then(function(){
    return seedBuilds();
})
.then(function(){
    return Build.findAsync({})
    .then(function(builds){
        var promiseArr = [];
        builds.forEach(function(build, index){
            promiseArr.push(User.createAsync({email: users[index].email, password:users[index].password, projects:build}))
        })
        return Promise.all(promiseArr);
    })
})
.then(function () {
    console.log(chalk.green('Seed successful!'));
    process.kill(0);
}).catch(function (err) {
    console.error(err);
    process.kill(1);
});
