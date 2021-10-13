import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
    AndroidSafeArea: {
        backgroundColor: "transparent",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    activity: {
        padding: 10,
        marginBottom: 50,
    },
    container: {
        alignItems: "center",
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginRight: 30,
        marginLeft: 5,
     },
    time: {
        fontSize: 16,
        color: "#000",
        fontWeight: "bold",
        paddingBottom: 20,
    }

});