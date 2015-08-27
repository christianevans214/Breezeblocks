'use strict';

var React = require('react-native');
var TabBar = require('./tabBar.js');

var {
  Image,
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var reactNative = React.createClass({
    render: function() {
        return (
          <TabBar />
        );
    }
})

AppRegistry.registerComponent('reactNative', () => reactNative);

