import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "transparent",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    suggestions: {
        padding: 6,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    search: {
        padding: 10,
        fontSize: 14,
        fontFamily: 'AbelRegular',
    },
    searchBox: {
        padding: 10,
        fontSize: 14,
        fontFamily: 'AbelRegular',
    },
    username: {
        color: 'black',
        fontWeight: "800",
        fontSize: 12,
        fontFamily: 'AbelRegular',
        marginBottom: 5,
    },
    fullname: {
        color: 'grey',
        fontWeight: "800",
        fontSize: 12,
        fontFamily: 'AbelRegular',
        marginBottom: 5,
    },
    follow: {
        color: 'grey',
        fontWeight: "800",
        fontSize: 12,
        fontFamily: 'AbelRegular',
        marginBottom: 5,
    },
    followText: {
        color: 'white',
        fontSize: 14,
        textShadowColor: 'rgba(0, 0, 0, 0.80)',
        textShadowOffset: {width: -0.5, height: 0.5},
        textShadowRadius: 1,
        fontFamily: 'AbelRegular',
        padding: 5,
        margin: 5,
        borderColor: 'grey',
        borderRadius: 5,
        borderWidth: 1,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        
    }
});