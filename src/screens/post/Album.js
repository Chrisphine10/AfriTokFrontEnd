import React from 'react';
import { SafeAreaView, Image, View, Text, TouchableOpacity} from 'react-native';
import styles from '../../styles/albumstyles';
import Header from '../../components/Header';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MyImages from '../../components/myimages';

const Album = () => {
    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <Header />
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
            <View>
                <MyImages />
            </View>
            <View style={styles.sauti}>
                <MaterialCommunityIcons style={styles.sautiIcon} size={40} name="video-outline" color="#000" />
                <Text style={styles.sautiText}>Use Sauti</Text>
            </View>
       </SafeAreaView>
    )
}

export default Album;