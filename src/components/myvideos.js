import React, { useState, useEffect } from 'react';
import { View, Image, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import Video from '../api/test/video';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MyVideos = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const videos = await Video();
                setData(await videos);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
        return function cleanup() {
        console.log('I am in cleanup function');
        };
    }, []); 
    if(isLoading) {
        return <View><Text>Loading...</Text></View>;
    }
    return (
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
                <TouchableWithoutFeedback  key={item.id}>
                    <Image
                        source={{uri: item.screenshot}}
                        style={{
                            margin: 1,
                            width: Dimensions.get('window').width/3.05, 
                            height: Dimensions.get('window').width * 0.35,
                            borderRadius: 5,
                            resizeMode: 'cover',

                        }}
                        />
                </TouchableWithoutFeedback >
            )}
            numColumns={3}
        />
    </View>
    );
}

export default MyVideos;