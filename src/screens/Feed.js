import React, { useState, useRef } from 'react';
import { View, ScrollView, Share, Text, Animated, Easing, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import styles from '../styles/feedstyles';
import { Avatar } from 'react-native-paper';
import Comments from '../components/post_comment';
import SlideAnimated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

const options = {
    title: 'Share via',
    message: 'some message',
};
const shareit = async () => {
    const shareResponse = await Share.share(options);
};

const Feed = (props) => {
    const pressAlbum = () => {
        props.navigation.navigate("Album");
    };
    const pressUser = () => {
        props.navigation.navigate("User Profile");
    };
    const sheetRef = useRef(null);
    const [pause, setPause] = useState(props.play);
    const onPlayPausePress = () => { 
        setPause(!pause);
        sheetRef.current.snapTo(1);
    };
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
                }}>300 Comments</Text>
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
    return (
        <View style={styles.feed}>
            <TouchableWithoutFeedback
                onPress = {
                    onPlayPausePress
                }
            > 
                <Video
                    source={{ uri: props.item }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay={pause}
                    isLooping
                    loading="lazy"
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        borderRadius: 12,
                    }}
                />
            </TouchableWithoutFeedback>
            <View style={styles.rightContent}>
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
                                />
                    <Text style={styles.text}>564</Text>
                </TouchableOpacity>
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
                    <Text style={styles.text}>432</Text>
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
    )
}

export default Feed;