import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../../components/custom/Background';
import Logo from '../../components/custom/Logo';
import Header from '../../components/custom/Header';
import Button from '../../components/custom/Button';
import TextInput from '../../components/custom/TextInput';
import BackButton from '../../components/custom/BackButton';
import { theme } from '../../core/theme';
import { emailValidator } from '../../helpers/emailValidator';
import { passwordValidator } from '../../helpers/passwordValidator';
import { confirmPasswordValidator } from '../../helpers/passwordValidator';
import { nameValidator } from '../../helpers/nameValidator';
import styles from '../../styles/starterstyles';
import { FontAwesome } from '@expo/vector-icons';
import { registerUser, fetchAllUsers, removeCurrentUser } from '../../api/actions/loginActions';
import { useDispatch, useSelector } from "react-redux";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' })
  const [hidePass, setHidePass] = useState(true);
  const [focusPadding, setFocusPadding] = useState(0);
  const [loggingIn, setLoggingIn] = useState(false);

  const dispatch = useDispatch();
  const users = useSelector(state => state.loginDetails.userDetails);
  //console.log('users', users);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(await fetchAllUsers());
    }
    fetchData();
  }, []);

  const saveUser = async () => {
    const user = {
      activated: true,
      login: name.value,
      email: email.value,
      firstName: null,
      lastName: null,
      password: password.value,
    }
    //console.log('user', user);
    dispatch(await removeCurrentUser());
    dispatch(await registerUser(user));
  }

  useEffect(() => {
    let isMounted = true; 
    const fetchData = () => {
      if(loggingIn === true) {
        setTimeout(() => { 
          navigation.navigate('LoginScreen', {
            user: {
              login: name.value,
            },
            password: password.value,
          }
          );
          }, 2000);
      }
    }
    fetchData();
    return () => isMounted = false;
  }, [loggingIn]);

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value, users);
    const emailError = emailValidator(email.value, users)
    const passwordError = passwordValidator(password.value)
    const confirmPasswordError = confirmPasswordValidator(password.value, confirmPassword.value)

    if (emailError || passwordError || nameError || confirmPasswordError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setConfirmPassword({ ...confirmPassword, error: confirmPasswordError })
      return 
    }
    saveUser();
    setLoggingIn(true);
  }


  return (
    <Background>
       <View  
    style={{marginTop: focusPadding}}></View>
      <BackButton goBack={navigation.goBack} />
      <Logo/>
      <Header>Create Account</Header>
      <TextInput
        label="User Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
        onFocus={() => setFocusPadding(200)}
        onBlur={() => setFocusPadding(0)}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry={hidePass ? true : false}
      />
      <TouchableOpacity 
      style={styles.passwordContainer}
      onPress={() => setHidePass(!hidePass)}>  
        <FontAwesome
          style={{paddingLeft: 5}}
          name={hidePass ? 'eye-slash' : 'eye'}
          size={18}
          color="black"
        />
        <Text style={{paddingHorizontal: 8}}>{hidePass ? "Show" : "Hide"} Password</Text>
      </TouchableOpacity>
      <TextInput
        label="Confirm Password"
        returnKeyType="done"
        value={confirmPassword.value}
        onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
        error={!!confirmPassword.error}
        errorText={confirmPassword.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={styles.button}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}
