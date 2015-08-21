'use strict';

var React = require('react-native');
var BasicSwitch = require('./components/SwitchIOS');
var BasicScrollView = require('./components/ScrollView');
var BasicSlider = require('./components/SliderIOS');
var Navbar = require('./components/TabBarIOS');

var {
  TabBarIOS,
  Image,
  SliderIOS,
  ScrollView,
  SwitchIOS,
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var reactNative = React.createClass({
    render: function() {
        return (
            <View style={[styles.container, styles.test]}><BasicScrollView style={[styles.somerandomclass, styles.somerandomclass2]} horizontally='true'/><BasicScrollView style={[styles.someotherclass, styles.someotherclass2]} horizontally='false'/></View>
        );
    }
})


var styles = StyleSheet.create({
    container: {flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor: '#F5FCFF',},
})

AppRegistry.registerComponent('reactNative', () => reactNative);

