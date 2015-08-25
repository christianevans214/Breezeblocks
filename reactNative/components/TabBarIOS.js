'use strict';

var React = require('react-native');
var {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
} = React;

var systemIconTypes = ['bookmarks', 'contacts', 'downloads', 'favorites', 'featured', 'history', 'more', 'most-recent', 'most-viewed', 'recents', 'search', 'top-rated'];

module.exports = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: this.props.button
    };
  },

  render: function() {
    return (
      <TabBarIOS
        tintColor={this.props.tintColor}
        barTintColor={this.props.barTintColor}>
        <TabBarIOS.Item 
        systemIcon={this.props.button}
        selected={this.state.selectedTab === this.props.button}
        onPress={() => {
          this.setState({
            selectedTab: this.props.button,
          });
        }}>
        {this.props.view}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },

});

    

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});
