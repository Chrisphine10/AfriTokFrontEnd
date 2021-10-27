import React, { useState, useRef, useEffect } from 'react';
import { 
    View, 
    Image, 
    ScrollView, 
    Share, 
    Text, 
    Animated, 
    Easing, 
    TouchableWithoutFeedback, 
    TouchableOpacity,
 } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import styles from '../styles/feedstyles';
import { Avatar } from 'react-native-paper';
import Comments from '../components/post_comment';
import SlideAnimated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
//import * as VideoThumbnails from 'expo-video-thumbnails';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserVideoLikes, likeVideo } from '../api/actions/videoLikeActions';
import { deleteLikeVideo} from '../api/actions/videoLikeActions';
import { fetchVideoLikes } from '../api/actions/videoLikeActions';

const Feed = (props) => {
    const options = {
        title: 'Share via',
        message: 'some message',
    };
    const shareit = async () => {
        const shareResponse = await Share.share(options);
    };
    var abbreviate = require('number-abbreviate');
    const pressAlbum = () => {
        props.navigation.navigate("Album");
    };
    const pressUser = () => {
        props.navigation.navigate("User Profile");
    };
    const sheetRef = useRef(null);
    const [pause, setPause] = useState(props.play);
    const [image, setImage] = useState(null);
    const onPlayPausePress = () => { 
        setPause(!pause);
        sheetRef.current.snapTo(1);
    };
    const [like, setLike] = useState(false);

    const commentHeight = (80 * 13);
    const spinValue = new Animated.Value(0);
    const renderContent = () => (
        <View
          style={{
            backgroundColor: 'white',
            padding: 16,
            zIndex: 9,
          }}
        >
            <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'flex-end', marginBottom: 20 }}>
                <View><Text style={{
                color: 'black',
                fontWeight: "800",
                fontSize: 14,
                fontFamily: 'AbelRegular',
                alignSelf: "center"
                }}>{props.comments} Comments</Text>
                </View>
                <View>
                    <AntDesign 
                    name="close"
                    size={15}
                    style={{
                        paddingLeft: 120,
                        marginRight: 5,
                    }}
                    />
                </View>
            </View> 
            <ScrollView 
            style={{width: '100%', height: commentHeight }}
            scrollEventThrottle={1}
            showsVerticalScrollIndicator={false}
            >
                <Comments />
                <Comments />
                <Comments />
                <Comments />
                <Comments />
                <Comments />
                <Comments />
                <Comments />
                <Comments />
                <Comments />
                <Comments />
                <Comments />
                <Comments />
            </ScrollView>
            
        </View>
    );   
    Animated.loop(
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 10000,
            easing: Easing.linear,
            useNativeDriver: true,
        }),
    ).start();
    
    const rotateProp = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
        
    });

    const videoRef = useRef();
   
  
  // play and pause video
    const onPlayPause = () => {
        if (videoRef.current.status.isLoaded) {
            if (videoRef.current.status.isPlaying) {
                setPause(true);
            } else {
                setPause(false);
            }
        }
    };
    // useEffect(() => {
    //     let isMounted = true;
    //     const generateThumbnail = async () => {
    //         try {
    //           const { uri } = await VideoThumbnails.getThumbnailAsync( props.image,
    //             {
    //               time: 15000,
    //             }
    //           );
    //           setImage(uri);
    //         } catch (e) {
    //           console.warn(e);
    //         }
    //       };
    //     generateThumbnail();
    //     return () => { isMounted = false };
    // }, []);
    const dispatch = useDispatch(); 
    const videoLikes = useSelector(state => state.allVideoLikes.likes);
    useEffect(() => {
        let isMounted = true;
        const fetchData = () => {
            try { 
                if(videoLikes[0] && videoLikes[0] !== []){    
                    setLike(true);
                }
                else{
                    setLike(false);
                }
            } catch (error) {
                console.error(error);
            } 
        };
        fetchData();
        return () => isMounted = false;
    }, [videoLikes]);
    
    useEffect(() => {
        let isMounted = true; 
        const fetchLikeData = () => {
            try {
                dispatch(fetchUserVideoLikes("admin", props.id));
            } catch (e) {
                console.warn(e);
            }
        };
        fetchLikeData();
        return () => isMounted = false;
    }, [props.id]);

    
    return (
        <View style={styles.feed}>
        <View>
            <TouchableWithoutFeedback
                onPress = {
                    onPlayPausePress
                }
            > 
                <Video
                    //source={{ uri: require('../../assets/big_buck_bunny.mp4') }}
                    source={{uri: props.item }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    //lazy
                    onLoadStart={() => {
                        console.log('load start');
                    }}
                    ref={videoRef}
                    resizeMode={Video.RESIZE_MODE_COVER}
                    shouldPlay={(props.index === props.clip) && pause} 
                    isLooping
                    //shouldCorrectPitch={true}
                    //usePoster={true}
                    //posterSource={{uri: props.image}}
                    progressUpdateIntervalMillis={50}
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        borderRadius: 12,
                    }}
                />
            </TouchableWithoutFeedback> 
            <View style={styles.rightContent}>
                { like && (
                    <TouchableOpacity style={styles.icons}>
                        <MaterialCommunityIcons 
                                    name="heart" 
                                    size={38} 
                                    color="red"
                                    style={{
                                        textShadowColor: 'rgba(0, 0, 0, 0.80)',
                                        textShadowOffset: {width: -0.5, height: 0.5},
                                        textShadowRadius: 1,
                                    }}
                                    onPress={() => {
                                        dispatch(deleteLikeVideo(videoLikes[0].id));
                                    }}
                                    />
                        <Text style={styles.text}>{abbreviate(props.likes)}</Text>
                    </TouchableOpacity>
                )}
                { !like && (
                    <TouchableOpacity style={styles.icons}>
                        <MaterialCommunityIcons 
                                    name="heart" 
                                    size={38} 
                                    color="white"
                                    style={{
                                        textShadowColor: 'rgba(0, 0, 0, 0.80)',
                                        textShadowOffset: {width: -0.5, height: 0.5},
                                        textShadowRadius: 1,
                                    }}
                                    onPress={() => {
                                        var today = new Date();
                                        const date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
                                        //const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                                       // const dateTime = date+' '+time;
                                        console.log(date);
                                        console.log(today);
                                        console.log(props.clip)
                                        dispatch(likeVideo("admin", props.clip, date));
                                    }}
                                    />
                        <Text style={styles.text}>{abbreviate(props.likes)}</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.icons}>
                    <MaterialCommunityIcons 
                                name="comment-processing" 
                                size={38} 
                                color="#f5f5f5"
                                style={{
                                    textShadowColor: 'rgba(0, 0, 0, 0.80)',
                                    textShadowOffset: {width: -0.5, height: 0.5},
                                    textShadowRadius: 1,
                                }}
                                onPress={() => {
                                        sheetRef.current.snapTo(0)
                                }
                                }
                                />
                    <Text style={styles.text}>{abbreviate(props.comments)}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.icons}>
                    <AntDesign 
                                name="sharealt" 
                                size={38} 
                                color="#f5f5f5"
                                style={{
                                    textShadowColor: 'rgba(0, 0, 0, 0.80)',
                                    textShadowOffset: {width: -0.5, height: 0.5},
                                    textShadowRadius: 1,
                                }}
                                onPress={shareit}
                                />
                    <Text style={styles.text}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={pressAlbum}
                style={styles.avatar}>  
                    <Animated.View
                    style={{
                    borderRadius: 50,
                    borderWidth: 3,
                    borderColor: '#fff',
                    transform: [
                        {
                        rotate: rotateProp,
                        },
                    ],
                    }}
                    >            
                        <Avatar.Image
                        size={40}
                        source={ require('../../assets/images/test1.jpg')}
                        />
                    </Animated.View>
                </TouchableOpacity>
            </View>
            <View style={styles.leftContent}>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center'}}>
                    <TouchableOpacity 
                    onPress={pressUser}
                    style={styles.user}>        
                        <Avatar.Image
                        size={38}
                        source={ require('../../assets/images/test4.jpg')}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.username}>{props.username}</Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.followText}>Follow</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.tag}>
                    <Text 
                    numberOfLines={4} 
                    style={styles.text}
                    >{props.tags}</Text>
                </View>
                <TouchableOpacity 
                style={styles.sauti}
                onPress={pressAlbum}
                >
                    <View style={{flexDirection: 'column'}}>
                        <Text 
                        style={styles.text}
                        numberOfLines={1}
                        >
                            <MaterialCommunityIcons 
                            name="file-music" 
                            size={20} 
                            color="#f5f5f5"
                            />
                            {props.music}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
                            
            <BottomSheet
                ref={sheetRef}
                snapPoints={[450, 0, 0]}
                initialSnap={1}
                borderRadius={10}
                renderContent={renderContent}
            />
        </View>
        </View>
    )
}

export default Feed;