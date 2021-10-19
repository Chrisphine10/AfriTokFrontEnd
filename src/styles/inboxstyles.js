import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
    AndroidSafeArea: {
        backgroundColor: "transparent",
        //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },

});