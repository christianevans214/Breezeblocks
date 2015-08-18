'use strict';

var React = require('react-native');
var {
  ScrollView,
  StyleSheet,
  View,
  Image
} = React;

module.exports = React.createClass({
  render: function() {
    return (
      <ScrollView
        horizontal={true}
        /*contentInset={{top: -50}}*/
        style={[styles.scrollView, styles.horizontalScrollView]}>
        {THUMBS.map(createThumbRow)}
      </ScrollView>
    );
  }
});

var Thumb = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return false;
  },
  render: function() {
    return (
      <View style={styles.button}>
        <Image style={styles.img} source={{uri:this.props.uri}} />
      </View>
    );
  }
});

var THUMBS = ['http://www.oldyelladogranch.com/puppies.jpg', 'http://www.sellcell.com/blog/wp-content/uploads/2014/03/dog-apps.jpg', 'http://vignette2.wikia.nocookie.net/austinally/images/1/19/Golden_retriever,_put_out_the_tongue,_bubbles_169414.jpg/revision/latest?cb=20131215154244', 'http://editorial.designtaxi.com/news-dogs280314/1.jpg', 'http://ak-hdl.buzzfed.com/static/enhanced/webdr02/2013/4/18/0/enhanced-buzz-11179-1366259657-8.jpg'];
THUMBS = THUMBS.concat(THUMBS); // double length of THUMBS
var createThumbRow = (uri, i) => <Thumb key={i} uri={uri} />;

var styles = StyleSheet.create({
  scrollView: {
    // backgroundColor: '#6A85B1',
    height: 300,
  },
  horizontalScrollView: {
    height: 120,
  },
  containerPage: {
    height: 50,
    width: 50,
    backgroundColor: '#527FE4',
    padding: 5,
  },
  text: {
    fontSize: 20,
    color: '#888888',
    left: 80,
    top: 20,
    height: 40,
  },
  button: {
    margin: 7,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    borderRadius: 3,
  },
  buttonContents: {
    flexDirection: 'row',
    width: 64,
    height: 64,
  },
  img: {
    width: 200,
    height: 200,
  }
});