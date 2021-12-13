import React, { useState, useEffect } from 'react';
import { View, Animated, BackHandler, Text, useWindowDimensions, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import styles from '../../styles/mestyles';
import { Picker } from '@react-native-community/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import MyImages from '../../components/myimages';
import MyVideoLikes from '../../components/myvideolikes';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from '../../api/actions/userDetailsActions';


const UserProfile = ({navigation, route}) => {
    const layout = useWindowDimensions();
    const [selectedValue, setSelectedValue] = useState("Account1");

    const [isLoaded, setIsLoaded] = useState(false);
    const userDetails = useSelector(state => state.userDetails.details);

    const [userData, setUserData] = useState(false);
    const dispatch = useDispatch(); 

    const pressProfileEdit = () => {
        navigation.navigate("ProfileEdit");
    };
    const { event, ValueXY } = Animated
    const scrollY = new ValueXY()
    //console.log("name", route.params.username);
    //custom back for android
    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {      
                await setUserData(userDetails[0]);
                //console.log(userDetails);
                if(userData || userData === undefined && userData !== false) {     
                    setIsLoaded(true);
                    //console.log("userData", userData);
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
        //console.log(route.params.username);
        const fetchLikeData = async () => {
            try { 
                dispatch(await fetchUserDetails(route.params.username));
            } catch (e) {
                console.warn(e);
            }
        };
        fetchLikeData();
        return () => {
            isMounted = false;
        }
    }, []);


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
                    style={styles.textAlign}>
                        <Text style={styles.number}>{userData.following}</Text>
                        <Text style={styles.text}>Following</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={styles.textAlign}>
                        <Text style={styles.number}>{userData.followers}</Text>
                        <Text style={styles.text}>Followers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textAlign}>
                        <Text style={styles.number}>{userData.likes}</Text>
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
                    <Text style={styles.bio}>{userData.bio}</Text>
                </View>
            </Animated.View>
             ) : (
                <View><Text>Loading...</Text></View>
            )}
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
                    content: <MyImages login={route.params.username} />
                },
                {
                    title: "Liked",
                    icon: <MaterialCommunityIcons size={30} name="heart-multiple" color="#000" />,
                    content: <MyVideoLikes login={route.params.username} />
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