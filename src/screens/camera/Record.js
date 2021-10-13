import React, { useState, useEffect }from 'react';
import { SafeAreaView, Dimensions, Image, View, Text, TouchableOpacity} from 'react-native';
import styles from '../../styles/recordstyles';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';

const Record = ({ navigation }) => {
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
    const [loading, setLoading] = useState(false);
    //const [loadEdit, setLoadEdit] = useState(false);
    const [hasAudioPermission, setHasAudioPermission] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] =useState(null);
    const [camera, setCamera] = useState(false);
    const [record, setRecord] = useState(false);


    function gotoGallery() {
        navigation.navigate('Gallery');
    }

    function goBack () {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Routes' }],
          })
    }

    useEffect(() => {
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
    }, []);

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
            const data = await camera.recordAsync()
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
            <Camera 
            ref={ref => setCamera(ref)}
            style={styles.camera} 
            ratio="16:9"
            type={type}>
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
                        <TouchableOpacity><Text style={styles.sautiStyle}>sauti</Text></TouchableOpacity>
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
                                ? Camera.Constants.FlashMode.on
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
                <View style={styles.floatingControl}>
                    <TouchableOpacity><MaterialCommunityIcons size={30} name="music" color="red" /></TouchableOpacity>
                    <TouchableOpacity
                        onPressIn ={ () => takeVideo() }
                        onPressOut={ () => stopVideo() }
                    >
                        <MaterialCommunityIcons size={80} name="record-circle" color="red" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={gotoGallery} ><MaterialCommunityIcons size={30} name="view-grid" color="red" />
                    </TouchableOpacity>
                </View>
                </View>
            </Camera>
       </SafeAreaView>
    )
}

export default Record;