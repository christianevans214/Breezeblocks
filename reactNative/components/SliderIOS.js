'use strict';

var React = require('react-native');
var {
  SliderIOS,
  Text,
  StyleSheet,
  View,
} = React;

module.exports = React.createClass({
  getInitialState() {
    return {
      value: 0,
    };
  },

  render() {
    return (
      <View>
        <SliderIOS
          style={[this.props.style, styles.slider]}
          onValueChange={(value) => this.setState({value: value})} />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  slider: {
    margin: 10,
  },
});