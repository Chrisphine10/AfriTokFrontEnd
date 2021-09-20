import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import styles from '../styles/searchstyles';
import { Searchbar } from 'react-native-paper';

const Search = () => {
    const [search, setSearch] = useState(false);
    const onChangeSearch = query => setSearchQuery(query);
    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <View>
                <Searchbar
                    placeholder="Type Here..."
                    onChangeText={setSearch(onChangeSearch)}
                    value={search}
                /></View>
            <TouchableOpacity>
                
            <Text>Browser</Text>
            
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Browse;