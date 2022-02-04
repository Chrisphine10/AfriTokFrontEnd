import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import styles from '../../styles/inboxstyles';
import ChatView from '../../components/ChatView';

const Inbox = ({route, navigator}) => {
    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <View>
                <ChatView 
                id="ChatView"
                navigator={navigator}
                name={route.name}
                image={route.image}
                /> 
            </View> 
        </SafeAreaView>
    )
}

export default Inbox;