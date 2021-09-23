import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import styles from '../../styles/albumstyles';

const Album = () => {
    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <View>
                <View><Text>Image</Text></View>
                <View><Text>Main</Text></View>
                <View><Text>Main</Text></View>
                <View><Text>Main</Text></View>
            </View>
            <View><Text>Main</Text></View>
            <View><Text>Sauti</Text></View>
       </SafeAreaView>
    )
}

export default Album;