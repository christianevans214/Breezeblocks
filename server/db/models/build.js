var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	viewCount: {
		type: Number,
		default: 1
	},
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