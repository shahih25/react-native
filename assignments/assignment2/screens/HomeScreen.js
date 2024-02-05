import { Alert, FlatList, StyleSheet, View } from "react-native"
import Button from "../button";

const HomeScreen = ({ navigation }) => {
    state = {
        links: [
            {
                "title": "Asia",
                "size": "sm",
                "url": "https://en.wikipedia.org/wiki/Asia"
            },
            {
                "title": "Antarctica",
                "size": "md",
                "backgroundColor": "#2B6109",
                "rounded": true,
                "url": "https://en.wikipedia.org/wiki/Antarctica"
            },
            {
                "title": "Africa",
                "size": "sm",
                "backgroundColor": "#E384F2",
                "url": "https://en.wikipedia.org/wiki/Africa"
            },
            {
                "title": "Australia",
                "size": "sm",
                "backgroundColor": "#C5B70C",
                "info": true,
                "url": "https://en.wikipedia.org/wiki/Australia"
            },
            {
                "title": "North America",
                "size": "md",
                "backgroundColor": "#333",
                "rounded": true,
                "url": "https://en.wikipedia.org/wiki/North_America"
            },
            {
                "title": "South America",
                "size": "lg",
                "backgroundColor": "red",
                "url":"https://en.wikipedia.org/wiki/South_America"
            },
            {
                "title": "Europe",
                "size": "lg",
                "backgroundColor": "orange",
                "rounded": true,
                "url": "https://en.wikipedia.org/wiki/Europe"
            }
        ]
    }

    const handleButtonPress = (title, url) => {
        navigation.navigate("Browser", { url, title });
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={state.links}
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