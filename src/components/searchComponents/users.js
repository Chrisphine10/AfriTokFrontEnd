import React, {useEffect, useState} from 'react';
import { View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import { 
    fetchFollowUser,
    addFollowUser,
    deleteFollowUser,
    removeCurrentFollowUser,
    fetchUserFollows
} from '../../api/actions/followActions';
import { fetchAllUsers } from '../../api/actions/userDetailsActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUserDetails } from '../../api/actions/userDetailsActions';
import baseAPI from '../../api/baseAPI';
import styles from '../styles/searchStyles';
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from 'react-native-paper';

const UsersSearch = (props) => {
    const [search, setSearch] = useState("");
    const [userSuggestions, setUserSuggestions] = useState("");
    const [follow, setFollow] = useState(false);
    const [loadFollow, setLoadFollow] = useState(false);

    const dispatch = useDispatch();
    var userFollows = [];
    userFollows = useSelector(state => state.allFollows.follow);
    const allUsers = useSelector(state => state.userDetails.details);

    const onChangeSearch = query => { 
        setSearch(query);
    }

    const onFollowPressed = async (user) => {
        if(!follow){
            setFollow(true);
            setLoadFollow(true);
            await dispatch(await addFollowUser(user.user.login));
            await AsyncStorage.setItem('follow', JSON.stringify(user.user.login));
            setLoadFollow(false);
        } else {
            setFollow(false);
            setLoadFollow(true);
            await dispatch(await deleteFollowUser(user.user.login));
            await dispatch(await removeCurrentFollowUser(user.user.login));
            await AsyncStorage.removeItem('follow');
            setLoadFollow(false);
        }
    }

    useEffect(() => {
        let isMounted = true;
        const clearData = async () => {
            dispatch(await removeCurrentFollowUser());
        }
        clearData();
        return () => {
            isMounted = false;
        }
    }, []);

    useEffect(() => {
        let isMounted = true;
        const fetchFollowData = async () => {
            try {
                dispatch(await fetchUserFollows(allUsers[0].login));
            } catch (e) {
                console.warn(e);
            }
        };
        fetchFollowData();
        return () => {
            isMounted = false;
        }
    }, [allUsers]);

    
    useEffect(() => {
        let isMounted = true;
        setSearch(props.search);
        const fetchData = async () => {
            dispatch(await fetchAllUsers());
        }
        fetchData();

        return () => isMounted = false;
    }, [props.search]);
    
    useEffect(() => {
        let isMounted = true;
        const fetchData = () => {
            if(allUsers && allUsers[0] !== []){
                let userMatches = [];
                if(search.length > 0){
                    userMatches = allUsers.filter(user => {
                        const regex = new RegExp(`${search}`, "gi");
                        return user.user.login.match(regex)
                    });
                }
                setUserSuggestions(userMatches);
                //console.log(userMatches);
            }
        }
        fetchData();

        return () => isMounted = false;
    },[allUsers])

    return (
        <SafeAreaView style={styles.container}>
             { userSuggestions ? userSuggestions.map((suggestion, index) =>                    
                    <View key={suggestion.id} style={styles.row}>
                        <View style={{
                            flex: 2, 
                            justifyContent: 'flex-start',
                            marginTop: 6,
                            }}> 
                            <View>
                                <Avatar.Image
                                size={60}
                                source={ require('../../../assets/images/test1.jpg') }
                                />
                            </View>
                        </View>
                        <View style={{flex: 5}}>
                            <View><Text style={styles.username}>{suggestion.user.firstName} {suggestion.user.lastName}</Text></View>
                            <View><Text style={styles.fullname}>{suggestion.user.login}</Text></View>
                            <View><Text style={styles.follow}>{suggestion.followers} Followers</Text></View>
                        </View>
                        <View style={{flex: 3, alignItems:'center', alignContent: 'center', justifyContent: 'center'}}>
                            <View>
                                <TouchableOpacity
                                //onPress={() => onFollowPressed}
                                style={styles.followText}
                                >
                                    <Text>Follow</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    
                ): (
                    <View></View>
                )}
        </SafeAreaView>
    )
}

export default UsersSearch;