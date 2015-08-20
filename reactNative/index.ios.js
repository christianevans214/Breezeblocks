/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var BasicSwitch = require('./components/SwitchIOS');
var BasicScrollView = require('./components/ScrollView');
var BasicSlider = require('./components/SliderIOS');
var Navbar = require('./components/TabBarIOS');
//var actions = require('./utils/convertJson');

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
  componentDidMount: function(){
    this.fetchData();
  },
  fetchData: function(){
    fetch('http://localhost:1337/api/view')
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .done();
  },  
  render: function() {
    return (
        <Navbar title={"downloads"}/>
/*      <View>
        <BasicScrollView />
        <BasicSlider />
        <Image style={[styles.img, ]} source={{uri: "http://www.oldyelladogranch.com/puppies.jpg"}} />
      </View>*/
      

/*      <View style={styles.container}>
        <BasicSwitch />
        <Text style={styles.welcome}>
          Cooper's Smart Phone!
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>*/
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  img: {
    width: 200,
    height: 200,
  },
});

AppRegistry.registerComponent('reactNative', () => reactNative);





