import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
    AndroidSafeArea: {
        backgroundColor: "transparent",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,   
        flex: 1,
    },
    container: {
        flex: 1,
      },
    video: {
        height: Dimensions.get('window').height - 200,
        width: Dimensions.get('window').width
    }
});