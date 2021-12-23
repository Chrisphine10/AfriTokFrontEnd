import React, {useState, useEffect, useRef} from 'react';
import { SafeAreaView, Image, View, Dimensions, Text, TouchableOpacity} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TextInput as Input } from 'react-native-paper';
import styles from '../../styles/poststyles';
import { MaterialIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { uploadFile, removeCurrentFile } from '../../api/actions/awsActions';
import { addVideo } from '../../api/actions/videoActions';
import { useDispatch, useSelector } from "react-redux";
import * as VideoThumbnails from 'expo-video-thumbnails';

const Post = ({ route, navigation } ) => {
    const video = useRef(null);
    const [status, setStatus] = useState({});
    const [image, setImage] = useState(null);
    const [videoFile, setVideoFile] = useState(false);
    const [shrink, setShrink] = useState(500);
    const [post, setPost] = useState("");
    const dispatch = useDispatch();
    
    var file = useSelector(state => state.allAWSFiles.files);

    useEffect(() => {
        let isMounted = true;
        const cleanup = async () => {
            await removeCurrentFile();
        }
        cleanup();
        return () => isMounted = false;
    }, [])

    useEffect(() => {
        let isMounted = true;
        try{
            if(route.params.video){
                setVideoFile(route.params.video.uri);
            }
        } catch(e){
            console.log(e);
        }
        return () => isMounted = false;
    }, [route.params.video]);

    useEffect(() => {
        let isMounted = true;
        const uploadVideoBack = async () => {
            try {
                if(file !== [] && file !== null){
                    console.log("test", file);
                    const { uri } = await VideoThumbnails.getThumbnailAsync(videoFile,
                        {
                            time: 15000,
                        }
                    ); 
                    console.log(uri);
                }
            } catch(e){
                console.log(e);
            }
        }
        if(file !== [] && file !== null){
            uploadVideoBack();
        }
        return () => isMounted = false;
    }, [file]);

    const onTextFocus = () => {
        setShrink(700);
    }
    const onTextUnFocus = () => {
        setShrink(500);
    }

    const uploadVideo = async (video) => {
        dispatch(await uploadFile(video));
    }


    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.AndroidSafeArea}>
                <View style={styles.container}>
                    <Video
                        ref={video}
                        style={
                            styles.video, {
                            height: Dimensions.get('window').height - shrink
                            }
                        }
                        source={{
                        uri: videoFile,
                        }}
                        //useNativeControls
                        shouldPlay={false}
                        volume
                        resizeMode="contain"
                        isLooping
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                    />
                </View>
                <View>
                    <View style={styles.line}></View>
                    <Input 
                    style={styles.input}
                    placeholder={"Write a description here..."}
                    multiline={true}
                    onFocus={() => onTextFocus()}
                    onSubmitEditing={() => onTextUnFocus()}
                    onChangeText={(text) => setPost(text)}
                    />
                    <View style={styles.row}>
                        <View style={styles.button}>
                        <MaterialIcons style={styles.icon} size={30} name="save-alt" color="#000" />
                        <Text style={styles.text}>Save</Text>
                        </View>
                        <TouchableOpacity 
                        onPress={() => {uploadVideo(videoFile)}}
                        style={styles.button}>
                            <MaterialIcons style={styles.icon} size={30} name="cloud-upload" color="#000" />
                            <Text 
                                style={styles.text}
                            >Post
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
       </SafeAreaProvider>
    )
}

export default Post;