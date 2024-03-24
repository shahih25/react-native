
import React, { Component } from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { Feather } from "@expo/vector-icons"

const key1 = '@MyApp:key1';
const key2 = '@MyApp:key2';
const key3 = '@MyApp:key3';

const playlist = [
  {
    title: 'People Watching',
    artist: 'Keller Williams',
    album: 'Keller Williams Live at The Westcott Theater on 2012-09-22',
    uri: 'https://ia800308.us.archive.org/7/items/kwilliams2012-09-22.at853.flac16/kwilliams2012-09-22at853.t16.mp3'
  },
  {
    title: 'Hunted By A Freak',
    artist: 'Mogwai',
    album: 'Mogwai Live at Ancienne Belgique on 2017-10-20',
    uri: 'https://ia601509.us.archive.org/17/items/mogwai2017-10-20.brussels.fm/Mogwai2017-10-20Brussels-07.mp3'
  },
  {
    title: 'Nervous Tic Motion of the Head to the Left',
    artist: 'Andrew Bird',
    album: 'Andrew Bird Live at Rio Theater on 2011-01-28',
    uri: 'https://ia800503.us.archive.org/8/items/andrewbird2011-01-28.early.dr7.flac16/andrewbird2011-01-28.early.t07.mp3'
  }
];

export default class App extends Component {
  state = {
    text1: '',
    text2: '',
    text3: '',
    storedValue1: '',
    storedValue2: '',
    storedValue3: '',
    isBuffereing: false,
    isPlaying: false,
    playbackInstance: null,
    volume: 1.0,
    currentTrackIndex: 0
  };

  async componentDidMount() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playThroughEarpieceAndroid: true,
        interruptionModeIOS: 1,
        interruptionModeAndroid: 1,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true
      });
      this.loadAudio();
      this.onLoad();
    } catch (error) {
      Alert.alert("Error", "Cannot load audio or local data");
    }
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

  renderSongInfo() {
    const { playbackInstance, currentTrackIndex } = this.state;
    return playbackInstance ?
    <View style={styles.trackInfo}>
      <Text style={[styles.trackInfoText, styles.largeText]}>
        {playlist[currentTrackIndex].title}
      </Text>
      <Text style={[styles.trackInfoText, styles.smallText]}>
        {playlist[currentTrackIndex].artist}
      </Text>
      <Text style={[styles.trackInfoText, styles.smallText]}>
        {playlist[currentTrackIndex].album}
      </Text>
    </View>
    : null;
  }

  handlePlayPause = async () => {
    let { isPlaying, playbackInstance } = this.state;
    try {
      isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync();
      this.setState({ isPlaying: !isPlaying });
    }
    catch(error) {
      Alert.alert("Error", "Failed to play or pause audio track.");
    }
  }

  handlePreviousTrack = async () => {
    let { playbackInstance, currentTrackIndex } = this.state;
    try {
      if (playbackInstance) {
        await playbackInstance.unloadAsync();
        currentTrackIndex === 0 ? (currentTrackIndex = playlist.length - 1) : (currentTrackIndex -= 1);
        this.setState({ currentTrackIndex });
        this.loadAudio();
      }
    }
    catch(error) {
      Alert.alert("Error", "Failed to load previous audio track.");
    }
  }

  handleNextTrack = async () => {
    let { playbackInstance, currentTrackIndex } = this.state;
    try {
      if (playbackInstance) {
        await playbackInstance.unloadAsync();
        currentTrackIndex < playlist.length - 1 ? (currentTrackIndex += 1) : (currentTrackIndex = 0);
        this.setState({ currentTrackIndex });
        this.loadAudio();
      }
    }
    catch(error) {
      Alert.alert("Error", "Failed to load next audio track");
    }
  }

  onPlayackStatusUpdate = (status) => {
    this.setState({ isBuffereing: status.isBuffereing });
  }

  async loadAudio() {
    const playbackInstance = new Audio.Sound();
    const source = {
      uri: playlist[this.state.currentTrackIndex].uri
    }

    const status = {
      shouldPlay: this.state.isPlaying,
      volume: this.state.volume
    }

    playbackInstance.setOnPlaybackStatusUpdate(this.onPlayackStatusUpdate);

    try {
      await playbackInstance.loadAsync(source, status, false);
      this.setState({ playbackInstance });
    } catch (error) {
      Alert.alert("Error", "Unable to load audio track.");
    }
  }

  render() {
    const { storedValue1, storedValue2, storedValue3, currentTrackIndex, isPlaying, isBuffereing } = this.state;
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
        <Text style={[styles.largeText, styles.buffer]}>
          {isBuffereing && isPlaying ? "Buffering..." : null}
        </Text>
        
        {this.renderSongInfo()}

        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.control}
            onPress={this.handlePreviousTrack}
          >
            <Feather name="skip-back" size={32} color="#666"/>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.control}
            onPress={this.handlePlayPause}
          >
            {isPlaying ?
              <Feather name="pause" size={32} color="#666"/> :
              <Feather name="play" size={32} color="#666"/>
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.control}
            onPress={this.handleNextTrack}
          >
            <Feather name="skip-forward" size={32} color="#666"/>
          </TouchableOpacity>
        </View>

        <Text style={styles.preview}>
          {
            `STORED AUDIO RATINGS:\n${playlist[0].title}: ${storedValue1 ? storedValue1 : 0}\n${playlist[1].title}: ${storedValue2 ? storedValue2 : 0}\n${playlist[2].title}: ${storedValue3 ? storedValue3 : 0}`
          }
        </Text>
        <View>
          {currentTrackIndex === 0 && (
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
          )}

          {currentTrackIndex === 1 && (
            <Picker
              itemStyle={{height: 50}}
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
          )}

          {currentTrackIndex === 2 && (
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
          )}

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
    height: 105,
    padding: 10,
    borderRadius: 5,
    color: '#333',
    marginBottom: 50,
  },
  input: {
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
  largeText: {
    fontSize: 22
  },
  smallText: {
    fontSize: 16
  },
  buffer: {
    color: "#fff"
  },
  trackInfoText: {
    textAlign: 'center',
    flexWrap: 'wrap',
    color: '#fff'
  },
  trackInfo: {
    padding: 40,
    backgroundColor: '#191A1A'
  },
  control: {
    margin: 20
  },
  controls: {
    flexDirection: 'row'
  }
});