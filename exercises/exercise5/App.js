
import React, { Component } from "react";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import {
  Dimensions,
  StyleSheet,
  Text, // These are not used yet, but will likely be useful later in the exercise
  TouchableOpacity,
  View
} from "react-native";
import Notification from "./notifications";

export default class App extends Component {
  state = {
    notify: false,
    message: null,
    currentLocation: null,
    location: null,
    poi1: {
      coords: {
        latitude: 33.307146,
        longitude: -111.681177
      }
    },
    poi2: {
      coords: {
        latitude: 33.423204,
        longitude: -111.939612
      }
    }
  };

  async componentDidMount() {
    const permission = await Location.requestForegroundPermissionsAsync();
    if (permission.granted) {
      this.getLocation();
    }
  }

  async getLocation() {
    let loc = await Location.getCurrentPositionAsync();
    this.setState({ location: loc, currentLocation: loc, notify: true, message: "Changed to You" });
  }

  toggleNotification = () => {
    this.setState({ notify: !this.state.notify });
  }

  showMap() {
    return this.state.currentLocation ? (
      <MapView
        style={styles.map}
        region={{
          latitude: this.state.currentLocation.coords.latitude,
          longitude: this.state.currentLocation.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
      >
        <Marker
          coordinate={this.state.currentLocation.coords}
          title={"User Location"}
          description={"You are here!"}
          image={require("./assets/you-are-here.png")}
        />
      </MapView>
    ) : null;
  }

  render() {
    const notify = this.state.notify
      ? <Notification
          autoHide
          message={this.state.message}
          onClose={this.toggleNotification}
        />
    : null;
    return (
      <View style={styles.container}>
        {this.showMap()}
        <View>
          <TouchableOpacity onPress={() => this.getLocation()} style={styles.btn}>
            <Text>YOU</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ ...this.state, currentLocation: this.state.poi1, notify: true, message: "Changed to POI1" })} style={styles.btn}>
            <Text>POI1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ ...this.state, currentLocation: this.state.poi2, notify: true, message: "Changed to POI2" })} style={styles.btn}>
            <Text>POI2</Text>
          </TouchableOpacity>
        </View>

        {notify}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 10
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  map: {
    flex: 7,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  btn: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 3,
    marginTop: 10
  }
});