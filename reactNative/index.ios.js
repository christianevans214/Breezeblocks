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
            <View>
              <Image source={{uri: 'https://scontent-lga1-1.xx.fbcdn.net/hphotos-xfp1/v/t1.0-9/390469_103735846412710_468610899_n.jpg?oh=c08c11408e17d55d11c05431a3f9efdb&oe=5683D084'}} style={[styles.view1Image2]}>
              </Image>
            </View>
            <View>
              <TabBarIOS 
              style={[styles.view3Tabbarios4]}> 
              <TabBarIOS.Item
                systemIcon="history"
              >
              <View></View>
              </TabBarIOS.Item>
              </TabBarIOS>
            </View>
          </View>
        );
    }
})


var styles = StyleSheet.create({
      view1:{
          height: 507.203125,
      }, 
      view1Image2:{
          flex: 1,
          height: 507.203125,
          width: 375
      }, 
      view3:{
          height: 84.171875,
      }, 
      view3Tabbarios4:{
          flex: 1,
          padding: 25,
      }, 
})

AppRegistry.registerComponent('reactNative', () => reactNative);