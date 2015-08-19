'use strict';
var router = require('express').Router();
var json = require('./view.json');
console.log(json);
module.exports = router;

router.use('/members', require('./members'));

router.get('/view', function(req, res){
	res.send(json);
});

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
