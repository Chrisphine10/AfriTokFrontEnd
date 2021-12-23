import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
    AndroidSafeArea: {
        backgroundColor: "black",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,   
        flex: 1,
    },
    container: {
        flex: 1,
      },
    video: {
        height: Dimensions.get('window').height - 100,
        width: Dimensions.get('window').width
    },
    row: {
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: "center",
    },
    buttons: {
        margin: 10,
        backgroundColor: "#cd9115",
    }
});