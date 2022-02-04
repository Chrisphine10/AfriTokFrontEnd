import React, {useState, useEffect, useRef} from 'react';
import { SafeAreaView, Image, View, Dimensions, Text, TouchableOpacity} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TextInput as Input } from 'react-native-paper';
import styles from '../../styles/poststyles';
import { MaterialIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { uploadFile, removeCurrentFile } from '../../api/actions/awsActions';
import { uploadThumb, removeCurrentThumb } from '../../api/actions/thumbnailActions';
import { fetchTags } from '../../api/actions/tagActions';
import { fetchSongs } from '../../api/actions/songActions';
import { fetchAlbum } from '../../api/actions/albumActions';
import { addVideo, removeCurrentVideo } from '../../api/actions/videoActions';
import { useDispatch, useSelector } from "react-redux";
import * as VideoThumbnails from 'expo-video-thumbnails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUserDetails } from '../../api/actions/userDetailsActions';
import { ProgressBar, Colors } from 'react-native-paper';

const Post = ({ route, navigation } ) => {
    const video = useRef(null);
    const [status, setStatus] = useState({});
    const [image, setImage] = useState(null);
    const [videoFile, setVideoFile] = useState(false);
    const [shrink, setShrink] = useState(500);
    const [post, setPost] = useState("");
    const [screenshot, setScreenshot] = useState(false);
    const [duration, setDuration] = useState(0);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [login, setLogin] = useState(null);
    const today = new Date();
    const section = {
        "id": 2,
        "name": "default",
    }

    const user = {
        "id": 1,
        "login": login,
    }
    const dispatch = useDispatch();
    const file = useSelector(state => state.allAWSFiles.files);
    const thumb = useSelector(state => state.allThumbnails.files);
    const tags = useSelector(state => state.allTags.tags);
    const songs = useSelector(state => state.allSongs.songs);
    const albums = useSelector(state => state.allAlbums.albums);
    const userDetails = useSelector(state => state.userDetails.details);
    const videoSaved = useSelector(state => state.allVideos.videos);

    useEffect(() => {
        let isMounted = true;
        cleanup();
        return () => isMounted = false;
    }, []);

    useEffect(() => {
        let isMounted = true;
        if(progress == 1) {
            goBack();
        }
        return () => isMounted = false;
    }, [progress]);

    function goBack () {
        cleanup();
        navigation.reset({
            index: 0,
            routes: [{ name: 'Routes' }],
        })
    };

    const cleanup = async () => {
        try {
            dispatch(await removeCurrentFile());
            dispatch(await removeCurrentThumb());
            dispatch(await removeCurrentVideo());
            const login = await AsyncStorage.getItem('userName');
            setLogin(login);
            dispatch(await fetchUserDetails(login));
            setVideoFile(route.params.video.uri);
        } catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        let isMounted = true;
        const fetchAllData = async () => {
            try{
                if(videoFile){
                    setDuration(duration);
                    dispatch(await fetchAlbum());
                    dispatch(await fetchSongs());
                    dispatch(await fetchTags());
                    const { uri } = await VideoThumbnails.getThumbnailAsync(videoFile,
                        {
                            time: 15000,
                        }
                    );
                    setScreenshot(uri);
                }
            } catch(e){
                console.log(e);
            }
        }
        fetchAllData();
        return () => isMounted = false;
    }, [videoFile]);

    useEffect(() => {
        let isMounted = true;
        
        const uploadVideoBack = async () => {
            try {
                if(file && file.length !== 0 && thumb && thumb.length !== 0){
                    console.log("file", file);
                    console.log("thumb", thumb);
                    setProgress(0.9);
                    dispatch(await addVideo(
                        "https://afrotok-output.s3.us-east-1.amazonaws.com/output/" + file, 
                        "https://afrotok-input.s3.us-east-1.amazonaws.com/thumbnails/" + thumb,
                        "English",
                        post, 
                        false,
                        true,
                        true,
                        duration,
                        0,
                        0,
                        section,
                        songs[3],
                        user,
                        null,
                    ));
                    setProgress(1);
                }
                else {
                    setProgress(0);
                }
            } catch(e){
                console.log(e);
            }
        }
        uploadVideoBack();
        return () => isMounted = false;
    }, [file]);
 
    const onTextFocus = () => {
        setShrink(700);
    }
    const onTextUnFocus = () => {
        setShrink(500);
    }
 
    const uploadVideo = async (video) => {
        setLoading(true);
        setProgress(0.2);
        dispatch(await uploadFile(video));
        setProgress(0.3); 
        dispatch(await uploadThumb(screenshot)); 
    }

    if(loading){
        return (
            <View style={{marginHorizontal: 20 }}>
                <ProgressBar style={{marginTop: 300}}progress={progress} color="#49B5F2" />
            </View> 
        )
    }
    else
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