import React, { useState } from 'react';
import { View, Animated,  Text, Image } from 'react-native';
import PageView from '@react-native-community/viewpager';
import Feed from './Feed';
import test from '../../test.json';
import styles from '../styles/homestyles';

const PagerView = Animated.createAnimatedComponent(PageView);

const Home = () => {

    const [tab, setTab] = useState(1);
    const [active, setActive] = useState(0);
    return (
        <View style={{backgroundColor: 'black', marginTop: 20}}>
            <View style={styles.header}>
                <View style={styles.row}>
                    <View 
                    style={styles.headerText}
                    onPress={ () => setTab(1) }
                    >
                        <Text 
                        active={tab === 1}
                        style={styles.text}
                        >Yours</Text>
                    </View>
                    <Image 
                    source ={require('../../assets/images/Afrotok-icon.png')}
                    style={styles.logo}
                    />
                    <View 
                    style={styles.headerText}
                    onPress={ () => setTab(2) }
                    >
                        <Text 
                            style={styles.text}
                            active={tab === 1}>Trends
                        </Text>
                    </View>
                </View>
            </View>
            <PagerView 
            style={styles.pagerView}
            initialPage={0}
            orientation= "vertical"
            >
               {test.feed.map(item => ( 
                <View key={item.id}>
                    <Feed item={item.uri} music={item.music} tags={item.tags} username={item.username} play={Number(item.id) === active} />
                </View>
                ))}
            </PagerView>
        </View>
    )
}
export default Home;
