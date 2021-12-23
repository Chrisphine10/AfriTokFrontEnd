import { StyleSheet, Platform, Dimensions, StatusBar } from 'react-native';

export default StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    container: {
        marginBottom: 50,
    },
    row: {
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: "center",
    },
    button: {
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: "center",
        zIndex: 5,
        paddingTop: 2,
        paddingBottom: 2,
        paddingHorizontal: 10,
        backgroundColor: "#cd9115",
        alignSelf: 'center',
        borderRadius: 5,
        justifyContent:'center',
        alignItems: 'center',
        margin: 10,
    },
    text: {
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: "center",
        zIndex: 5,
        paddingTop: 2,
        paddingBottom: 2,
        paddingHorizontal: 10,
        alignSelf: 'center',
        borderRadius: 5,
        justifyContent:'center',
        alignItems: 'center',
        margin: 10,
    },
    line: {
        borderColor: "gray",
        borderBottomWidth: 1,
    },
    input: {
        height: 100,
        marginBottom: 30,
        paddingBottom: 50,
        backgroundColor: "white",
    }
});