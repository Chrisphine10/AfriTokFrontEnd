import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "transparent",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    search: {
        padding: 10,
        fontSize: 14,
        fontFamily: 'AbelRegular',
    },
    mainImage: {
        height: 120,
        width: 120,
        resizeMode: 'cover',
    },
    topContainer: {
        margin: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    icon: {
        paddingRight: 20,
    },
    bookmark: {
        borderWidth: 1,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 2,
        paddingTop: 2,
        borderRadius: 2,
        borderColor: '#ddd',
        fontSize: 14,
        color: '#000',
        fontFamily: 'AbelRegular',
     },
     text: {
        fontSize: 14,
        color: '#000',
        fontFamily: 'AbelRegular',
     },
     header: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        fontFamily: 'AbelRegular',
     },
     words: {
        justifyContent: 'space-between'
    },
    sauti: {
        position: 'absolute',
        bottom: 35,
        zIndex: 5,
        paddingTop: 2,
        paddingBottom: 2,
        paddingHorizontal: 10,
        backgroundColor: "#cd9115",
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
        borderRadius: 30,
        flexGrow: 1, 
        justifyContent:'center',
        alignItems: 'center',
    },
    sautiText: {
        fontSize: 18,
        color: '#000',
        fontFamily: 'AbelRegular',
    },
    sautiIcon: {
    },
    tabsWrapper: {
    },
    tabTextContainerStyle: {
      backgroundColor: 'transparent',
      paddingHorizontal: 30,
      justifyContent: "space-between"
    },
    tabTextContainerActiveStyle: {
      backgroundColor: "#cd9115",
      borderRadius: 2
    },
    tabText: {
      fontSize: 15,
      lineHeight: 20,
      paddingHorizontal: 12,
      color: 'black',
      color: '#fff',
      fontFamily: 'AbelRegular',
    }

});