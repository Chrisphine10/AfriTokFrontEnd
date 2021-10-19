import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "transparent",
        //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    search: {
        padding: 10,
        fontSize: 14,
        fontFamily: 'AbelRegular',
    }

});