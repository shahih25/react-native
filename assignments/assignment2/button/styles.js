import { StyleSheet } from "react-native";

const BaseStyles = StyleSheet.create({
    main: {
        alignSelf: "center",
        margin: 10,
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 12
    },
    label: {
        color: "#fff"
    },
    rounded: {
        borderRadius: 25
    },
    md_size: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        elevation: 12,
        backgroundColor: "purple"
    },
    lg_size: {
        backgroundColor: "blue"
    }
});

export default BaseStyles;