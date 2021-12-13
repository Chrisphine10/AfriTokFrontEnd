import React, { useState, useEffect } from 'react';
import { View, Animated, Text, useWindowDimensions, ScrollView, SafeAreaView, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import styles from '../../styles/mestyles';
import { Picker } from '@react-native-community/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import MyVideos from '../../components/myvideos';
import MyVideoLikes from '../../components/myvideolikes';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from '../../api/actions/userDetailsActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Me = ({ navigation, props }) => {
    
    const [userData, setUserData] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const userDetails = useSelector(state => state.userDetails.details);
    const dispatch = useDispatch(); 

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {      
                await setUserData(userDetails[0]);
                if(userData || userData === undefined && userData !== false) {     
                    setIsLoaded(true);
                }
            } catch (error) {
                console.error(error);
            } 
        };
        fetchData();
        return () => isMounted = false;
    }, [userDetails]);
    
    useEffect(() => {
        let isMounted = true; 
        const fetchLikeData = async () => {
            try { 
                const login = await AsyncStorage.getItem('userName');
                dispatch(await fetchUserDetails(login));
            } catch (e) {
                console.warn(e);
            }
        };
        fetchLikeData();
        return () => {
            isMounted = false;
        }
    }, []);

    const layout = useWindowDimensions();
    const [selectedValue, setSelectedValue] = useState("Account1");
   
    const { event, ValueXY } = Animated
    const scrollY = new ValueXY()

    const pressProfileEdit = () => {
        navigation.navigate("Profile Edit");
    };
    const pressFriends = () => {
        navigation.navigate("Friend");
    };
    const pressSetting = () => {
        navigation.navigate("Setting");
    };
    const pressFavourite = () => {
        navigation.navigate("Favourite");
    };
    const pressFollow = () => {
        navigation.navigate("Follow");
    };

   
    const renderForeground = () => (
        <View style={styles.foreground}>
            { isLoaded ? (
            <Animated.View>
                <View style={styles.avatar}>
                    { (userData.image !== null) ? (
                        <Avatar.Image size={100} source={{ uri: userData.image }} />
                    ) : (    
                        <Avatar.Image
                        size={100}
                        source={ require('../../../assets/images/avatar_default.png')}
                        />
                    )}
                    <Text style={styles.name}>{userData.user.firstName} {userData.user.lastName}</Text>
                    <Text style={styles.username}>@{userData.user.login}</Text>
                </View>
                <View style={styles.follow}>
                    <TouchableOpacity 
                    onPress={pressFollow}
                    style={styles.textAlign}>
                        <Text style={styles.number}>{userData.following}</Text>
                        <Text style={styles.text}>Following</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={pressFollow}
                    style={styles.textAlign}>
                        <Text style={styles.number}>{userData.followers}</Text>
                        <Text style={styles.text}>Followers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textAlign}>
                        <Text style={styles.number}>{userData.likes}</Text>
                        <Text style={styles.text}>Likes</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.follow}>
                    <TouchableOpacity
                        onPress={pressProfileEdit}
                    >
                        <Text style={styles.edit}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={pressFavourite}
                    >
                        <MaterialCommunityIcons style={styles.bookmark} size={30} name="bookmark-plus-outline" color="#000" />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.bio}>{userData.bio}</Text>
                </View>
            </Animated.View>
            ) : (
                <View><Text>Loading...</Text></View>
            )}
        </View>
    )
    
    const renderHeader = () => (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <View style={styles.headerWrapper}>
                <Animated.View>
                    <View style={styles.container}>
                        <TouchableOpacity
                        onPress={pressFriends}
                        >
                            <MaterialCommunityIcons size={30} name="account-multiple-plus" color="#000" />
                        </TouchableOpacity>
                        <Picker
                            selectedValue={selectedValue}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item label="Account1" value="Account1" />
                            <Picker.Item label="Account2" value="Account2" />
                        </Picker>
                        <TouchableOpacity 
                        onPress={pressProfileEdit}
                        >
                            <MaterialCommunityIcons 
                            size={30} 
                            name="dots-horizontal-circle-outline" color="#000" 
                            onPress={pressSetting}
                            />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </SafeAreaView>
    )
    return (
        <StickyParallaxHeader
            headerType="TabbedHeader"
            foreground={renderForeground}
            header={renderHeader}
            transparentHeader={false}
            parallaxHeight={350}
            headerHeight={100}
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
                title: "Yours",
                icon: <MaterialCommunityIcons size={30} name="view-grid" color="#000" />,
                content: <MyVideos login={isLoaded ? userData.user.login : null} />
            },
            {
                title: "Liked",
                icon: <MaterialCommunityIcons size={30} name="heart-multiple" color="#000" />,
                content: <MyVideoLikes login={isLoaded ? userData.user.login : null} />
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


export default Me;