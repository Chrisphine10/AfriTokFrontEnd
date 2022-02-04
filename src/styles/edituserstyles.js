import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    avatar: {
        paddingTop: 10,
        alignItems: 'center',
    },
    search: {
        paddingHorizontal: 10,
        fontSize: 14,
        fontFamily: 'AbelRegular',
        paddingBottom: 20,
    },
    edit: {
        flexWrap: 'wrap',
        paddingLeft: 5,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    icon: {
        backgroundColor: '#ED7360',
        //padding: 10,
        borderRadius: 30,
    },
    left: {
        justifyContent: 'flex-end',
        marginLeft: 'auto',
        paddingRight: 15,
    },
    text: {
        fontSize: 14,
        padding: 13,
    },
    row: {
        //paddingTop: 50,
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: "center",
    },
    button: {
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: "center",
        zIndex: 5,
        //paddingTop: 2,
        //paddingBottom: 2,
        paddingHorizontal: 10,
        backgroundColor: "#cd9115",
        alignSelf: 'center',
        borderRadius: 5,
        justifyContent:'center',
        alignItems: 'center',
        margin: 10,
    },
    input: {
        color: 'grey',
        textAlign: 'right',
    },
    bio: {
        color: 'grey',
        paddingHorizontal: 20,
        paddingVertical: 10,
        textAlign: 'center',
        borderWidth: 1,
        marginHorizontal: 20,
        borderRadius: 5,
    },
    line: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginHorizontal: 20,
        marginVertical: 10,
        width: '100%',
    },

});