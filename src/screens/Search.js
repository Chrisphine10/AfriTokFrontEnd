import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import styles from '../styles/searchstyles';
import { Searchbar } from 'react-native-paper';

const Search = () => {
    const [search, setSearch] = useState(false);
    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <View>
                <Searchbar
                    placeholder="Type Here..."
                /></View>
        </SafeAreaView>
    )
}

export default Search;