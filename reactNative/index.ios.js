'use strict';

var React = require('react-native');
var BasicSwitch = require('./components/SwitchIOS');
var BasicScrollView = require('./components/ScrollView');
var BasicSlider = require('./components/SliderIOS');
var BasicMapView = require('./components/MapView');
var TabBar = require('./components/TabBarIOS');

var {
  MapView,
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
          <TabBar 
          button={"more"} 
          tintColor={"white"} 
          barTintColor={"darkslateblue"} 
          view={<View style={[styles.sectionText, styles.leftMargin]}><Text>Cooper Rules the World</Text></View>} />
        );
    }
})
// <BasicMapView latitude={40.7050758} longitude={-74.0091604} latitudeDelta={0} longitudeDelta={0} />


var fullImage = {uri: 'http://facebook.github.io/react/img/logo_og.png'};
var smallImage = {uri: 'http://facebook.github.io/react/img/logo_small.png'};

var styles = StyleSheet.create({
  base: {
    width: 38,
    height: 38,
  },
  progress: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    width: 100,
  },
  leftMargin: {
    marginLeft: 10,
  },
  background: {
    backgroundColor: '#222222'
  },
  sectionText: {
    marginVertical: 30,
  },
  nestedText: {
    marginLeft: 12,
    marginTop: 20,
    backgroundColor: 'transparent',
    color: 'white'
  },
  resizeMode: {
    width: 60,
    height: 90,
    borderWidth: 1,
    borderColor: 'red'
  },
  resizeModeText: {
    fontSize: 11,
    marginBottom: 3,
    borderWidth: 0.5,
    borderColor: 'blue'
  },
  icon: {
    width: 15,
    height: 15,
  },
  horizontal: {
    flexDirection: 'row',
    marginTop: 20,
    borderColor: 'black',
    borderWidth: 1,
  }
});

AppRegistry.registerComponent('reactNative', () => reactNative);

