import React, { useState, useEffect } from 'react';
import { View, Animated, BackHandler, Text, useWindowDimensions, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import styles from '../../styles/mestyles';
import { Picker } from '@react-native-community/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import MyVideos from '../../components/myvideos';
import MyImages from '../../components/myimages';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';



const UserProfile = ({ navigation }) => {
    const layout = useWindowDimensions();
    const [selectedValue, setSelectedValue] = useState("Account1");
    
    const pressProfileEdit = () => {
        navigation.navigate("ProfileEdit");
    };
    const { event, ValueXY } = Animated
    const scrollY = new ValueXY()

    //custom back for android
    useEffect(() => {
        function handleBackButton() {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Routes' }],
            })
          return true;
        }
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    
        return () => backHandler.remove();
    }, [navigation]);

    const renderForeground = () => (
        <View style={styles.foreground}>
            <Animated.View>
                <View style={styles.avatar}>
                    <Avatar.Image
                    size={100}
                    source={ require('../../../assets/images/test1.jpg')}
                    />
                    <Text style={styles.name}>Chrisphine Otieno</Text>
                    <Text style={styles.username}>@Pheene10</Text>
                </View>
                <View style={styles.follow}>
                    <TouchableOpacity 
                    style={styles.textAlign}>
                        <Text style={styles.number}>14</Text>
                        <Text style={styles.text}>Following</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={styles.textAlign}>
                        <Text style={styles.number}>38</Text>
                        <Text style={styles.text}>Followers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textAlign}>
                        <Text style={styles.number}>91</Text>
                        <Text style={styles.text}>Likes</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.followUser}>
                    <TouchableOpacity
                        onPress={pressProfileEdit}
                    >
                        <Text style={styles.edit}>Unfollow</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={pressProfileEdit}
                    >
                        <Text style={styles.edit}>Message</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.bio}>Bio Test</Text>
                </View>
            </Animated.View>
        </View>
    )
    const renderHeader = () => (
        <SafeAreaView style={styles.AndroidSafeArea}></SafeAreaView>
     )
    
    return (
            <StickyParallaxHeader
                headerType="TabbedHeader"
                foreground={renderForeground}
                header={renderHeader}
                transparentHeader={false}
                parallaxHeight={330}
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
                    title: "Videos",
                    icon: <MaterialCommunityIcons size={30} name="view-grid" color="#000" />,
                    content: <MyImages />
                },
                {
                    title: "Liked",
                    icon: <MaterialCommunityIcons size={30} name="heart-multiple" color="#000" />,
                    content: <MyVideos />
                }
                ]}
                tabTextStyle={styles.tabText}
                tabTextContainerStyle={styles.tabTextContainerStyle}
                tabTextContainerActiveStyle={styles.tabTextContainerActiveStyle}
                tabsWrapperStyle={styles.tabsWrapper}
                >
            </StickyParallaxHeader>
    )
}

export default UserProfile;