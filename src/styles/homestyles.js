import { StyleSheet, Dimensions, Platform, StatusBar  } from 'react-native';

export default StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "black",
       // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    logo: {
        width: 80,
        height: 50,
        resizeMode: 'contain',
    },
    header: {
        position: "absolute",
        zIndex: 2,
        alignSelf: 'center',
        marginTop: 10,
    },
    headerText: {
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        flexWrap: "wrap",
    },
    pagerView: {
        width: '100%',
		height: Dimensions.get("window").height - 20,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'relative',
        zIndex: 1,
    },
    text: {
        color: 'white',
        fontSize: 18,
        textShadowColor: 'rgba(0, 0, 0, 0.80)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 1,
        fontFamily: 'AbelRegular',
    }
})
