import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default class LogoutScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Thanks for using my app!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#EDD698",
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    }
})