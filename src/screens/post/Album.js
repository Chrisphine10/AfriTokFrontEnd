import React from 'react';
import { Animated, SafeAreaView, Image, View, Text, TouchableOpacity} from 'react-native';
import styles from '../../styles/albumstyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MyImages from '../../components/myimages';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';

const Album = () => {
    const { event, ValueXY } = Animated
    const scrollY = new ValueXY()

    const renderForeground = () => (
        <View style={styles.topContainer}>
            <View style={styles.icon}>
                <Image style={styles.mainImage} source={require('../../../assets/images/test1.jpg')} />
            </View>
            <View style={styles.words}>
                <View><Text style={styles.header}>Album Name</Text></View>
                <View>
                    <Text style={styles.text}>User Name</Text>
                    <Text style={styles.text}>1.7M Videos</Text>
                </View>
                <View>
                    <Text style={styles.bookmark}>
                        <MaterialCommunityIcons size={14} name="bookmark-plus-outline" color="#000" />
                        Bookmark
                        <MaterialCommunityIcons size={14} name="check-bold" color="#000" />
                    </Text>
                </View>
            </View>
    </View>
    )

    const renderHeader = () => (
       <View></View>
    )
    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <View style={styles.sauti}>
                <MaterialCommunityIcons style={styles.sautiIcon} size={35} name="video-outline" color="#000" />
                <Text style={styles.sautiText}>Use Sauti</Text>
            </View>
            <StickyParallaxHeader
                headerType="TabbedHeader"
                foreground={renderForeground}
                header={renderHeader}
                transparentHeader={false}
                parallaxHeight={160}
                headerHeight={0}
                snapValue={0}
                snapToEdge={false}
                hasBorderRadius={false}
                backgroundColor="white"
                //headerSize={() => {}}
                //onEndReached={() => {}}
                scrollEvent={event(
                    [{ nativeEvent: { contentOffset: { y: scrollY.y } } }],
                    { useNativeDriver: false }
                )}
                
                tabs={[
                    {
                        title: "All Videos",
                        icon: <MaterialCommunityIcons size={30} name="view-grid" color="#000" />,
                        content: <MyImages />
                    },
                ]}
                tabTextStyle={styles.tabText}
                tabTextContainerStyle={styles.tabTextContainerStyle}
                tabTextContainerActiveStyle={styles.tabTextContainerActiveStyle}
                tabsWrapperStyle={styles.tabsWrapper}
                >
            </StickyParallaxHeader>
       </SafeAreaView>
    )
}

export default Album;