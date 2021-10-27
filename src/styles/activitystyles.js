import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
    AndroidSafeArea: {
        backgroundColor: "white",
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
        paddingRight: 30,
        paddingLeft: 5,
     },
    time: {
        fontSize: 16,
        color: "#000",
        fontWeight: "bold",
        paddingBottom: 20,
    }

});