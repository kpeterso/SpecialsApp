'use strict';

var React = require('react-native');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  SwitchIOS,
  ListView,
} = React;

var styles = StyleSheet.create({
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
});

var DayChange = React.createClass({
  getInitialState: function() {
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.id !== r2.id});
    return {
      dataSource: dataSource.cloneWithRows(this.props.weekdays)
    };
  },

  rowPressed: function(day) {
    this.props.route.callback(day);
    this.props.navigator.pop();
  },

  renderRow: function(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight onPress={() => this.rowPressed(rowData)}
          underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <View  style={styles.textContainer}>
              <Text numberOfLines={1}>{rowData}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  },

  render: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}/>
    );
  }
});

module.exports = DayChange;
