import React, { useState, useEffect } from 'react';
import { View, TouchableWithoutFeedback, Image, Text, Dimensions, SafeAreaView, TouchableOpacity} from 'react-native';
import styles from '../styles/browsestyles';
import { Searchbar } from 'react-native-paper';
import MasonryList from '@react-native-seoul/masonry-list';
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from '../api/actions/videoActions';
import { fetchUserDetails } from '../api/actions/userDetailsActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
                            borderRadius: 30,
                            height: 40,
                        }}
                        inputStyle={{
                            fontSize: 14,
                            fontFamily: 'AbelRegular',
                        }}
                        selectTextOnFocus={false}
                        placeholder="Search"
                        editable={false}
                    />
                </TouchableOpacity>
                <View>
                    { data ? (
                        <View>
                            <MasonryList
                                data={data}
                                keyExtractor={(item, index) => item.id.toString() }
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{
                                    margin: 0,
                                    backgroundColor: '#fff',
                                }} 
                                renderItem={ ({item})  => (
                                    <TouchableWithoutFeedback key={item.id} >
                                        <Image
                                            source={{ uri: item.screenshort }}
                                            style={{
                                                margin: 0.5,
                                                width: Dimensions.get('window').width/3.05, 
                                                height: Dimensions.get('window').width * 0.75,
                                                borderRadius: 5,
                                                resizeMode: 'cover',

                                            }}
                                            loading="lazy"
                                            />
                                    </TouchableWithoutFeedback>
                                )}
                                numColumns={3}
                            />
                        </View>
                    ) : (<View><Text>No video found!</Text></View>)}
                </View>
            </SafeAreaView>
        )
    }
}

export default Browse;