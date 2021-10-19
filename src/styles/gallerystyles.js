import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
    AndroidSafeArea: {
        backgroundColor: "white",
        //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,   
        flex: 1,
    },
    container: {
        flex: 1,
      },
});