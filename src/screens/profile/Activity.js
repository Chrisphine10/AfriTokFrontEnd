import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import styles from '../../styles/activitystyles';
import Notifications from '../../components/notification';
import { Picker } from '@react-native-community/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Activity = ({ navigation }) => {
    const [selectedValue, setSelectedValue] = useState("Activity");
    const pressInbox = () => {
        navigation.navigate("Inbox");
    };
    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <View style={styles.container}>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="Activity" value="Activity" />
                    <Picker.Item label="Likes" value="Likes" />
                    <Picker.Item label="Comments" value="Comments" />
                    <Picker.Item label="Mentions" value="Mentions" />
                    <Picker.Item label="AfroTok" value="AfroTok" />
                </Picker>
                <TouchableOpacity
                onPress={pressInbox}
                style={{}}>
                    <MaterialCommunityIcons size={30} name="message-arrow-right" color="#000" />
                </TouchableOpacity>
            </View>
            <View>
                <ScrollView style={styles.activity}>
                    <Text style={styles.time}>New</Text>
                    <Notifications />
                    <Notifications />
                    <Text style={styles.time}>Today</Text>
                    <Notifications />
                    <Notifications />
                    <Text style={styles.time}>This Week</Text>
                    <Notifications />
                    <Notifications />
                    <Notifications />
                    <Text style={styles.time}>This Month</Text>
                    <Notifications />
                    <Notifications />
                    <Notifications />
                    <Notifications />
                    <Notifications />
                    <Notifications />
                    <Notifications />
                    
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Activity;