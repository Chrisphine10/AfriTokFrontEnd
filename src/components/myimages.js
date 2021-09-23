import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, Text, Dimensions, TouchableOpacity} from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import Images from '../api/test/images';

const MyImages = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const images = await Images();
                setData(images);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    if(isLoading) {
        return <View><Text>Loading...</Text></View>;
    }
    return (
        <View>
        <MasonryList
            data={data}
            rerender={true}
            keyExtractor={(item, index) => item.id.toString() }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={ {
                backgroundColor: '#fff',
            }}
            renderItem={ ({item})  => (
                <View key={item.id}>
                    <Image
                        source={{ uri: item.src.portrait }}
                        style={{
                            margin: 0.5,
                            width: Dimensions.get('window').width/3.05, 
                            height: Dimensions.get('window').width * 0.75,
                            borderRadius: 5,
                            resizeMode: 'cover',
                            
                        }}
                        loading="lazy"
                        />
                </View>
            )}
            numColumns={3}
        />
    </View>
    );
}
export default MyImages;