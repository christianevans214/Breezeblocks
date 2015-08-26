'use strict';

var React = require('react-native');
var SwitchIOS = require('./components/SwitchIOS');
var ScrollView = require('./components/ScrollView');
var SliderIOS = require('./components/SliderIOS');
var TabBarIOS = require('./components/TabBarIOS');
var MapView = require('./components/MapView');
var ListView = require('./components/ListView');

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
          <View>
            <ScrollView 
              dataSource={["https://scontent-lga1-1.xx.fbcdn.net/hphotos-xap1/v/t1.0-9/1069194_2523046039889_1801474618_n.jpg?oh=e3a4cf4b3483c78a114e709cfdcac9cc&oe=567D3E03", "http://www.sellcell.com/blog/wp-content/uploads/2014/03/dog-apps.jpg", "http://www.oldyelladogranch.com/puppies.jpg", "http://vignette2.wikia.nocookie.net/austinally/images/1/19/Golden_retriever,_put_out_the_tongue,_bubbles_169414.jpg/revision/latest?cb=20131215154244"]}
              style={[styles.view1Scrollview12]}
              img={styles.view1ScrollImg12}
              contentInset={{top: 50}}>
            </ScrollView>

            <View>
              <MapView 
              latitude={40.7050758} 
              longitude={-74.0091604} 
              latitudeDelta={0.001} 
              longitudeDelta={0.001} 
              style={styles.map}/>
            </View>
            <TabBarIOS />
          </View>
        );
    }
})


var styles = StyleSheet.create({
      view1:{
          //flex: 1,
      }, 
      view3:{
          height: 84.171875,
      }, 
      view1ScrollImg12:{
          flex: 1,
          height: 200,
          width: 200,
      },  
      view13:{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
      }, 
      view13Switchios14:{
          flex: 1,
          marginLeft: 60,
          alignItems: 'center',
      }, 
      view13Navbar15:{
          height: 206.25,
          flex: 1,
          fontSize: 28,
          paddingBottom: 92,
          paddingTop: 65,
          textAlign: 'center',
          margin: 0,
          color: '#887ef8',
          backgroundColor: '#c5c7d8',
      }, 
      view16:{
          height: 144,
      }, 
      view16Listview17:{
          flex: 1,
          fontSize: 17,
          color: '#941751',
          backgroundColor: '#73fcd6',
      },
      map: {
        width: 375,
      } 
})

AppRegistry.registerComponent('reactNative', () => reactNative);