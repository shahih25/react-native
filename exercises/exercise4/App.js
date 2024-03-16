
import React, { Component } from 'react';
import {Picker} from '@react-native-picker/picker'; // You'll need this for the exercise
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const key1 = '@MyApp:key1';
const key2 = '@MyApp:key2';
const key3 = '@MyApp:key3';

export default class App extends Component {
  state = {
    text1: '',
    text2: '',
    text3: '',
    storedValue1: '',
    storedValue2: '',
    storedValue3: '',
  };

  componentDidMount() {
    this.onLoad();
  }

  onLoad = async () => {
    try {
      const data = await AsyncStorage.multiGet([key1, key2, key3]);
      const [[k1, v1], [k2, v2], [k3, v3]] = data
      this.setState({ storedValue1: v1 });
      this.setState({ storedValue2: v2 });
      this.setState({ storedValue3: v3 });
    } catch (error) {
      Alert.alert('Error', 'There was an error while loading the data');
    }
  }

  onSave = async () => {
    const { text1, text2, text3 } = this.state;
    try {
      await AsyncStorage.multiSet([
        [key1, text1],
        [key2, text2],
        [key3, text3]
      ]);
      Alert.alert('Saved', 'Successfully saved on device');
    } catch (error) {
      Alert.alert('Error', 'There was an error while saving the data');
    }
  }

  render() {
    const { storedValue1, storedValue2, storedValue3 } = this.state;
    const { text1, text2, text3 } = this.state;

    const stars = [
      {
        "id": 1,
        "name": "1 Star"
      },
      {
        "id": 2,
        "name": "2 Stars"
      },
      {
        "id": 3,
        "name": "3 Stars"
      },
      {
        "id": 4,
        "name": "4 Stars"
      },
      {
        "id": 5,
        "name": "5 Stars"
      }
    ]

    return (
      <View style={styles.container}>
        <Text style={styles.preview}>
          {
            `Picker 1: ${storedValue1 ? storedValue1 : 0}\nPicker 2: ${storedValue2 ? storedValue2 : 0}\nPicker 3: ${storedValue3 ? storedValue3 : 0}`
          }
        </Text>
        <View>
          <Picker
            itemStyle={{height: 50}}
            style={styles.input}
            selectedValue={text1}
            onValueChange={(itemValue) => this.setState({ ...this.state, text1: itemValue })}
            value={text1}
          >
            {
              stars.map(star => (
                <Picker.Item key={star.id} label={star.name} value={star.name} />
              ))
            }
          </Picker>

          <Picker
            itemStyle={{height: "100%", width: "100%"}}
            style={styles.input}
            selectedValue={text2}
            onValueChange={(itemValue) => this.setState({ ...this.state, text2: itemValue })}
            value={text2}
          >
            {
              stars.map(star => (
                <Picker.Item key={star.id} label={star.name} value={star.name} />
              ))
            }
          </Picker>

          <Picker
            itemStyle={{height: 50}}
            style={styles.input}
            selectedValue={text3}
            onValueChange={(itemValue) => this.setState({...this.state, text3: itemValue})}
            value={text3}
          >
            {
              stars.map(star => (
                <Picker.Item key={star.id} label={star.name} value={star.name} />
              ))
            }
          </Picker>

          <TouchableOpacity onPress={this.onSave} style=
            {styles.button}>
            <Text>Save locally</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onLoad} style=
            {styles.button}>
            <Text>Load data</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  preview: {
    backgroundColor: '#bdc3c7',
    width: 300,
    height: 80,
    padding: 10,
    borderRadius: 5,
    color: '#333',
    marginBottom: 50,
  },
  input: {
    // marginTop: 50,
    backgroundColor: '#ecf0f1',
    borderRadius: 3,
    width: 300,
    height: 60,
    padding: 5,
    marginBottom: 10
  },
  button: {
    backgroundColor: '#87CEEB',
    padding: 10,
    borderRadius: 3,
    marginTop: 10,
  },
});