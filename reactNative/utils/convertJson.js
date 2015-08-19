var React = require('react-native');
var $ = require('jquery');
var json;

var actions = {
	getJson: function(){
		$.ajax({
			method: 'GET',
			url: '/view',
			success(res) {
				json = res;
				console.log("json", json);
			}
		})
	}
}

//actions.getJson();

module.exports = json;

//module.exports = actions;