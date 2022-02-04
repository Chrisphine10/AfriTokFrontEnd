import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../../styles/settingstyles';

const Setting = () => {
    return (
        <View>
            <TouchableOpacity style={styles.row}>
                <MaterialCommunityIcons 
                    name="bell-alert-outline" 
                    size={25} 
                    color="black"
                    style={styles.icon}
                />
                <Text style={styles.text}>Notifications</Text>
                <MaterialIcons 
                    name="keyboard-arrow-right" 
                    size={25} 
                    color="black"
                    style={styles.iconarrow}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.row}>
                <MaterialCommunityIcons 
                    name="incognito" 
                    size={25} 
                    color="black"
                    style={styles.icon}
                />
                <Text style={styles.text}>Privacy and Safety</Text>
                <MaterialIcons 
                    name="keyboard-arrow-right" 
                    size={25} 
                    color="black"
                    style={styles.iconarrow}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.row}>
                <MaterialCommunityIcons 
                    name="lightbulb-on-outline" 
                    size={25} 
                    color="black"
                    style={styles.icon}
                />
                <Text style={styles.text}>Ads</Text>
                <MaterialIcons 
                    name="keyboard-arrow-right" 
                    size={25} 
                    color="black"
                    style={styles.iconarrow}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.row}>
                <MaterialCommunityIcons 
                    name="account-circle-outline" 
                    size={25} 
                    color="black"
                    style={styles.icon}
                />
                <Text style={styles.text}>Account</Text>
                <MaterialIcons 
                    name="keyboard-arrow-right" 
                    size={25} 
                    color="black"
                    style={styles.iconarrow}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.row}>
                <MaterialCommunityIcons 
                    name="head-question-outline" 
                    size={25} 
                    color="black"
                    style={styles.icon}
                />
                <Text style={styles.text}>Help</Text>
                <MaterialIcons 
                    name="keyboard-arrow-right" 
                    size={25} 
                    color="black"
                    style={styles.iconarrow}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.row}>
                <MaterialCommunityIcons 
                    name="information-outline" 
                    size={25} 
                    color="black"
                    style={styles.icon}
                />
                <Text style={styles.text}>About</Text>
                <MaterialIcons 
                    name="keyboard-arrow-right" 
                    size={25} 
                    color="black"
                    style={styles.iconarrow}
                />
            </TouchableOpacity>
            
        </View>
    )
}

export default Setting;