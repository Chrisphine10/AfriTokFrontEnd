import React, { useState, useEffect } from 'react';
import { View, TouchableWithoutFeedback, Image, Text, Dimensions, SafeAreaView, TouchableOpacity} from 'react-native';
import styles from '../styles/browsestyles';
import { Searchbar } from 'react-native-paper';
import MasonryList from '@react-native-seoul/masonry-list';
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from '../api/actions/videoActions';
import { fetchUserDetails } from '../api/actions/userDetailsActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VideoSearch from '../components/videosearch';
const Browse = ({ navigation }) => {

    const pressSearch = () => {
        navigation.navigate("Search");
    }
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(false);

    const myvideos = useSelector(state => state.allVideos.videos);
    const dispatch = useDispatch();
    useEffect(() => {
        let isMounted = true;
        
        const fetchData = async () => {
            try {      
                await setData(myvideos);
                //console.log(myvideos);
                if(data && data !== false) {     
                    setLoading(false);
                }
            } catch (error) {
                console.error(error);
            } 
        };
        fetchData();
        return () => isMounted = false;
    }, [myvideos]);
    
    useEffect(() => {
        let isMounted = true; 
        const fetchLikeData = async () => {
            try { 
                dispatch(await fetchVideos());
            } catch (e) {
                console.warn(e);
            }
        };
        fetchLikeData();
        return () => {
            isMounted = false;
        }
    }, []); 

    if(isLoading) {
        return <View><Text>Loading...</Text></View>;
    }
    else {
        return (
            <SafeAreaView style={styles.AndroidSafeArea}>
                <TouchableOpacity
                onPress={pressSearch}
                style={styles.search}>
                    <Searchbar
                        style={{
                            borderRadius: 5,
                            height: 40,
                            backgroundColor: '#fff',
                        }}
                        inputStyle={{
                            fontSize: 14,
                            fontFamily: 'AbelRegular',
                        }}
                        selectTextOnFocus={false}
                        placeholder="Search for Users, Videos and Songs ..."
                        editable={false}
                    />
                </TouchableOpacity>
                <View>
                    { data ? (
                        <View>
                            <VideoSearch data={data} />
                        </View>
                    ) : (<View><Text>No video found!</Text></View>)}
                </View>
            </SafeAreaView>
        )
    }
}

export default Browse;