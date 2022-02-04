import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
    AndroidSafeArea: {
        backgroundColor: "transparent",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    row: {
        flexWrap: 'wrap',
        padding: 5,
        paddingLeft: 20,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    icon: {
      
    },
    iconarrow: {
        justifyContent: 'flex-end',
        marginLeft: 'auto',
        paddingRight: 15,
    },
    text: {
        fontSize: 14,
        margin: 10,
    },
});