import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, Text, Dimensions, SafeAreaView, TouchableOpacity} from 'react-native';
import styles from '../styles/browsestyles';
import { Searchbar } from 'react-native-paper';
import MasonryList from '@react-native-seoul/masonry-list';
import test from '../../test.json';

const Browse = () => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const API_KEY = "563492ad6f91700001000001562a8e890c124dc78e84162aaa8f119c"
    const API_URL = "https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20"

    const getImages = async () => {
        try {
          const response = await fetch(API_URL,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                    }
                });
          const { photos } = await response.json();
          return photos;
        } catch (error) {
          console.error(error);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
        try {
                const images = await getImages();
                setData(images);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    if(isLoading) {
        return <View><Text>Loading...</Text></View>;
    }
    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <TouchableOpacity
            onPress={() => {
                console.warn('Search Pressed')
            }}
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
                <MasonryList
                    data={data}
                    keyExtractor={item=>item.id.toString()}
                    contentContainerStyle={ {
                        margin: 0,
                        backgroundColor: '#fff',
                    }}
                    renderItem={({ item }) => (
                        <View>
                            <Image
                                source={{ uri: item.src.portrait }}
                                style={{
                                    margin: 0.5,
                                    width: Dimensions.get('window').width/3.05, 
                                    height: Dimensions.get('window').width * 0.75,
                                    borderRadius: 5,
                                    resizeMode: 'cover',

                                }}
                                />
                        </View>
                    )}
                    numColumns={3}
                />
            </View>
        </SafeAreaView>
    )
}

export default Browse;