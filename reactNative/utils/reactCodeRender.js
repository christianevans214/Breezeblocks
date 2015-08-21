var React = require('react-native');
var convertJson = require('./convertJson.js');
// var $ = require('jquery');
// var json;

var{
	View,
	Text
} = React;

module.exports = React.createClass({
	getInitialState: function(){
		return {
			reactDOM: ""
		}
	},
	componentDidMount: function(){
		this.fetchData();
	},
	fetchData: function(){
		fetch('http://localhost:1337/api/view')
			.then((res) => res.json())
			.then((resData) => {
				this.setState({
					reactDOM: convertJson(resData)
				})
				// console.log("this", reactDOM);
			})
			.done();
	},	
	render: function() {
		return (

			<View>{this.state.reactDOM}</View>
		);
	}
})