import React, { useState, useEffect, useFocusEffect }from 'react';
import { BackHandler, Dimensions, Image, View, Text, TouchableOpacity} from 'react-native';
import styles from '../../styles/recordstyles';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import { Video, Audio } from 'expo-av';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
//import { PIXI } from 'expo-pixi';

const Record = ({ navigation, route }) => {
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
    const [loading, setLoading] = useState(false);
    //const [loadEdit, setLoadEdit] = useState(false);
    const [hasAudioPermission, setHasAudioPermission] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] =useState(null);
    const [camera, setCamera] = useState(false);
    const [record, setRecord] = useState(false);
    const [sauti, setSauti] = useState(false);
    const [sautiUri, setSautiUri] = useState(false);
    const [sautiDuration, setSautiDuration] = useState(false);
    const [isRatioSet, setIsRatioSet] = useState(false);
    const [ratio, setRatio] = useState('4:3'); 
    const [imagePadding, setImagePadding] = useState(0);
    const [zooming, setZooming] = useState(0.005);
    const { height, width } = Dimensions.get('window');
    const screenRatio = height / width;
    const [playing, setPlaying] = useState(false);
    const [sound, setSound] = useState();
    //const [isFocused, setIsFocused] = useState(false);
    // the camera must be loaded in order to 
    // access the supported ratios

   // the camera must be loaded in order to access the supported ratios
   const setCameraReady = async() => {
        if (!isRatioSet) {
        await prepareRatio();
        }
    };

    const isFocused = useIsFocused();
    
    const prepareRatio = async () => {
        let desiredRatio = '4:3';  // Start with the system default
        // This issue only affects Android
        if (Platform.OS === 'android') {
          const ratios = await camera.getSupportedRatiosAsync();
    
          // Calculate the width/height of each of the supported camera ratios
          // These width/height are measured in landscape mode
          // find the ratio that is closest to the screen ratio without going over
          let distances = {};
          let realRatios = {};
          let minDistance = null;
          for (const ratio of ratios) {
            const parts = ratio.split(':');
            const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
            realRatios[ratio] = realRatio;
            // ratio can't be taller than screen, so we don't want an abs()
            const distance = screenRatio - realRatio; 
            distances[ratio] = realRatio;
            if (minDistance == null) {
              minDistance = ratio;
            } else {
              if (distance >= 0 && distance < distances[minDistance]) {
                minDistance = ratio;
              }
            }
          }
          // set the best match
          desiredRatio = minDistance;
          //  calculate the difference between the camera width and the screen height
          const remainder = Math.floor(
            (height - realRatios[desiredRatio] * width) / 2
          );
          // set the preview padding and preview ratio
          setImagePadding(remainder);
          setRatio(desiredRatio);
          // Set a flag so we don't do this 
          // calculation each time the screen refreshes
          setIsRatioSet(true);
        }
    };
    

    function gotoGallery() {
        navigation.navigate('Gallery');
    }

    function gotoSauti() {
        navigation.navigate('SongsList');
    }

    // function goBack () {
    //     navigation.goBack();
    // }

    function goBack () {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Routes' }],
        })
    }

    useEffect(() => {
        let isMounted = true;
        const fetchPermission = async () => {
            try {
                const cameraStatus = await Camera.requestPermissionsAsync();
                setHasCameraPermission(cameraStatus.status === 'granted');

                const audioStatus = await Camera.requestMicrophonePermissionsAsync();
                setHasAudioPermission(audioStatus.status === 'granted');
            } catch (error) {
                console.error(error);
            }
        };
        setLoading(true);
        fetchPermission();
        return () => { isMounted = false };
    }, []);

    //custom back fro android
    useEffect(() => {
        function handleBackButton() {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Routes' }],
            })
          return true;
        }
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    
        return () => backHandler.remove();
    }, [navigation]);

    //const { params } = route.params;
    useEffect(() => {
        let isMounted = true;
        const sautiObject = async () => {
            try {
                if(route.params){   
                    const mysautiUri = await route.params.sautiUri;
                    const mysautiName = await route.params.sautiName;
                    const mysautiDuration = await route.params.sautiDuration;
                    setSauti(mysautiName);
                    setSautiUri(mysautiUri);
                    setSautiDuration(mysautiDuration);
                    console.log(mysautiName);
                }
            } catch (error) {
                console.error(error);
            }
        };
        sautiObject();  
        return () => {
            isMounted = false;
        };
    }, [route]);

    useEffect(() => {
        (async () => {
            console.log('status', playing)
            if (playing) {
                await sound.stopAsync();
                await sound.unloadAsync();
                setPlaying(false);
            }
        })()

      // this function will be fired when you leave the page
      return ()=>{
            sound && sound.unloadAsync()
   
         }
      
    }, [sound])


    const stopPlay = async () => {
        if(playing) {
            await sound.stopAsync();
            await sound.unloadAsync();
            setPlaying(false);
        }
    }
    const playSound = async () => { 
        if(playing) {
            await sound.unloadAsync();
            setPlaying(false);
            console.log('unloaded');
        }
        else {
            const soundObject = new Audio.Sound();
            try {
                console.log(sautiUri);
                await soundObject.loadAsync({
                    uri: sautiUri,
                    shouldPlay: true 
                    }
                );
                await soundObject.playAsync();
                setSound(soundObject);
                setPlaying(true);
            } catch (error) {
                console.log(error);
            }
        }
    }



    if (hasAudioPermission === null && hasCameraPermission === null) {
        return <View />;
    }
    if (hasAudioPermission === false && hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }


    if(!loading){
        return (
            <View style={styles.AndroidSafeArea}></View>
        );
    }
    
    const takeVideo = async () => {
        if(camera){
            const data = await camera.recordAsync();
            setRecord(data);
            navigation.navigate('Edit', {
                recordClip: data,
            });
        }
    }

    const stopVideo = async () => {
        camera.stopRecording();   
    }

    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            {isFocused && (
                <Camera 
                ref={ref => setCamera(ref)}
                style={[styles.camera, {marginBottom: imagePadding * 2}]} 
                onCameraReady={setCameraReady}
                type={type}
                ratio={ratio}
                autoFocus="on"
                zoom={zooming}
                //maxDuration={10000}
                flashMode={flash}
                >
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <TouchableOpacity
                                onPress = {
                                    () => {
                                        goBack()
                                    }
                                }
                            >
                                <MaterialCommunityIcons size={30} name="close" color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity><Text numberOfLines={1} ellipsizeMode="tail" style={styles.sautiStyle}>{sauti}</Text></TouchableOpacity>
                            <View style={styles.topRightCont}>
                            <TouchableOpacity
                                style={styles.icon}
                                onPress={() => { 
                                setType(
                                    type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                                );
                                }}>
                                <MaterialIcons style={styles.flipIcon} size={30} name="flip-camera-android" color="#fff" />
                                <Text style={styles.textStyle}>flip</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.icon}>
                                <Ionicons size={30} name="ios-color-filter-outline" color="#fff" />
                                <Text style={styles.textStyle}>filters</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            style={styles.icon}
                            onPress={() => { 
                                setFlash(
                                    flash === Camera.Constants.FlashMode.off
                                    ? Camera.Constants.FlashMode.torch
                                    : Camera.Constants.FlashMode.off
                                );

                            }}>
                                { (flash) ?    
                                    <Ionicons size={30} name="flash-outline" color="#fff" />
                                :
                                    <Ionicons size={30} name="flash-off" color="#fff" />
                                }
                                <Text style={styles.textStyle}>flash</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    </View>
                </Camera>
            )}
            <View style={styles.floatingControl}>
                <TouchableOpacity onPress={gotoSauti} style={{
                    backgroundColor: '#fff',
                    borderRadius: 50,
                    padding: 3,
                }} ><MaterialCommunityIcons size={30} name="music" color="red" /></TouchableOpacity>
                <TouchableOpacity
                    onPressIn ={ () => 
                        {
                            if(sautiUri){
                                playSound();
                            }
                            takeVideo() 
                        }
                    }
                    onPressOut={ () => 
                        {
                            if(sautiUri){
                                stopPlay();
                            }
                            stopVideo() 
                        }
                    }
                >
                    <MaterialCommunityIcons size={80} name="record-circle" color="red" />
                </TouchableOpacity>
                <TouchableOpacity 
                style={{
                    backgroundColor: '#fff',
                    borderRadius: 50,
                    padding: 3,
                }} 
                onPress={gotoGallery} ><MaterialCommunityIcons size={30} name="view-grid" color="red" />
                </TouchableOpacity>
            </View>
       </SafeAreaView>
    )
}

export default Record;