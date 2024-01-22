import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Hello, SER 423! My name is Hasan Shahid.</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#5DADE2",
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    }
});