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
      selectedTab: 'redTab',
    };
  },
/*  addTabBarItem: function(tabTitle: string, isSystemIcon: bool) {
    if(isSystemIcon && systemIconTypes.indexOf(tabTitle) > -1){
      return {
        <TabBarIOS.Item
          systemIcon={tabTitle}
          selected={this.state.selectedTab === tabTitle}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}>
          {this._renderContent({tabTitle})}
        </TabBarIOS.Item>
      }
    }
    return {
        <TabBarIOS.Item
          title={tabTitle}
          selected={this.state.selectedTab === tabTitle}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}>
          {this._renderContent({tabTitle})}
        </TabBarIOS.Item>
    }
  },*/
  _renderContent: function(pageText: string) {
    return (
      <View style={[styles.tabContent]}>
        <Text style={styles.tabText}>{pageText}</Text>
      </View>
    );
  },

  render: function() {
    return (
      <TabBarIOS
        tintColor="white"
        barTintColor="darkslateblue">
        {addTabBarItem("favorites", true)}
        <TabBarIOS.Item
          title="title"
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}>
        	{this._renderContent('Blue Tab')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="favorites"
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'redTab',
            });
          }}>
        	{this._renderContent('Red Tab')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="more"
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'greenTab',
            });
          }}>
          {this._renderContent('Green Tab')}
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
