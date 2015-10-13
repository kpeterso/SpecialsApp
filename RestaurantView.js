'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Image,
  View,
  Text,
  MapView,
  LinkingIOS,
  ListView
} = React;

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1,
  },
  heading: {
    backgroundColor: '#F8F8F8',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  image: {
    width: 400,
    height: 300
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    margin: 5,
    color: '#656565'
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  },
  map: {
    height: 200,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  textContainer: {
    flex: 1
  },
});

var RestaurantView = React.createClass({
  getInitialState: function() {

    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.id !== r2.id});

    var specials = this.props.specials;

    return {
      specials: dataSource.cloneWithRows(specials),
    };
  },

  renderRow: function(rowData, sectionID, rowID) {
    return (
      <View>
        <View style={styles.rowContainer}>
          <View style={styles.textContainer}>
            <Text>{rowData.SpecialText}</Text>
            <Text numberOfLines={1}>{rowData.Restaurant}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>{rowData.Neighborhood}</Text>
            <Text>{rowData.Day}</Text>
          </View>
        </View>
        <View style={styles.separator}/>
      </View>
    );
  },

  render: function() {
    var restaurant = this.props.restaurant;

    var mapRegion = {
      latitude: restaurant.lat,
      longitude: restaurant.long,
      latitudeDelta: 0.004,
      longitudeDelta: 0.004,
    };

    var annotation = [{
      latitude: restaurant.lat,
      longitude: restaurant.long,
      title: restaurant.RestaurantName,
    }];

    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text> Name: {restaurant.RestaurantName} </Text>
          <Text> Neighborhood: {restaurant.Neighborhood} </Text>
          <View style={styles.separator}/>
        </View>
        <MapView
          region={mapRegion}
          style={styles.map}
          annotations={annotation}
        />
        <View>
          <Text onPress={() => LinkingIOS.openURL('https://instagram.com/'.concat(restaurant.instagram))}>
              @{restaurant.instagram}
          </Text>
          <Text onPress={() => LinkingIOS.openURL('https://twitter.com/'.concat(restaurant.twitter))}>
              @{restaurant.twitter}
          </Text>
          <Text onPress={() => LinkingIOS.openURL('https://'.concat(restaurant.website))}>
              Website
          </Text>
        </View>
        <Text>Specials</Text>
        <View style={styles.separator}/>
        <ListView
          dataSource={this.state.specials}
          renderRow={this.renderRow}/>
      </View>
    );
  }
});

module.exports = RestaurantView;
