import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import styles from '../../styles/inboxstyles';
import Messages from '../../components/messages';

const Message = () => {
    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
                <ScrollView style={{}}>
                    <Messages />
                    <Messages />
                    <Messages />
                    <Messages />
                    <Messages />
                    <Messages />
                    <Messages />
                    <Messages />
                    <Messages />
                    <Messages />
                    <Messages />
                    <Messages />
                    <Messages />
                    <Messages />
                    <Messages />
                    <Messages />
                    <Messages />
                    <Messages />
                </ScrollView>
        </SafeAreaView>
    )
}

export default Message;