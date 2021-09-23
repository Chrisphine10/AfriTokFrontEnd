import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import styles from './styles/comment';

export default Messages = ({props}) => {
    return(
        <TouchableOpacity style={{margin: 10}}>
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
                        <Text style={styles.notificationBold} >
                            Chrisphine Otieno
                        </Text>
                        <Text style={styles.notificationText} >
                            Say hi to Chrisphine. 
                        </Text>
                    </View>
                </View>
                <View style={{flex: 2.5}}>
                    <View>
                        <Text style={styles.dateText} >Sarturday</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
        )
};