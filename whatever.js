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
            <View>
              <Navbar title='my cool app' style={[styles.view1Navbar1]}>
              </Navbar>
              <Navbar title='my okay app' style={[styles.view1Navbar2]}>
              </Navbar>
              <Navbar title='my bad app' style={[styles.view1Navbar3]}>
              </Navbar>
              <Navbar title='the title' style={[styles.view1Navbar3]}>
              </Navbar>
            </View>
            <View>
              <Image source={{uri: 'http://www.joomlaworks.net/images/demos/galleries/abstract/7.jpg'}} style={[styles.view2Image1]}>
              </Image>
              <Image source={{uri: 'https://imgs.xkcd.com/comics/perl_problems.png'}} style={[styles.view2Image2]}>
              </Image>
            </View>
        );
    }
})


var styles = StyleSheet.create({
    
})

AppRegistry.registerComponent('reactNative', () => reactNative);

