import React, { useState, useRef, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Modal,
    ImageBackground,
    Animated,
    BackHandler,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    Image,

} from 'react-native';
import { Camera } from 'expo-camera';
import { Video, AVPlaybackStatus } from 'expo-av';
import styles from '../../styles/recordstyles';
import {  Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
    PinchGestureHandler,
    PinchGestureHandlerGestureEvent,
    State,
    TapGestureHandler,
    TapGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';

const Photo = ({ navigation, route }) => {
    const [hasPermission, setHasPermission] = useState(null);
    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    let checkMarkSet = null
    if (route.params) {
        checkMarkSet = true
    }

    // RATIO SETTER
    const [imagePadding, setImagePadding] = useState(0)
    const [ratio, setRatio] = useState('4:3') // default is 4:3
    const screenRatio = height / width
    const [isRatioSet, setIsRatioSet] = useState(false)
    async function prepareRatio() {
        let desiredRatio = '4:3' // Start with the system default
        // This issue only affects Android
        if (Platform.OS === 'android') {
            const ratios = await cameraRef.current.getSupportedRatiosAsync()
            let distances = {}
            let realRatios = {}
            let minDistance = null
            for (const ratio of ratios) {
                const parts = ratio.split(':')
                const ratioHeight = parseInt(parts[0])
                const ratioWidth = parseInt(parts[1])
                const realRatio = ratioHeight / ratioWidth
                realRatios[ratio] = realRatio
                // ratio can't be taller than screen, so we don't want an abs()
                const distance = screenRatio - realRatio
                distances[ratio] = realRatio
                if (minDistance == null) {
                    minDistance = ratio
                } else {
                    if (distance >= 0 && distance < distances[minDistance]) {
                        minDistance = ratio
                    }
                }
            }
            // set the best match
            desiredRatio = minDistance

            //  calculate the difference between the camera width and the screen height
            const remainder = Math.floor(
                (height - realRatios[desiredRatio] * width) / 2
            )

            // set the preview padding and preview ratio
            setImagePadding(remainder / 2)
            console.log(`okay look ${remainder / 2}`)
            setRatio(desiredRatio)
            // Set a flag so we don't do this
            // calculation each time the screen refreshes
            setIsRatioSet(true)
        }
    }

    const setCameraReady = async () => {
        if (!isRatioSet) {
            await prepareRatio()
        }
    }
    // RATIO SETTER

    const [type, setType] = useState(Camera.Constants.Type.back)
    const [activateCamera, setActivateCamera] = useState(false)
    const [video, setVideo] = useState('')
    const [showVideoModal, setShowVideoModal] = useState(false)
    const insets = useSafeAreaInsets()

    useFocusEffect(() => {
        if (navigation.isFocused()) {
            setActivateCamera(true)
        }
    })

    const [pic, setPic] = useState(null)

    const [showModal, setShowModal] = useState(false)

    const cameraRef = useRef()

    const dispatch = useDispatch()

    const [zooming, setZooming] = useState(0)

    //camera settings
    const [flashMode, setFlashMode] = useState('off')

    // const picTaken = useSelector((state) => state.cameraReducer.pictureUri)
    // console.log(
    //     '🚀 ~ file: CameraScreen.js ~ line 36 ~ CameraScreen ~ picTaken',
    //     picTaken
    // )

    // camera Functions
    async function takePictureHandler() {
        try {
            if (cameraRef.current) {
                const options = {
                    quality: 0.5,
                    base64: true,
                    skipProcessing: true,
                }
                let photo = await cameraRef.current.takePictureAsync(options)
                setPic(photo.uri)
                dispatch(takePicture(photo.uri))
                setShowModal(true)
            }
        } catch (err) {
            console.log(err)
        }

        // setPickedImage(image.uri)
        // props.onImageTaken(image.uri)
    }

    function flipCameraHandler() {
        setType(
            type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        )
    }

    function flashSwitchHandler() {
        if (flashMode === 'off') {
            setFlashMode('on')
        }
        if (flashMode === 'on') {
            setFlashMode('off')
        }
    }

    async function savePictureLocallyHandler(localUri) {
        const { status } = await MediaLibrary.getPermissionsAsync()
        if (status === 'undetermined') {
            const { status } = await MediaLibrary.requestPermissionsAsync()
            if (status === 'granted') {
                const asset = await MediaLibrary.createAssetAsync(localUri)
            }
        }

        if (status === 'granted') {
            const asset = await MediaLibrary.createAssetAsync(localUri)
            if (asset) {
                //display check mark showing it was saved.
            }
        }

        if (status === 'denied') {
            console.log('Open settings and give permission')
        }
    }

    // zoom gesture handler
    const zoom = useSharedValue(0)
    const MAX_ZOOM_FACTOR = 20
    const SCALE_FULL_ZOOM = 20
    const formatMaxZoom = 1
    const maxZoomFactor = Math.min(formatMaxZoom, MAX_ZOOM_FACTOR)
    const neutralZoomScaled = (neutralZoom / maxZoomFactor) * formatMaxZoom
    const maxZoomScaled = (1 / formatMaxZoom) * maxZoomFactor

    const neutralZoom = 0
    useAnimatedProps(
        () => ({
            zoom: interpolate(
                zoom.value,
                [0, neutralZoomScaled, 1],
                [0, neutralZoom, maxZoomScaled],
                Extrapolate.CLAMP
            ),
        }),
        [maxZoomScaled, neutralZoom, neutralZoomScaled, zoom]
    )

    function updateValue() {
        setZooming(zoom.value)
    }

    function willThisWork() {
        'worklet'
        runOnJS(updateValue)()
    }

    const onPinchGesture = useAnimatedGestureHandler({
        onStart: (_, context) => {
            context.startZoom = zoom.value
        },
        onActive: (event, context) => {
            // trying to map the scale gesture to a linear zoom here
            const startZoom = context.startZoom ?? 0
            const scale = interpolate(
                event.scale,
                [1 - 1 / SCALE_FULL_ZOOM, 1, SCALE_FULL_ZOOM],
                [-1, 0, 1],
                Extrapolate.CLAMP
            )
            zoom.value = interpolate(
                scale,
                [-1, 0, 1],
                [0, startZoom, 1],
                Extrapolate.CLAMP
            )
            willThisWork()
        },
    })

    // VIDEO RECORDING
    async function beginRecording() {
        console.log('started')
        let video = await cameraRef.current.recordAsync()
        setVideo(video)
        // setPic(photo.uri)
        // dispatch(takePicture(photo.uri))
    }

    async function endRecording() {
        console.log('ended')
        cameraRef.current.stopRecording()
        setShowVideoModal(true)
    }


    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <PinchGestureHandler onGestureEvent={onPinchGesture}>
                <Reanimated.View
                    style={{
                        flex: 1,
                        backgroundColor: 'back',
                        justifyContent: 'flex-start',
                        paddingBottom: imagePadding * 4,
                    }}
                >
                    {activateCamera && (
                        <Camera
                            style={{
                                // marginTop: imagePadding,
                                // marginBottom: imagePadding,
                                flex: 1,
                                // height: 733,
                            }}
                            ref={cameraRef}
                            type={type}
                            flashMode={flashMode}
                            zoom={zooming}
                            onCameraReady={setCameraReady}
                            ratio={ratio}
                            maxDuration={10000}
                            autoFocus="on"
                        >
                            <View
                                style={[
                                    styles.contentContainer,
                                    {
                                        paddingTop: insets.top,
                                        paddingBottom: insets.bottom,
                                        top: insets.top,
                                        bottom: insets.bottom,
                                    },
                                ]}
                            >
                                <View style={styles.topLeftCont}>
                                    <TouchableOpacity
                                        onPress={flipCameraHandler}
                                    >
                                        <Entypo
                                            name="loop"
                                            size={27}
                                            color="white"
                                            style={styles.flipIcon}
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={flashSwitchHandler}
                                    >
                                        <Ionicons
                                            name={
                                                flashMode !== 'off'
                                                    ? 'flash'
                                                    : 'flash-off'
                                            }
                                            size={27}
                                            color="white"
                                            style={styles.cameraSettingsButton}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <CameraButton
                                    style={{
                                        ...styles.floatingPlusCont,
                                        left: width / 2 - 45,
                                    }}
                                    onLongPress={beginRecording}
                                    onEndPress={endRecording}
                                    onTap={takePictureHandler}
                                />
                            </View>
                        </Camera>
                    )}
                </Reanimated.View>
            </PinchGestureHandler>
       </SafeAreaView>
    )
}

export default Photo;