'use strict';

var React = require('react-native');

var {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} = React;

var textInput;

module.exports = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2});
    textInput = this.props.dataSource;
    return {
      dataSource: ds.cloneWithRows(this.props.dataSource),
    };
  },
  render: function() {
    return (
      <ListView
        style={this.props.style} 
        dataSource={this.state.dataSource}
        renderRow={this.renderInput}
      />
    );
  },
  renderInput: function(item){
    return (
      <View>
        <Text style={this.props.style}>{item}</Text>
      </View>
    );
  }
});



