'use strict';
var router = require('express').Router();
var path = require('path');
module.exports = router;

router.use('/members', require('./members'));
router.use('/build', require('./build'));
router.use('/users', require('./users'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
