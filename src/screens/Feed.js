import React, { useState, useRef } from 'react';
import { View,  ScrollView, Share, Text, Button, Animated, Easing, TouchableWithoutFeedback } from 'react-native';
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
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        borderRadius: 12,
                    }}
                />
            </TouchableWithoutFeedback>
            <View style={styles.rightContent}>
                <View style={styles.icons}>
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
                </View>
                <View style={styles.icons}>
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
                </View>
                <View style={styles.icons}>
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
                </View>
                <View style={styles.avatar}>  
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
                </View>
            </View>
            <View style={styles.leftContent}>
                <View style={styles.user}>        
                    <Avatar.Image
                    size={38}
                    source={ require('../../assets/images/test4.jpg')}
                    />
                <Text style={styles.text}>{props.username}</Text><Text style={styles.followText}>Follow</Text>
                </View>
                <View style={styles.tag}>
                    <Text 
                    numberOfLines={4}
                    style={styles.text}
                    >{props.tags}</Text></View>
                <View style={styles.sauti}>
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
                </View>
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