'use strict';
var router = require('express').Router();
var path = require('path');
module.exports = router;

var exampleData = [
                {
                    className: ['drop-area','view-1'],
                    children: [
                        {type: 'Navbar',
                        className: ['ui-navbar', 'view-1-navbar-1'],
                        content: ['My Cool App']
                        },
                        {type: 'Navbar',
                        className: ['ui-navbar', 'view-1-navbar-2'],
                        content: ['My Okay App']
                        },
                        {type: 'Navbar',
                        className: ['ui-navbar', 'view-1-navbar-3'],
                        content: ['My Bad App :(']
                        }

                    ]
                },
                {
                    className: ['drop-area','view-2'],
                    children: [
                        {type: 'Image',
                        className: ["ui-image",'view-2-image-1'],
                        content: ['http://www.joomlaworks.net/images/demos/galleries/abstract/7.jpg']},
                        {type: 'Image',
                        className: ['ui-image', 'view-2-image-2'],
                        content: ['https://imgs.xkcd.com/comics/perl_problems.png']}
                    ]

                }
            ];

var pathToTemplate = path.join(__dirname, './../reactUtils/template.html');
var pathToGenerator = path.join(__dirname, './../reactUtils/generator.js');

router.use('/members', require('./members'));

router.get('/view', function(req, res){
	res.send(exampleData);
});

router.get('/template', function(req, res){
	res.sendFile(pathToTemplate);
});

router.get('/generator', function(req, res){
	res.sendFile(pathToGenerator);
})

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
