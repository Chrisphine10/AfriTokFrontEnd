import React, { useState } from 'react';
import { View, Animated, Text, useWindowDimensions, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import styles from '../../styles/mestyles';
import { Picker } from '@react-native-community/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import MyVideos from '../../components/myvideos';
import MyImages, { myLength } from '../../components/myimages';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const FirstRoute = () => (
    <ScrollView>
        <MyImages />
    </ScrollView>
);
  
const SecondRoute = () => (
    <ScrollView>
        <MyVideos />
    </ScrollView>
);
  
const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'black' }}
      style={{ backgroundColor: 'white', color: 'black' }}
    />
);

const Me = () => {
    const layout = useWindowDimensions();
    const [selectedValue, setSelectedValue] = useState("Account1");
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Images' },
        { key: 'second', title: 'Videos' },
    ]);

    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <View style={styles.container}>
                <View style={{}}>
                    <MaterialCommunityIcons size={30} name="account-multiple-plus" color="#000" />
                </View>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="Account1" value="Account1" />
                    <Picker.Item label="Account2" value="Account2" />
                </Picker>
                <View style={{}}>
                    <MaterialCommunityIcons size={30} name="dots-horizontal-circle-outline" color="#000" />
                </View>
            </View>
            <ScrollView
                    contentContainerStyle={{height: layout.height + 220}}
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
                    <View style={styles.textAlign}>
                        <Text style={styles.number}>14</Text>
                        <Text style={styles.text}>Following</Text>
                    </View>
                    <View style={styles.textAlign}>
                        <Text style={styles.number}>38</Text>
                        <Text style={styles.text}>Followers</Text>
                    </View>
                    <View style={styles.textAlign}>
                        <Text style={styles.number}>91</Text>
                        <Text style={styles.text}>Likes</Text>
                    </View>
                </View>
                <View style={styles.follow}>
                    <View>
                        <Text style={styles.edit}>Edit Profile</Text>
                    </View>
                    <View>
                        <MaterialCommunityIcons style={styles.bookmark} size={30} name="bookmark-plus-outline" color="#000" />
                    </View>
                </View>
                <View>
                    <Text style={styles.bio}>Bio Test</Text>
                </View>
                    <TabView
                    contentContainerStyle={styles.container}
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


export default Me;