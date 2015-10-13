'use strict';

var React = require('react-native');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');
var SearchResults = require('./SearchResults');
var NeighborhoodChange = require('./NeighborhoodChange');
var DayChange = require('./DayChange');
var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  SwitchIOS,
  TouchableOpacity,
} = React;

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 0.25,
    marginRight: 4,
    flexDirection: 'row',
    backgroundColor: '#444444',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  locButton: {
    height: 36,
    flex: 0.25,
    marginRight: 4,
    flexDirection: 'row',
    backgroundColor: '#444444',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    margin: 10,
  },
  buttonsContainer: {
    width: 275,
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
  },
  beerButton: {
    flex: 0.3,
    flexDirection: 'row',
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CC9900',
    margin:5,
    //shadowRadius: 2,
    //shadowColor: '#999999',
    //shadowOffset: {width: 1.5, height: 1.5},
    //shadowOpacity: 50,
    //opacity: .5,
  },
  wineButton: {
    flex: 0.3,
    flexDirection: 'row',
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#7F0011',
    margin:5,
  },
  liquorButton: {
    flex: 0.3,
    flexDirection: 'row',
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#1F3D83',
    margin:5,
  },
  image: {
    width: 32,
    height: 32
  }
});

var SearchPage = React.createClass({
  mixins: [ParseReact.Mixin],

  getInitialState: function() {

    var d = new Date();
    var dayoftheweek = d.getDay();

    var days = new Array(7);
    days[0]=  "Sunday";
    days[1] = "Monday";
    days[2] = "Tuesday";
    days[3] = "Wednesday";
    days[4] = "Thursday";
    days[5] = "Friday";
    days[6] = "Saturday";

    return {
      searchString: 'Bay Area',
      isLoading: false,
      message: '',
      queryName: null,
      queryGeo: {},
      beer: true,
      wine: true,
      liquor: true,
      neighborhood: 'Dilworth',
      neighborhoods: ['Dilworth', 'Elizabeth', 'NoDa', 'Plaza Midwood', 'South End', 'Uptown'],
      weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      day: dayoftheweek,
      dayString: days[dayoftheweek],
      beerOpac: 1,
    };
  },

  observe: function(props, state) {
    var listingQuery = (new Parse.Query('Specials'));
    if (state.queryName) {
        //listingQuery.equalTo('DrinkType', state.queryName.toLowerCase());
    } else
        // 1
        if (state.queryGeo && state.queryGeo.latitude &&
            state.queryGeo.longitude
    ) {
        // 2
        var geoPoint = new Parse.GeoPoint({
            latitude: state.queryGeo.latitude,
            longitude: state.queryGeo.longitude,
        });
        // 3
        listingQuery.withinMiles('location', geoPoint, 25);
    }
    return state.isLoading ?  { listings: listingQuery } : null;
  },

  _executeQuery: function(nameSearchQuery, geoSearchQuery) {
    this.setState({
      isLoading: true,
      message: '',
      queryName: nameSearchQuery,
      queryGeo: geoSearchQuery,
    });
  },

  beerStyle: function() {
    if(this.state.beer){
      return {
        flex: 0.3,
        flexDirection: 'row',
        borderRadius: 8,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CC9900',
        margin:5,
        shadowRadius: 2,
        shadowColor: '#999999',
        shadowOffset: {width: 1.5, height: 1.5},
        shadowOpacity: 50,
        opacity: 1,
      };
    } else {
      return {
        flex: 0.3,
        flexDirection: 'row',
        borderRadius: 8,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CC9900',
        margin:5,
        //shadowRadius: 2,
        //shadowColor: '#999999',
        //shadowOffset: {width: 1.5, height: 1.5},
        //shadowOpacity: 50,
        opacity: .5,
      };
    }
  },

  wineStyle: function() {
    if(this.state.wine){
      return {
        flex: 0.3,
        flexDirection: 'row',
        borderRadius: 8,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7F0011',
        margin:5,
        shadowRadius: 2,
        shadowColor: '#999999',
        shadowOffset: {width: 1.5, height: 1.5},
        shadowOpacity: 50,
        opacity: 1,
      };
    } else {
      return {
        flex: 0.3,
        flexDirection: 'row',
        borderRadius: 8,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7F0011',
        margin:5,
        //shadowRadius: 2,
        //shadowColor: '#999999',
        //shadowOffset: {width: 1.5, height: 1.5},
        //shadowOpacity: 50,
        opacity: .5,
      };
    }
  },

  liquorStyle: function() {
    if(this.state.liquor){
      return {
        flex: 0.3,
        flexDirection: 'row',
        borderRadius: 8,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1F3D83',
        margin:5,
        shadowRadius: 2,
        shadowColor: '#999999',
        shadowOffset: {width: 1.5, height: 1.5},
        shadowOpacity: 50,
        opacity: 1,
      };
    } else {
      return {
        flex: 0.3,
        flexDirection: 'row',
        borderRadius: 8,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1F3D83',
        margin:5,
        //shadowRadius: 2,
        //shadowColor: '#999999',
        //shadowOffset: {width: 1.5, height: 1.5},
        //shadowOpacity: 50,
        opacity: .5,
      };
    }
  },

  onBeerPressed: function() {
    this.setState({beer:!this.state.beer});
  },

  onWinePressed: function() {
    this.setState({wine:!this.state.wine});
  },

  onLiquorPressed: function() {
    this.setState({liquor:!this.state.liquor});
  },

  onSearchPressed: function() {
    this._executeQuery(this.state.searchString, {});
  },

  onLocationPressed: function() {
    navigator.geolocation.getCurrentPosition(
      location => {
        this._executeQuery(
          null,
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        );
      },
      error => {
        this.setState({
          message: 'There was a problem with obtaining your locaton: ' + error
        });
      });
  },

  onNeighborhoodPressed: function () {
    this.props.navigator.push({
        title: 'Choose Neighborhood',
        component: NeighborhoodChange,
        passProps: {neighborhoods: this.state.neighborhoods},
        callback: this.neighborhoodCallback,
    });
  },

  onDayPressed: function () {
    this.props.navigator.push({
        title: 'Choose the Day of the Week',
        component: DayChange,
        passProps: {weekdays: this.state.weekdays},
        callback: this.dayCallback,
    });
  },

  neighborhoodCallback: function(args) {
    this.state.neighborhood = args;
  },

  dayCallback: function(args) {
    console.log(args);
    this.state.dayString = args;
    this.state.day = this.state.weekdays.indexOf(args);
  },

  onSearchTextChanged: function(event) {
    this.setState({ searchString: event.nativeEvent.text });
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (prevState.isLoading && (this.pendingQueries().length == 0)) {
      // 1
      this.setState({ isLoading: false });
      // 2
      if (this.queryErrors() !== null) {
          this.setState({ message: 'There was a problem fetching the results' });
      } else
          // 3
          if (this.data.listings.length == 0) {
          this.setState({ message: 'No search results found' });
      } else {
          // 4
          this.setState({ message: '' });
          this.props.navigator.push({
              title: 'Specials',
              component: SearchResults,
              passProps: {
                specials: this.data.listings,
                neighborhood: this.state.neighborhood,
                day: this.state.day,
                beer: this.state.beer,
                wine: this.state.wine,
                liquor: this.state.liquor
              }
          });
      }
    }
  },

  render: function() {
    var spinner = this.state.isLoading ?
      ( <ActivityIndicatorIOS
          hidden='true'
          size='large'/> ) :
      ( <View/>);

    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Search for specials in Charlotte!
        </Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={this.beerStyle()}
              onPress={this.onBeerPressed}
              activeOpacity={0.5}>
            <Image source={require('image!beer')} style={styles.image}/>
          </TouchableOpacity>
          <TouchableOpacity style={this.wineStyle()}
              onPress={this.onWinePressed}
              activeOpacity={0.5}>
            <Image source={require('image!wine')} style={styles.image}/>
          </TouchableOpacity>
          <TouchableOpacity style={this.liquorStyle()}
              onPress={this.onLiquorPressed}
              activeOpacity={0.5}>
            <Image source={require('image!martini')} style={styles.image}/>
          </TouchableOpacity>
        </View>
        <View style={styles.flowRight}>
          <Text style={styles.text} >
            Neighborhood: {this.state.neighborhood}
          </Text>
          <TouchableHighlight style={styles.locButton}
              onPress={this.onNeighborhoodPressed}
              underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Change</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.flowRight}>
          <Text style={styles.text} >
            Day: {this.state.dayString}
          </Text>
          <TouchableHighlight style={styles.locButton}
              onPress={this.onDayPressed}
              underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Change</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight style={styles.button}
            onPress={this.onSearchPressed}
            underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Get Specials</Text>
        </TouchableHighlight>
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
});

module.exports = SearchPage;
