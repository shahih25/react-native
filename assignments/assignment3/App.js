import React, { Component } from 'react';
import {
          StyleSheet,
          Text,
          TextInput,
          TouchableOpacity,
          View
        } from 'react-native';

import data from "./data/buttons.json";

export default class App extends Component {
              state = {
                results: '',
              };

              onLoad = async (title) => {
                this.setState({ results: 'Loading, please wait...' });
                const response = await
                fetch(`https://2s4b8wlhik.execute-api.us-east-1.amazonaws.com/studentData?grade=${title}`, {
                  method: 'GET',
                });
                const results = await response.json();
                let output = `Students who received ${title === "A" || title === "E" ? "an" : "a"} ${title} grade:\n`;

                output = output + results.join("\n");
                this.setState({ results: output });
              }

              render() {
                const { results } = this.state;
                return (
                  <View style={styles.container}>
                    <View>
                      <TextInput
                        style={styles.preview}
                        value={results}
                        placeholder="Results..."
                        editable={false}
                        multiline
                      />

                      {data.map(btn => (
                        <TouchableOpacity onPress={() => this.onLoad(btn.title)} style={styles.btn} key={btn.id}>
                          <Text>{btn.title}</Text>
                        </TouchableOpacity>
                      ))}
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
    height: 400,
    padding: 10,
    borderRadius: 5,
    color: '#333',
    marginBottom: 50,
  },
  btn: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 3,
    marginTop: 10,
    alignItems: "center"
  },
  containerS: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  previewS: {
    width: 300,
    height: 400,
    padding: 10,
    color: '#333',
    borderRadius: 5,
    backgroundColor: '#bdc3c7'
  },
});
