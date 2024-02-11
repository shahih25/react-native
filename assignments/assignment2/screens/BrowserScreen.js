import { useEffect } from "react";
import WebView from "react-native-webview";

const BrowserScreen = ({ navigation }) => {
    const { params } = navigation.getState().routes[1];
    useEffect(() => {
        navigation.setOptions({ title: params.title });
    }, []);

    return (
        <WebView source={{uri: params.url}} />
    );
}

export default BrowserScreen;