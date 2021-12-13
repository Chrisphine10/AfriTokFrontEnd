import React, { useState, useEffect } from 'react';
import { View, Image, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { fetchVideosByUser } from '../api/actions/videoActions';

const MyImages = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(false);

    const myvideos = useSelector(state => state.allVideos.videoByUsers);
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
                dispatch(await fetchVideosByUser(props.login));
            } catch (e) {
                console.warn(e);
            }
        };
        fetchLikeData();
        return () => {
            isMounted = false;
        }
    }, []); 

    if(isLoading && props.login !== null) {
        return <View><Text>Loading...</Text></View>;
    }
    else {
        return (
            <View>
            { data ? (
                <View>
                    <MasonryList
                        data={data}
                        keyExtractor={(item, index) => item.id.toString() }
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={ {
                            margin: 0,
                            backgroundColor: '#fff',
                        }}
                        renderItem={ ({item})  => (
                            <TouchableWithoutFeedback key={item.id}>
                                <Image
                                    source={{uri: item.screenshot}}
                                    lazy
                                    style={{
                                        margin: 1,
                                        width: Dimensions.get('window').width/3.05, 
                                        height: Dimensions.get('window').width * 0.65,
                                        borderRadius: 5,
                                        resizeMode: 'cover',

                                    }}
                                    />
                            </TouchableWithoutFeedback >
                        )}
                        numColumns={3}
                    />
                </View>
            ) : (<View></View>)}
        </View>
        );
    }
}

export default MyImages;