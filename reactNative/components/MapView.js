'use strict';

var React = require('react-native');
var {
  MapView,
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;

var region = {
  latitude: 40.7050758, 
  longitude: -74.0091604, 
  latitudeDelta: 0.001,
  longitudeDelta: 0.001,
}

var generateRandomPins = function(region, count) {
  var count = count || 5,
      arr = [],
      pin;

  for (var i = count - 1; i >= 0; i--) {
    pin = {
      title: 'Pin number ' + i,
      subtitle: 'My cool subtitle',
      latitude: region.latitude + (region.latitudeDelta * Math.random() * 2 - region.latitudeDelta),
      longitude: region.longitude + (region.longitudeDelta * Math.random() * 2 - region.longitudeDelta)
    };

    arr.push(pin);
  };
  return arr;
};

module.exports = React.createClass({
  getInitialState() {
    return {
      mapRegion: {
        latitude: this.props.latitude, 
        longitude: this.props.longitude, 
        latitudeDelta: this.props.latitudeDelta,
        longitudeDelta: this.props.longitudeDelta,
      },
      annotations: null,
      isFirstLoad: true,
      mapRegionInput: null,
      pins: generateRandomPins(region),
    };
  },

  render() {
    return (
      <View>
        <MapView
          style={styles.map}
          onRegionChange={this._onRegionChange}
          onRegionChangeComplete={this._onRegionChangeComplete}
          region={this.state.mapRegion || undefined}
          annotations={this.state.annotations || undefined}
          showUserLocation={true}
          scrollEnabled={true}
          pitchEnabled={true}
          pins={this.state.pins}
        />
      </View>
    );
  },

  _getAnnotations(region) {
    return [{
      longitude: region.longitude,
      latitude: region.latitude,
      title: 'You Are Here',
    }];
  },

  _onRegionChange(region) {
    this.setState({
      mapRegionInput: region,
    });
  },

  _onRegionChangeComplete(region) {
    if (this.state.isFirstLoad) {
      this.setState({
        mapRegionInput: region,
        annotations: this._getAnnotations(region),
        isFirstLoad: false,
      });
    }
  },

  _onRegionInputChanged(region) {
    this.setState({
      mapRegion: region,
      mapRegionInput: region,
      annotations: this._getAnnotations(region),
    });
  },

});

var styles = StyleSheet.create({
  map: {
    height: 300,
    margin: 20,
    borderWidth: 1,
    borderColor: '#000000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    width: 150,
    height: 20,
    borderWidth: 0.5,
    borderColor: '#aaaaaa',
    fontSize: 13,
    padding: 4,
  },
  changeButton: {
    alignSelf: 'center',
    marginTop: 5,
    padding: 3,
    borderWidth: 0.5,
    borderColor: '#777777',
  },
});