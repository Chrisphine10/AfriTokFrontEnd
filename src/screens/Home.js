import React, { useState,useEffect } from 'react';
import { View, Animated,  Text, Image } from 'react-native';
import PageView from 'react-native-pager-view';
import Feed from './Feed';
import test from '../../test.json';
import styles from '../styles/homestyles';
import Video from '../api/test/video';

const PagerView = Animated.createAnimatedComponent(PageView);

const Home = () => {

    const [tab, setTab] = useState(1);
    const [data, setData] = useState(false);
    const [active, setActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    
    useEffect(() => {
        const fetchData = async () => {
        try {
                const videos = await Video();
                setData(videos);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    if(isLoading) {
        return <View style={{justifyContent: 'center', alignContent:'center', textAlign: 'center', height: '100%'}}><Text>Loading...</Text></View>;
    }
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
            {data.map((item) => 
                  (
                      item.video_files.map(video => (
                        <View key={video.id}>
                            <Feed 
                                item={video.link} 
                                music={video.id}
                                tags={video.file_type} 
                                username={video.file_type} 
                                play={Number(video.id) === active} 
                            />
                        </View>
                      ))
                    )
               )
            }
            </PagerView>
        </View>
    )
}
export default Home;
