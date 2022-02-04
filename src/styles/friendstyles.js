import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    search: {
        paddingHorizontal: 10,
        fontSize: 14,
        fontFamily: 'AbelRegular',
        paddingBottom: 20,
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
        backgroundColor: '#ED7360',
        padding: 10,
        borderRadius: 30,
    },
    iconarrow: {
        textShadowColor: 'rgba(0, 0, 0, 0.80)',
        textShadowOffset: {width: -0.5, height: 0.5},
        textShadowRadius: 1,
        justifyContent: 'flex-end',
        marginLeft: 'auto',
        paddingRight: 15,
    },
    text: {
        fontSize: 14,
        margin: 10,
    },

});