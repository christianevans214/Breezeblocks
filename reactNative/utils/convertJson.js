var React = require('react-native');

module.exports = React.createClass({
	getInitialState: function(){
		return {
			loaded: false,
			json: '',
		}
	},
  componentDidMount: function(){
    this.fetchData();
  },
  fetchData: function(){
    fetch('http://localhost:1337/api/view')
      .then((res) => res.json())
      .then((res) => {
      	this.
        console.log(res);
      })
      .done();
  },  
  render: function() {
  	return (

  	);
  }
})
