import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import styles from './styles/comment';
//import Avatar from '@mui/material/Avatar';
import { fetchNofitication } from '../api/actions/notificationActions';
import { useDispatch, useSelector } from "react-redux";

export default Notifications = () => {

    const [notifications, setNotifications] = useState([]);
    const currentNotifications = useSelector(state => state.allNotifications.notifications);
    const dispatch = useDispatch();
    console.log(currentNotifications);
    useEffect(() => {
        let isMounted = true;
        const fetchNotificationData = async () => {
            try {
                dispatch(await fetchNofitication(1));
            } catch (e) {
                console.warn(e);
            }
        };
        fetchNotificationData();
        return () => {
            isMounted = false;
        }
    }, []);


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