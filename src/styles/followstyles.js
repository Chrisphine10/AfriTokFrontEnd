import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
    AndroidSafeArea: {
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    suggestions: {
        padding: 10,
    },
    contained:{
        color: '#000',
        fontFamily: 'AbelRegular',
    },
    content: {
        height: 1000,
        marginTop: 50
    },
    foreground: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    headerWrapper: {
      
    },
    headerTitle: {
        fontSize: 16,
    },
    tabsWrapper: {
    },
    tabTextContainerStyle: {
        paddingHorizontal: 10,
        justifyContent: "space-between",
        backgroundColor: 'transparent',
    },
    tabTextContainerActiveStyle: {
        backgroundColor: "#cd9115",
        borderRadius: 2
    },
    tabText: {
        fontSize: 15,
        lineHeight: 20,
        paddingHorizontal: 12,
        color: '#000',
        fontFamily: 'AbelRegular',
    },
    header: {
        backgroundColor: '#fff',
    },
    searchBox: {
        padding: 10,
        fontSize: 14,
        fontFamily: 'AbelRegular',
    },

});