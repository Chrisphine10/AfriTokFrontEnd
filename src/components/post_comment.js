import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import { FontAwesome, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles/comment';

export default Comments =( ) => {
    return(
        <View style={{marginBottom: 20}}>
            <View style={styles.row}>
                <View style={{flex: 2, justifyContent: 'flex-start'}}> 
                    <View style={styles.image}>
                        <Avatar.Image
                        size={30}
                        source={ require('../../assets/images/test1.jpg')}
                        />
                    </View>
                </View>
                <View style={{flex: 10}}>
                    <View><Text style={styles.user} >user name</Text></View>
                    <View><Text style={styles.comment}>text and time</Text></View>
                    <View><Text style={styles.reply}>reply and icon
                        <MaterialCommunityIcons name="chevron-down"/></Text>
                    </View>
                </View>
                <View style={{flex: 1, alignItems:'center', alignContent: 'center', justifyContent: 'center'}}>
                    <View><AntDesign name="hearto" size={15} /></View>
                    <View><Text style={styles.count}>300</Text></View>
                </View>
            </View>
        </View>
        )
};