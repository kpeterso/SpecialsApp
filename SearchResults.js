'use strict';

var React = require('react-native');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');
var RestaurantView = require('./RestaurantView');
var {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text,
  ActivityIndicatorIOS,
} = React;

var styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
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
  },
  container: {
    flex: 1
  },
});

var SearchResults = React.createClass({
  mixins: [ParseReact.Mixin],

  getInitialState: function() {
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.id !== r2.id});

    var specials = this.props.specials;
    var neighborhood = this.props.neighborhood;
    var drinkBools = {
      beer: this.props.beer,
      wine: this.props.wine,
      liquor: this.props.liquor
    };
    var day = this.props.day;

    var filteredDataSource = specials.filter(function(spec){
      if(spec.Neighborhood==neighborhood){
        return spec;
      }
    });

    filteredDataSource = filteredDataSource.filter(function(spec){
      if((spec.DrinkType=="beer"&&drinkBools.beer)||(spec.DrinkType=="wine"&&drinkBools.wine)||(spec.DrinkType=="liquor"&&drinkBools.liquor)){
        return spec;
      }
    });

    var finalDataSource = filteredDataSource.filter(function(spec){
      if(spec.Day==day){
        return spec;
      }
    });

    return {
      dataSource: dataSource.cloneWithRows(finalDataSource),
      isLoading: false,
      queryName: null,
      message: '',
      restaurantPressed: '',
    };
  },

  observe: function(props, state) {
    var restaurantQuery = (new Parse.Query('Restaurants'));
    return state.isLoading ? { restaurants: restaurantQuery } : null;
  },

  _executeQuery: function() {
    this.setState({
      isLoading: true,
    });
  },

  rowPressed: function(restaurant) {
    this.state.restaurantPressed = restaurant;
    this._executeQuery();
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (prevState.isLoading && (this.pendingQueries().length == 0)) {
      // 1
      this.setState({ isLoading: false });
      // 2
      if (this.queryErrors() !== null) {
          this.setState({ message: 'There was a problem fetching the results' });
          console.log('There was a problem fetching the results');
      } else
          // 3
          if (this.data.restaurants.length == 0) {
            this.setState({ message: 'No search results found' });
            console.log('No search results found');
      } else {
          // 4
          this.setState({ message: '' });
          var restaurantInfo = this.data.restaurants
            .filter(rest => rest.RestaurantName == this.state.restaurantPressed)[0];
          var restaurantSpecials = this.props.specials
            .filter(spec => spec.Restaurant == this.state.restaurantPressed);
          console.log(this.state.restaurantPressed);
          this.props.navigator.push({
              title: this.state.restaurantPressed,
              component: RestaurantView,
              passProps: {
                restaurant: restaurantInfo,
                specials: restaurantSpecials,
              }
          });
        }
    }
  },

  renderRow: function(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight onPress={() => this.rowPressed(rowData.Restaurant)}
          underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <View style={styles.textContainer}>
              <Text>{rowData.SpecialText}</Text>
              <Text numberOfLines={1}>{rowData.Restaurant}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text>{rowData.Neighborhood}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  },

  render: function() {
    var spinner = this.state.isLoading ?
      ( <ActivityIndicatorIOS
          hidden='true'
          size='large'/> ) :
      ( <View/>);
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}/>
        {spinner}
      </View>
    );
  }
});


module.exports = SearchResults;
