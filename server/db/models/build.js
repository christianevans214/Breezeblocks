var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	title: {
		type: String,
		default: "Untitled"
	},
	html: {
		type: Object,
		default: []
	},
	css: {
		type: Object,
		default: {}
	},
	gitUrl: String
})

mongoose.model('Build', schema);