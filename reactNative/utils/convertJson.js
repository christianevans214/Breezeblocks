var React = require('react-native');
// var $ = require('jquery');
// var json;

module.exports = React.createClass({
/*	getInitialState: function(){
		return {
			dataSource: '',
			loaded: false,
		}
	},*/
	componentDidMount: function(){
		this.fetchData();
	},
	fetchData: function(){
		fetch('/views')
			.then((res) => res.json())
			.then((resData) => {
				console.log(resData);
/*				this.setState({
					dataSource: resData
				});*/
			})
			.done();
	},	
	render: function() {
		return (
			<div />
		);
	}
})
