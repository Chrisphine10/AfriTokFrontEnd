import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import styles from '../styles/searchstyles';
import { Searchbar } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from '../api/actions/videoActions';
import { fetchAllUsers } from '../api/actions/userDetailsActions';
import { Avatar } from 'react-native-paper';
import { FontAwesome, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import baseAPI from '../api/baseAPI';

const Search = ({navigation}) => {
    const [search, setSearch] = useState("");
    const [userSuggestions, setUserSuggestions] = useState("");
    const [videoSuggestions, setVideoSuggestions] = useState("");
    const allvideos = useSelector(state => state.allVideos.videos);
    const allUsers = useSelector(state => state.userDetails.details);
    const dispatch = useDispatch();


    const onChangeSearch = query => { 
        setSearch(query);
    }

    const onSuggestionPressed = (clickValue) => {
        setSearch(clickValue);
    }

    const onSubmit = (query) => {
        navigation.navigate("SearchResults", {
            search: query
        });
    }

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            dispatch(await fetchVideos());
            dispatch(await fetchAllUsers());
        }
        fetchData();

        return () => isMounted = false;
    }, [search]);
    
    useEffect(() => {
        let isMounted = true;
        const fetchData = () => {
            if(allUsers && allUsers[0] !== [] && allvideos && allvideos[0] !== []){
                let userMatches = [];
                let videoMatches = [];
                if(search.length > 0){
                    userMatches = allUsers.filter(user => {
                        const regex = new RegExp(`${search}`, "gi");
                        return user.user.login.match(regex)
                    });
                    videoMatches = allvideos.filter(video => {
                        const regex = new RegExp(`${search}`, "gi");
                        return video.post.match(regex)
                    })
                }
                setUserSuggestions(userMatches);
                setVideoSuggestions(videoMatches);
                //console.log(userMatches);
            }
        }
        fetchData();

        return () => isMounted = false;
    },[allUsers])

    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <View>
                <Searchbar
                    placeholder="Type Here..."
                    onChangeText={onChangeSearch}
                    value={search}
                    onIconPress={() => onSubmit(search)}
                    onEndEditing={() => onSubmit(search)}
                />
                { userSuggestions ? userSuggestions.map((suggestion, index) =>                    
                    <TouchableOpacity 
                    key={suggestion.id} 
                    style={styles.suggestions}
                    onPress={() => onSuggestionPressed(suggestion.user.login)}
                    >
                        <Text>{suggestion.user.login}</Text>
                    </TouchableOpacity>
                    
                ): (
                    <View></View>
                )}
                { videoSuggestions ? videoSuggestions.map((suggestion, index) => 
                    <TouchableOpacity key={suggestion.id} 
                    onPress={() => onSuggestionPressed(suggestion.post)}
                    style={styles.suggestions}>
                        <Text>{suggestion.post}</Text>
                    </TouchableOpacity>
                ): (
                    <View></View>
                )}
                { videoSuggestions ? videoSuggestions.map((suggestion, index) => 
                    <TouchableOpacity key={suggestion.id} style={styles.suggestions}
                    onPress={() => onSuggestionPressed(suggestion.section.name)}
                    >
                        <Text>{suggestion.section.name}</Text>
                    </TouchableOpacity>
                ): (
                    <View></View>
                )}
                { videoSuggestions ? videoSuggestions.map((suggestion, index) => 
                    <TouchableOpacity 
                    key={suggestion.id} 
                    style={styles.suggestions}
                    onPress={() => onSuggestionPressed(suggestion.song.name)}
                    >
                        <Text>{suggestion.song.name}</Text>
                    </TouchableOpacity>
                ): (
                    <View></View>
                )}
            </View>
        </SafeAreaView>
    )
}

export default Search;