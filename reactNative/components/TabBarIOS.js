'use strict';

var React = require('react-native');
var BasicScrollView = require('./ScrollView');
var BasicListView = require('./ListView');

var {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  ScrollView,
  ListView,
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
        <TabBarIOS.Item 
        systemIcon="favorites"
        style={styles.tabText}
        selected={this.state.selectedTab === "favorites"}
        onPress={() => {
          this.setState({
            selectedTab: "favorites",
          });
        }}>
        <BasicScrollView />
        </TabBarIOS.Item>
        <TabBarIOS.Item 
        systemIcon="history"
        selected={this.state.selectedTab === "history"}
        onPress={() => {
          this.setState({
            selectedTab: "history",
          });
        }}>
        <BasicListView />
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
