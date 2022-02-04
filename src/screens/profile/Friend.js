import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import styles from '../../styles/friendstyles';
import { Searchbar } from 'react-native-paper';
import { MaterialIcons, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';

const Friend = () => {
    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
        <TouchableOpacity
        style={styles.search}>
            <Searchbar
                style={{
                    borderRadius: 5,
                    height: 40,
                    backgroundColor: '#fff',
                }}
                inputStyle={{
                    fontSize: 14,
                    fontFamily: 'AbelRegular',
                }}
                selectTextOnFocus={false}
                placeholder="Search for Users, Videos and Songs ..."
                editable={true}
            />
        </TouchableOpacity>
        <View style={styles.container}>
            <TouchableOpacity style={styles.row}>
                <MaterialCommunityIcons 
                    name="account-plus-outline" 
                    size={25} 
                    color="white"
                    style={styles.icon}
                />
                <Text style={styles.text}>Invite Friends</Text>
                <MaterialIcons 
                    name="keyboard-arrow-right" 
                    size={25} 
                    color="black"
                    style={styles.iconarrow}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.row}>
                <MaterialIcons 
                    name="call" 
                    size={25} 
                    color="white"
                    style={styles.icon}
                />
                <Text style={styles.text}>Find Contacts</Text>
                <MaterialIcons 
                    name="keyboard-arrow-right" 
                    size={25} 
                    color="black"
                    style={styles.iconarrow}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.row}>
                <MaterialCommunityIcons 
                    name="facebook" 
                    size={25} 
                    color="white"
                    style={styles.icon}
                />
                <Text style={styles.text}>Find Facebook Friends</Text>
                <MaterialIcons 
                    name="keyboard-arrow-right" 
                    size={25} 
                    color="black"
                    style={styles.iconarrow}
                />
            </TouchableOpacity>
        </View>

    </SafeAreaView>
    )
}

export default Friend;