import React, { useState, useRef } from 'react';
import { View, Text, Dimensions, SafeAreaView, TouchableOpacity} from 'react-native';
import styles from '../styles/browsestyles';
import { Searchbar } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';

const Browse = () => {
    const carousel = useRef(null);
    const {width, height} = Dimensions.get('window');
    const renderItem = () => (
        <View>
            <Text>test</Text>
        </View>
    );
    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <View style={styles.search}>
                <Searchbar
                    style={{
                        borderRadius: 30,
                        height: 40,
                    }}
                    inputStyle={{
                        fontSize: 14,
                        fontFamily: 'AbelRegular',
                    }}
                    disable
                    placeholder="Search"
                />
            </View>
            <View>
                <Carousel
                ref={carousel}
                renderItem={renderItem}
                sliderWidth={width}
                itemWidth={width - 10}
                />
            </View>
        </SafeAreaView>
    )
}

export default Browse;