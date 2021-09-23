import React, { useState } from 'react';
import { View, Animated, Text, useWindowDimensions, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import styles from '../../styles/mestyles';
import { Picker } from '@react-native-community/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import MyVideos from '../../components/myvideos';
import MyImages from '../../components/myimages';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const FirstRoute = () => (
    <MyImages />
);
  
const SecondRoute = () => (
    <MyVideos />
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'black' }}
      style={styles.tabBar}
      contentContainerStyle={styles.contained}
    />
);

const UserProfile = ({ navigation }) => {
    const layout = useWindowDimensions();
    const [selectedValue, setSelectedValue] = useState("Account1");
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Images' },
        { key: 'second', title: 'Videos' },
    ]);
    const pressProfileEdit = () => {
        navigation.navigate("ProfileEdit");
    };
    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
        <ScrollView
                contentContainerStyle={{height: layout.height * 3.1}}
                showsHorizontalScrollIndicator={false}
                scrollToOverflowEnabled={true}
                scrollEventThrottle={16}
                snapToAlignment="end"
            >
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
            <View style={styles.bio}>
                <TouchableOpacity
                >
                    <Text style={styles.edit}>Follow</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.bio}>Bio Test</Text>
            </View>
                <TabView
                contentContainerStyle={styles.contained}
                lazy
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={0}
                renderTabBar={renderTabBar}
                /> 
        </ScrollView>
    </SafeAreaView>
    )
}

export default UserProfile;