import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    feed: {
        fontFamily: 'AbelRegular',
    },
    text: {
        color: 'white',
        fontSize: 14,
        textShadowColor: 'rgba(0, 0, 0, 0.80)',
        textShadowOffset: {width: -0.5, height: 0.5},
        textShadowRadius: 1,
        fontFamily: 'AbelRegular',
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
        borderColor: 'red',
        borderRadius: 5,
        backgroundColor: 'blue',
    },
    rightContent: {
        position: 'absolute',
        zIndex: 4,
        flexDirection: 'column',
        right: 0,
        bottom: 55,
        width: '20%',
        padding: 10,
    },
    icons: {
        marginBottom: 20,
        alignItems: 'center',
    },
    leftContent: {
        flexDirection: 'column',
        zIndex: 3,
        position: 'absolute',
        width: '75%',
        bottom: 35,
        paddingLeft: 10,
    },
    user: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    tag:{
        padding: 5,
    },
    sauti: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    avatar: {
        borderBottomColor: 'red',
        borderRadius: 30,
        alignItems: 'center'
    },
    sautibox:{

    },
    like: {

    },
    username: {
        color: 'white',
        fontSize: 14,
        textShadowColor: 'rgba(0, 0, 0, 0.80)',
        textShadowOffset: {width: -0.5, height: 0.5},
        textShadowRadius: 1,
        fontFamily: 'AbelRegular',
        padding: 5,
        margin: 5,
        borderColor: 'red',
        borderRadius: 5,
    },
    share: {

    },
    comment:{

    }
});