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
import LottieView from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native';
//import * as VideoThumbnails from 'expo-video-thumbnails';
import { useDispatch, useSelector } from "react-redux";
import { 
    fetchUserVideoLikes, 
    likeVideo, 
    removeCurrentLike,
    deleteLikeVideo,
    fetchVideoLikes
 } from '../api/actions/videoLikeActions';
import { 
    fetchFollowUser,
    addFollowUser,
    deleteFollowUser,
    removeCurrentFollowUser
} from '../api/actions/followActions';
import baseAPI from '../api/baseAPI';

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
        props.navigation.navigate("User Profile", {
            username: props.username,
        });
    };
    const sheetRef = useRef(null);
    const [pause, setPause] = useState();
    const [image, setImage] = useState(null);
    const onPlayPausePress = () => { 
        setPause(!pause);
        sheetRef.current.snapTo(1);
    };
    const [like, setLike] = useState(false);
    const [loadLike, setLoadLike] = useState(false);
    const [currentLike, setCurrentLike] = useState(true);
    const [currentFollow, setCurrentFollow] = useState(true);
    const [follow, setFollow] = useState(false);
    const [loadFollow, setLoadFollow] = useState(false);
    const isFirstRunFollow = useRef(true);
    const isFirstRunLike = useRef(true);
    const isSecondRunLike = useRef(true);
    const isSecondRunFollow = useRef(true);
    //const [isLoading, setIsLoading] = useState(true);
    const commentHeight = (80 * 13);
    const spinValue = new Animated.Value(0);
    const screenIsFocused = useIsFocused();
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
   
    // useEffect(() => {
    //     const unsubscribe = props.navigation.addListener('blur', () => {
    //       console.log('Leaving Home Screen');
    //       setPause(false); 
    
    //       // new code add to pause video from ref
    //       videoRef.current.pauseVideo();
    //     });
    
    //     return unsubscribe;
    // }, [props.navigation]);
  
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
    var videoLikes = [];
    var videoFollows = [];
    const dispatch = useDispatch(); 
    videoLikes = useSelector(state => state.allVideoLikes.likes);
    videoFollows = useSelector(state => state.allFollows.follow);
    //console.log(videoFollows);

    useEffect(() => {
        let isMounted = true;
        //console.log(screenIsFocused)
        const clearData = async () => {
            dispatch(await removeCurrentFollowUser());
            dispatch(await removeCurrentLike());
        }
        clearData();
        return () => {
            isMounted = false;
        }
    }, [props.username]);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try { 
                if(await videoLikes && videoLikes[0] && videoLikes !== []){ 
                    if(currentLike){
                        setLike(true);  
                    }
                }
                else {
                    if(currentLike){
                        setLike(false);  
                    }
                }
            } catch (error) {
                console.error(error);
            } 
        };
        if (isFirstRunLike.current) {
            isFirstRunLike.current = false;
        }
        else {
            fetchData();
            setLoadLike(true);
        }
        return () => {
            isMounted = false;
        }
    }, [videoLikes]);

    useEffect(() => {
        let isMounted = true;
        const fetchFollowData = async () => {
            try {
                dispatch(await fetchFollowUser(props.currentUser.login, props.userId));
            } catch (e) {
                console.warn(e);
            }
        };
        fetchFollowData();
        return () => {
            isMounted = false;
        }
    }, [follow]);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try { 
                if(await videoFollows && videoFollows[0] && videoFollows !== []){
                    if(currentFollow){
                        setFollow(true);
                    }
                } 
                else {
                    if(currentFollow){
                        setFollow(false);
                    }
                }
            } catch (error) {
                console.error(error);
            } 
        };
        if (isFirstRunFollow.current) {
            isFirstRunFollow.current = false;
        }
        else if(isSecondRunFollow.current && !isFirstRunFollow.current) {
            isSecondRunFollow.current = false;
        }
        else {
            fetchData();
            setLoadFollow(true);
        }
        return () => {
            isMounted = false; 
        }
    }, [videoFollows]);

    useEffect(() => {
        let isMounted = true; 
        const fetchLikeData = async () => {
            try {
                dispatch(await fetchUserVideoLikes(props.username, props.id));
            } catch (e) {
                console.warn(e);
            }
        };
        fetchLikeData();
        return () => {
            isMounted = false;
            //console.log("like has been cleaned up");
        }
    }, [like]);

    const onFollowPress = async () => {
        if(follow && videoFollows[0]){
            await dispatch(deleteFollowUser(videoFollows[0].id));  
        }   
        else {
            const today = new Date();
            await dispatch(addFollowUser(props.currentUser, props.userId, today));
        }
        setFollow(!follow);
        setLoadFollow(true);
    }

    const onLikePress = async () => {
        if(like && videoLikes[0]){
            await dispatch(deleteLikeVideo(videoLikes[0].id));
        }
        else if(!like) {
            const today = new Date();
            await dispatch(likeVideo(props.currentUser, props.clip, today));
        }
        setLike(!like);
        setLoadLike(true);
    }

    
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
                    //shouldPlay={(props.index === props.clip) && pause} 
                    shouldPlay={(!pause && (screenIsFocused ))}
                    isLooping
                    shouldCorrectPitch={true}
                    usePoster={true}
                    posterSource={{uri: props.image}}
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
                { loadLike && like && (
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
                                    setCurrentLike(false);
                                    setLoadLike(false)
                                    onLikePress();
                                }}
                                />
                        <Text style={styles.text}>{abbreviate(props.likes)}</Text>
                    </TouchableOpacity>
                )}
                { loadLike && !like && (
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
                                        setCurrentLike(false);
                                        setLoadLike(false);
                                        //setLike(true);
                                        //const today = new Date();
                                        //const date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
                                        //const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                                        //const dateTime = date+' '+time;
                                        //dispatch(likeVideo(props.currentUser, props.clip, today));
                                        onLikePress();
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
                    <View>
                    { loadFollow && follow && (
                        <TouchableOpacity
                        onPress={() => {
                            //setLoadLike(false);
                            //setIsLoading(true)
                            //setFollow(false);
                            //dispatch(deleteFollowUser(videoFollows[0].id));
                            setCurrentFollow(false);
                            setLoadFollow(false);
                            onFollowPress();
                        }}
                        >
                        </TouchableOpacity>
                    )}
                    { loadFollow && !follow && (
                        <TouchableOpacity
                        onPress={() => {
                            /* 
                            setLoadLike(false);
                            setIsLoading(true);
                            setFollow(true);
                            const today = new Date();
                            dispatch(addFollowUser(props.currentUser, props.userId, today));
                            */
                           setCurrentFollow(false);
                            setLoadFollow(false);
                            onFollowPress();
                        }}
                        >
                        <Text style={styles.followText}>Follow</Text>
                        </TouchableOpacity>
                    )}
                    </View>
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