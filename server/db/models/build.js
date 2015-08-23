var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	title: String,
	html: {
		type: [Object]
	},
	css: {
		type: Object
	},
	gitUrl: String
})

mongoose.model('Build', schema);