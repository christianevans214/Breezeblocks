var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	html: {
		type: Object
	},
	css: {
		type: Object
	},
	gitUrl: String
})

mongoose.model('Build',schema)