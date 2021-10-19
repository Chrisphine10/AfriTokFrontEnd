import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, Text, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
//import * as DocumentPicker from 'expo-document-picker';
import * as MediaLibrary from 'expo-media-library';
import styles from '../styles/songsliststyles';
import { Audio } from 'expo-av';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MySauti = ({navigation, gotoRecord }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [sound, setSound] = useState();
    const [use, setUse] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(false);
    const [isPress, setIsPress ] = useState(false);

    useEffect(() => {
        MediaLibrary.getPermissionsAsync();
        const pickDocument = async () => {
            try {
                let result = await MediaLibrary.getAssetsAsync({
                    mediaType: MediaLibrary.MediaType.audio,
                })
                setData(await result.assets);
                setLoading(false);
                //console.log(result.assets);
            } catch (error) {
                console.log(error);
            }
        ;}
        pickDocument();
        return function cleanup() {
            console.log('I am in cleanup function');
        };
    }, []);
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


    if(isLoading) {
        return <View><Text>Loading...</Text></View>;
    }
   
    function getFileExtension(filename) {
        return (filename.split('.').pop() === 'mp3');
    }
    const stopPlay = async (index) => {
        if(playing) {
            await sound.stopAsync();
            await sound.unloadAsync();
            setPlaying(true);
            playSound(index);
        }
    }
    const playSound = async (index) => { 
        if(playing) {
            await sound.unloadAsync();
            setPlaying(false);
            setCurrentIndex(index);
        }
        else {
            const soundObject = new Audio.Sound();

            try {
                await soundObject.loadAsync({
                    uri: index.uri,
                    shouldPlay: true 
                    }
                );
                await soundObject.playAsync();
                setSound(soundObject);
                setPlaying(true);
                setCurrentIndex(index);
            } catch (error) {
                console.log(error);
            }
        }
    }


    return (
    <View>
        <MasonryList
            data={data}
            rerender={true}
            keyExtractor={(item, index) => item.id.toString() }
            showsVerticalScrollIndicator={true}
            contentContainerStyle={ {
                backgroundColor: '#fff',
            }}
            scrollEventThrottle={16}          
            renderItem={ ({item})  => (
                getFileExtension(item.filename) ? 
                <TouchableWithoutFeedback  key={item.id}>
                    <View style={styles.sautiSection}>
                        <View style={styles.sauti}>
                            <View>
                                <TouchableHighlight
                                style={styles.icon}
                                >
                                <Image
                                source={require('../../assets/images/Afrotok-icon.png')}
                                style={{
                                    width: 40, 
                                    height: 40,
                                    borderRadius: 5,
                                    resizeMode: 'contain',
                                    margin: 5,
                                    
                                }}
                                loading="lazy"
                                />
                                </TouchableHighlight>
                              
                                <MaterialCommunityIcons
                                    name={playing && (currentIndex.id === item.id) ? 'pause' : 'play'}
                                    size={50}
                                    style={{
                                        position: 'absolute',
                                        zIndex: 1,
                                    }}
                                    onPress={ () => {
                                        if(playing && (currentIndex.id !== item.id)) {
                                            stopPlay(item);
                                            playSound(item);
                                        }
                                        else {
                                            playSound(item);
                                        }
                                        setIsPress(item.id);
                                        setUse(true);
                                    }
                                    }
                                />
                            </View>
                            <TouchableOpacity
                                onPress={ () => {
                                        if(playing && (currentIndex.id !== item.id)) {
                                            stopPlay(item);
                                        }
                                        setIsPress(item.id);
                                        setUse(true);
                                        }
                                    }
                                    
                                
                            style={styles.description}>
                                <View><Text style={styles.title} numberOfLines={1}>{item.filename}</Text></View>
                                <View><Text style={styles.duration}>{Math.floor((item.duration) / 60 )}:{Math.ceil((item.duration) % 60 )}</Text></View>
                                
                                { 
                                (use && isPress == item.id) ? (
                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    backgroundColor: '#cd9115',
                                    width: 60,
                                    position: 'absolute',
                                    height: '100%',
                                    borderRadius: 5,
                                    right: 0,
                                }}
                                onPress={ () => {
                                    gotoRecord(item.filename, item.uri, item.duration);
                                }
                                }
                                ><Text style={styles.duration}>Use</Text>
                            </TouchableOpacity>
                                ) : (<View></View>)}
                            </TouchableOpacity>
                        </View>
                    </View>
                        
                </TouchableWithoutFeedback >
                : <View key={item.id}></View>
            )}
            numColumns={1}
        />
    </View>
    );
}
export default MySauti;