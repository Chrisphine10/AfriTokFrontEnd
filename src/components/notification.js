import React from 'react';
import { View, Image, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import styles from './styles/comment';
//import Avatar from '@mui/material/Avatar';

export default Notifications = () => {
    return(
        <View style={{marginBottom: 20,}}>
            <View style={styles.row}>
                <View style={{flex: 3, justifyContent: 'flex-start'}}> 
                    <View style={styles.image}>
                        <Avatar.Image
                        size={40}
                        source={ require('../../assets/images/test1.jpg')}
                        />
                    </View>
                </View>
                <View style={{flex: 10}}>
                    <View>
                        <Text style={styles.notificationBold} >Chrisphine and 29 others
                            <Text style={styles.notificationText} > liked your video.
                                <Text style={styles.notificationDate} > 5d</Text>
                            </Text>
                        </Text>
                    </View>
                </View>
                <View style={{flex: 3,}}>
                    <View>
                        <Image style={styles.notificationImage} source={require('../../assets/images/test1.jpg')} />
                    </View>
                </View>
            </View>
        </View>
        )
};