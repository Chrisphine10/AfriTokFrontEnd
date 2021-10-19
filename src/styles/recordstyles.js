import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
    AndroidSafeArea: {
        backgroundColor: "black",
        //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,   
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    contentContainer: {
        flex: 1,
        position: 'absolute',
        right: 0,
        left: 0,
    },
    camera: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'black',
        justifyContent: 'flex-start',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: 'transparent',
        borderBottomColor: '#ddd',
    },
    topRightCont: {
        borderRadius: 10,
        backgroundColor: 'rgba(184,184,184,0.10)',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        //flexDirection: 'row',
        padding: 5,
    },
    flipIcon: {
        marginVertical: 7,
        transform: [
            {
                rotate: '90deg',
            },
        ],
    },
    cameraSettingsButton: { marginVertical: 7 },
    takenImage: { flex: 1 },
    floatingControl: {
        bottom: 10,
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 80,
        width: Dimensions.get('window').width,
    },
    loadingView: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        color: 'white',
        fontSize: 12,
        textShadowColor: 'rgba(0, 0, 0, 0.80)',
        textShadowOffset: {width: -0.5, height: 0.5},
        textShadowRadius: 1,
        fontFamily: 'AbelRegular',
        textAlign: 'center',
    },
    icon: {
        marginVertical: 6,
        color: '#000',
    },
    sautiStyle: {
        color: 'white',
        fontSize: 16,
        textShadowColor: 'rgba(0, 0, 0, 0.80)',
        textShadowOffset: {width: -0.5, height: 0.5},
        textShadowRadius: 1,
        fontFamily: 'AbelRegular',
        textAlign: 'center',
        paddingHorizontal: 40,
        paddingVertical: 10,
        backgroundColor: 'rgba(184,184,184,0.40)',
        borderRadius: 20,
    }
});