var mongoose = require('mongoose');
var shortid = require("shortid");

var schema = new mongoose.Schema({
	viewCount: {
		type: Number,
		default: 1
	},
	title: {
		type: String,
		unique: true,
		default: shortid.generate
	},
	gitName: String,
	html: {
		type: Object,
		default: []
	},
	css: {
		type: Object,
		default: {}
	},
	gitUrl: String,
})

schema.pre('save', function(next) {
	this.gitName = this.title.replace(/\s/ig, '_').replace(/\W/ig, '');
	next();
})

mongoose.model('Build', schema);