import { Alert, FlatList, StyleSheet, View } from "react-native"
import Button from "../button";
import data from "../data/buttons.json";

const HomeScreen = ({ navigation }) => {

    const handleButtonPress = (title, url) => {
        navigation.navigate("Browser", { url, title });
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => <Button style={styles.button} onPress={() => handleButtonPress(item.title, item.url)} title={item.title} size={item.size} backgroundColor={item.backgroundColor} rounded={item.rounded} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    btn: {
        margin: 10
    }
});

export default HomeScreen;