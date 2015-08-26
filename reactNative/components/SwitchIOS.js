var React = require('react-native');
var {
  SwitchIOS,
  StyleSheet,
  Text,
  View,
} = React;


module.exports = React.createClass({
  getInitialState() {
    return {
      trueSwitchIsOn: true,
      falseSwitchIsOn: false,
    };
  },
  render() {
    return (
      <View>
        <SwitchIOS
          onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
          style={this.props.style}
          value={this.state.falseSwitchIsOn} />
      </View>
    );
  }
});

/*var ColorSwitchExample = React.createClass({
  getInitialState() {
    return {
      colorTrueSwitchIsOn: true,
      colorFalseSwitchIsOn: false,
    };
  },
  render() {
    return (
      <View>
        <SwitchIOS
          onValueChange={(value) => this.setState({colorFalseSwitchIsOn: value})}
          onTintColor="#00ff00"
          style={{marginBottom: 10}}
          thumbTintColor="#0000ff"
          tintColor="#ff0000"
          value={this.state.colorFalseSwitchIsOn} />
        <SwitchIOS
          onValueChange={(value) => this.setState({colorTrueSwitchIsOn: value})}
          onTintColor="#00ff00"
          thumbTintColor="#0000ff"
          tintColor="#ff0000"
          value={this.state.colorTrueSwitchIsOn} />
      </View>
    );
  },
});

module.exports = ColorSwitchExample;*/


