import React, { useState, useEffect } from 'react';
import {View, Text, Animated, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../../styles/edituserstyles';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails, removeUserDetails, updateUserDetails } from '../../api/actions/userDetailsActions';
import { updateUser } from '../../api/actions/loginActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { nameValidator } from '../../helpers/nameValidator';
import { emailValidator } from '../../helpers/emailValidator';
import { phoneNumberValidator } from '../../helpers/phoneNumberValidator';
import { otherNameValidator } from '../../helpers/otherNameValidator';
import { inputValidator } from '../../helpers/inputValidator';
import { fetchAllUsers, fetchUser } from '../../api/actions/loginActions';
import TextInput2 from '../../components/custom/TextInput2';
import AnimatedLoader from "react-native-animated-loader";


const EditProfile = ({ navigation, props }) => {
    const [userData, setUserData] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    var ENTER_FIRST_NAME = 'Enter First Name';
    var ENTER_LAST_NAME = 'Enter Last Name';
    var ENTER_USER_NAME = 'Enter User Name';
    var ENTER_EMAIL = 'Enter Email';
    var ENTER_PHONE = 'Enter Phone Number';
    var ENTER_BIO = 'Add a short bio about yourself';

    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userDetails.login);
    const users = useSelector(state => state.loginDetails.userDetails);
    const loginUser = useSelector(state => state.loginDetails.login);
    const [userName, setUserName] = useState({ value: '', error: '' });
    const [firstName, setFirstName] = useState({ value: '', error: '' });
    const [lastName, setLastName] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [phone, setPhone] = useState({ value: '', error: '' });
    const [bio, setBio] = useState({ value: '', error: '' });

    useEffect(() => {
        const fetchData = async () => {
          dispatch(await fetchAllUsers());
        }
        fetchData();
    }, []);

    const saveUser = async () => {
        const userInfo = {
            id: userData.id,
            phone: phone.value,
            image: userData.image,
            bio: bio.value,
            countryCode: userData.countryCode,
            following: userData.following,
            followers: userData.followers,
            likes: userData.likes,
            user: userData.user,
        }
        const user = {
            activated: loginUser.activated,
            createdBy: loginUser.createdBy,
            createdDate: loginUser.createdDate,
            email: email.value,
            firstName: firstName.value,
            id: loginUser.id,
            lastName: lastName.value,
            login: loginUser.login,
            authorities: loginUser.authorities[0],
            imageUrl: loginUser.imageUrl,
            langKey: loginUser.langKey,
        }

        //console.log('user', user);
        dispatch(await updateUserDetails(userInfo));
        dispatch(await updateUser(user));
      }

    const onSave = () => {
        const userNameError = otherNameValidator(userName.value, users);
        const firstNameError = otherNameValidator(firstName.value);
        const lastNameError = otherNameValidator(lastName.value);
        const emailError = otherNameValidator(email.value);
        const phoneError = phoneNumberValidator(phone.value);
        const bioError = inputValidator(bio.value);

        if (userNameError || firstNameError || lastNameError || emailError || phoneError || bioError) {
            setUserName({ value: userName.value, error: userNameError });
            setFirstName({ value: firstName.value, error: firstNameError });
            setLastName({ value: lastName.value, error: lastNameError });
            setEmail({ value: email.value, error: emailError });
            setPhone({ value: phone.value, error: phoneError });
            setBio({ value: bio.value, error: bioError });
            return;
        }
        saveUser();
    }
    
    useEffect(() => {
        let isMounted = true;
        console.log('userName', userData);
        const fetchData = async () => {
            try {    
                await setUserData(userDetails[0]);
                dispatch(await fetchUser(userDetails[0].user.login));
                if(userData || userData === undefined && userData !== false) {     
                    setIsLoaded(true);
                }
            } catch (error) {
                console.error(error);
            } 
        };
        fetchData();
        return () => isMounted = false;
    }, [userDetails]);

    useEffect(() => {
        let isMounted = true; 
        const fetchData = async () => {
            try {
                if(userData || userData === undefined && userData !== false && userData !== [] && userData !== null) {
                    setFirstName({ value: userData.user.firstName, error: '' });
                    setLastName({ value: userData.user.lastName, error: '' });
                    setUserName({ value: userData.user.login, error: '' });
                    setEmail({ value: userData.user.email, error: '' });
                    setPhone({ value: userData.phone, error: '' });
                    setBio({ value: userData.bio, error: '' });
                }
            } catch (e) {
                console.warn(e);
            }
        };
        fetchData();
        return () => {
            isMounted = false;
        }
    }, [userData]);

    
    useEffect(() => {
        let isMounted = true; 
        const fetchData = async () => {
            try {
                const login = await AsyncStorage.getItem('userName');
                dispatch(await fetchUserDetails(login));
            } catch (e) {
                console.warn(e);
            }
        };
        fetchData();
        return () => {
            isMounted = false;
        }
    }, []);

    return (
        <View style={styles.container}>
            { isLoaded ? (
                <ScrollView>
                    <View style={styles.avatar}>
                        { (userData && userData.image !== null) ? (
                            <Avatar.Image size={100} source={{ uri: userData.image }} />
                        ) : (    
                            <Avatar.Image
                            size={100}
                            source={ require('../../../assets/images/avatar_default.png')}
                            />
                        )}
                        <Text style={styles.text}>Change Image</Text>
                        <Text>@{userData.user.login}</Text>
                        <View style={styles.line}></View>
                    </View>
                    <View style={styles.edit}>
                        <View style={styles.edit_item}>
                            <Text style={styles.text}>First Name</Text>
                        </View>
                        <View style={styles.left}>
                            <TextInput2
                                style={styles.input}
                                placeholder={userData.user.FirstName ? userData.user.FirstName : ENTER_FIRST_NAME}
                                onChangeText={(text) => setFirstName({ value: text, error: '' })}
                                value={firstName.value}
                                error={!!firstName.error}
                                errorText={firstName.error}
                                textContentType="name"
                                keyboardType="ascii-capable"
                            />
                        </View>
                    </View>
                    <View style={styles.edit}>
                        <View style={styles.edit_item}>
                            <Text style={styles.text}>Second Name</Text>
                        </View>
                        <View style={styles.left}>
                        <TextInput2
                            style={styles.input}
                            placeholder={userData.user.LastName ? userData.user.LastName : ENTER_LAST_NAME}
                            onChangeText={(text) => setLastName({ value: text, error: '' })}
                            value={lastName.value}
                            error={!!lastName.error}
                            errorText={lastName.error}
                            textContentType="name"
                            keyboardType="ascii-capable"
                        />
                        </View>
                    </View>
                    <View style={styles.edit}>
                        <View style={styles.edit_item}>
                            <Text style={styles.text}>Phone Number</Text>
                        </View>
                        <View style={styles.left}>
                            <TextInput2
                                style={styles.input}
                                placeholder={userData.phone ? userData.phone : ENTER_USER_NAME }
                                onChangeText={(text) => setPhone({ value: text, error: '' })}
                                value={phone.value}
                                error={!!phone.error}
                                errorText={phone.error}
                                textContentType="telephoneNumber"
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>
                    <View style={styles.edit}>
                        <View style={styles.edit_item}>
                            <Text style={styles.text}>Email</Text>
                        </View>
                        <View style={styles.left}>
                            <TextInput2
                                style={styles.input}
                                placeholder={userData.user.email ? userData.user.email : ENTER_USER_NAME }
                                onChangeText={(text) => setEmail({ value: text, error: '' })}
                                value={email.value}
                                error={!!email.error}
                                errorText={email.error}
                                textContentType="emailAddress"
                                keyboardType="email-address"
                            />
                        </View>
                    </View>
                    <View style={styles.avatar}>
                        <Text style={styles.text}>Brief Description</Text>
                        <TextInput2
                            style={styles.bio}
                            placeholder={userData.bio ? userData.bio : ENTER_BIO }
                            multiline={true}
                            onChangeText={(text) => setBio({ value: text, error: '' })}
                            value={bio.value}
                            error={!!bio.error}
                            errorText={bio.error}
                        />
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity 
                        onPress={() => {navigation.navigate('Me')}}
                        style={styles.button}
                        >
                        <Text style={styles.text}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => {onSave()}}
                        style={styles.button}>
                            <Text 
                                style={styles.text}
                            >Save
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            ) : (
                <View>
                <AnimatedLoader
                    visible={!isLoaded}
                    overlayColor="rgba(255,255,255,1)"
                    source={require("../../../assets/blackhand.json")}
                    animationStyle={styles.lottie}
                    speed={1}
                /></View>
            )}
        </View>         
    )
}


export default EditProfile;