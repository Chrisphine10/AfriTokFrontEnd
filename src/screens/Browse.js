import React, { useState, useEffect } from 'react';
import { View, Image, Text, Dimensions, SafeAreaView, TouchableOpacity} from 'react-native';
import styles from '../styles/browsestyles';
import { Searchbar } from 'react-native-paper';
import MasonryList from '@react-native-seoul/masonry-list';
import Images from '../api/test/images';

const Browse = () => {

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
                    keyExtractor={(item, index) => item.id.toString() }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={ {
                        margin: 0,
                        backgroundColor: '#fff',
                    }} 
                    renderItem={ ({item})  => (
                        <View key={item.id} >
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
        </SafeAreaView>
    )
}

export default Browse;