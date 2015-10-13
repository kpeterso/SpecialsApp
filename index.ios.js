'use strict';

var React = require('react-native');
var SearchPage = require('./SearchPage');
var Parse = require('parse').Parse;
var {
  AppRegistry,
  StyleSheet,
} = React;

Parse.initialize(
  'KEY',
  'KEY'
);

var CharlotteSpecialsApp = React.createClass({
  render: function() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Charlotte Specials',
          component: SearchPage,
        }}/>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('CharlotteSpecials', () => CharlotteSpecialsApp);
