import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import theme from '../core/theme';

export default StyleSheet.create({
    AndroidSafeArea: {
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
    },
        headerWrapper: {
        width: '100%',
        backgroundColor: 'white',
    },
        headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#000',
        fontFamily: 'AbelRegular',

    },
    tabsWrapper: {
    },
    tabTextContainerStyle: {
      paddingHorizontal: 30,
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
    sauti: {
        padding: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(194, 162, 86, 0.19)',
        borderRadius: 5,
    },
    sautiSection: {
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        borderRadius: 5,

    },
    description: {  
      color: '#000',
      fontFamily: 'AbelRegular',
      justifyContent: 'center',
      paddingLeft: 20,
      borderColor: 'grey',
    },
    title: {   
      color: '#000',
      fontFamily: 'AbelRegular',
      flex: 1,
      width: 250,
    },
    duration: {
        color: '#000',
        fontFamily: 'AbelRegular',
    },
    icon: {
        backgroundColor: "#414757",
        borderRadius: 4,
    },
    iconPressed: {
        backgroundColor: "#cd9115",
        borderRadius: 4,
    },
    banner: {
        alignSelf: 'center',
        width: Dimensions.get("window").width - 50,
        height: 150,
        borderRadius: 5,
        resizeMode: 'cover',
        margin: 5,
    }
});