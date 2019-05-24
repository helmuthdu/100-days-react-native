import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Constants, Location, MapView, Permissions } from 'expo';

export default class App extends React.Component {
  state = {
    worldMap: null,
    hasLocationPermissions: false,
    location: {
      coords: {}
    }
  };

  async componentWillMount() {
    await this._getLocationAsync();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Pan, zoom, and tap on the map!</Text>
        {this.state.location === null ? (
          <Text>Finding your current location...</Text>
        ) : this.state.hasLocationPermissions === false ? (
          <Text>Location permissions are not granted.</Text>
        ) : (
          <MapView
            style={{ alignSelf: 'stretch', height: 400 }}
            region={this.state.worldMap}
            onRegionChange={this._handleWorldMapChange}
          />
        )}

        <Text>Location: {JSON.stringify(this.state.location)}</Text>
      </View>
    );
  }

  _getLocationAsync = async () => {
    // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
      this.setState({
        hasLocationPermissions: true,
        // Center the map on the location we just fetched.
        location: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
      });
    }
  };

  _handleWorldMapChange = location => {
    this.setState({ location });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e'
  }
});
