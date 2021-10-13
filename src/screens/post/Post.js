import React from 'react';
import { SafeAreaView, Image, View, Text, TouchableOpacity} from 'react-native';
import styles from '../../styles/recordstyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';

const Post = ({ route, navigation } ) => {
    const [image, setImage] = React.useState(null);
    const { videoFile } = route.params;
    setImage(videoFile);
    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <View>
                <Text>{image}</Text>
            </View>
       </SafeAreaView>
    )
}

export default Post;