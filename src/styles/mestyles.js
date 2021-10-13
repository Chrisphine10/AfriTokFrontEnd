import { StyleSheet, Platform, Dimensions, StatusBar } from 'react-native';

export default StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "transparent",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    container: {
        alignItems: "center",
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginRight: 10,
        marginLeft: 10,
     },
     avatar: {
        alignItems: 'center',
        paddingTop: 20,
     },
     follow: {
        alignItems: "center",
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginRight: 70,
        marginLeft: 70,
        padding: 10,
     },
     followUser: {
         alignItems: "center",
         flexDirection: 'row',
         flexWrap: 'wrap',
         justifyContent: 'center',
         padding: 10,
      },
     edit: {
        borderWidth: 1,
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 10,
        paddingTop: 10,
        borderRadius: 2,
        borderColor: '#ddd',
        fontSize: 14,
        color: '#000',
        fontFamily: 'AbelRegular',
     },
     bookmark: {
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        paddingTop: 3,
        borderRadius: 2,
        borderColor: '#ddd',
     },
     textAlign: { 
        alignItems: 'center',
     },
     text: {
        fontSize: 14,
        color: '#000',
        fontFamily: 'AbelRegular',
     },
     number:{
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        fontFamily: 'AbelRegular',
     },
     name:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        fontFamily: 'AbelRegular',
        padding: 5,
     },
     username:{
        fontSize: 14,
        color: '#000',
        fontFamily: 'AbelRegular',
        padding: 5,
     },
     bio: {
        fontSize: 14,
        color: '#000',
        fontFamily: 'AbelRegular',
        padding: 5,
        alignSelf: 'center',
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
         width: '100%',
       },
       headerTitle: {
         fontSize: 16,
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
       }
});