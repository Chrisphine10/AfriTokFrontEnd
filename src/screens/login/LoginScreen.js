import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../../components/custom/Background';
import Logo from '../../components/custom/Logo';
import Header from '../../components/custom/Header';
import Button from '../../components/custom/Button';
import TextInput from '../../components/custom/TextInput';
import BackButton from '../../components/custom/BackButton';
import { emailValidator } from '../../helpers/emailValidator';
import { passwordValidator } from '../../helpers/passwordValidator';
import { StackActions } from '@react-navigation/native';
import styles from '../../styles/starterstyles';
import { AuthContext } from '../../core/context';
import { addUserDetails } from '../../api/actions/userDetailsActions';
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from '../../api/actions/loginActions';

export default function LoginScreen({navigation, route}) {
  //const [email, setEmail] = useState({ value: '', error: '' });
  const [userName, setUserName] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [rememberMe, setRememberMe] = useState(true);
  const [registerUserName, setRegisterUserName] = useState(null);
  const [registerPassword, setRegisterPassword] = useState(null);
  const [loggingIn, setLoggingIn] = useState(false);
  const { signIn } = React.useContext(AuthContext);
  const dispatch = useDispatch();
  const users = useSelector(state => state.loginDetails.login);
  console.log('users', users);

  useEffect(() => {
    let isMounted = true; 
    const fetchData = async () => {
      if(route.params) {  
        if(route.params.user) {
          console.log('tested', route.params.user);
          setRegisterUserName(route.params.user.login);
          setRegisterPassword(route.params.password);
          dispatch(await fetchUser(route.params.user.login.toLowerCase()));
        }
      }
    }
    fetchData();
    return () => isMounted = false;
  }, [route.params]);

  useEffect(() => {
    let isMounted = true; 
    const fetchData = () => {
      if(loggingIn === true) {
        setTimeout(() => {
          signIn(registerUserName, registerPassword, rememberMe); 
        }, 2000);
      }
    }
    fetchData();
    return () => isMounted = false;
  }, [loggingIn]);


  useEffect(() => {
    let isMounted = true; 

    const addData = async () => {
      const currentuser = {
        login: users.login,
        id: users.id
      }
      const details = {
        "bio": "null",
        "image": "null",
        "countryCode": "null",
        "phone": "null",
        "user": currentuser,
      }
      if(registerUserName !== null && registerPassword !== null) { 
        dispatch(await addUserDetails(details));
        await setLoggingIn(true);
      }
    }
    try {
      if(users.login !== null) {
        addData();
      }
    } catch (error) {
        console.error(error);
    };

    return () => isMounted = false;
  }, [registerUserName, registerPassword, users]);

  const onLoginPressed = () => {
    //const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    //if (emailError || passwordError) {
    if (passwordError) {
      //setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return false;
    }
    signIn(userName.value, password.value, rememberMe);
    //console.log('Login successful', email.value, password.value);
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Login</Header>
      <TextInput
        //label="Email"
        label="User Name"
        returnKeyType="next"
        //value={email.value}
        value={userName.value}
        //onChangeText={(text) => setEmail({ value: text, error: '' })}
        onChangeText={(text) => setUserName({ value: text, error: '' })}
        //error={!!email.error}
        //errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="name"
        //textContentType="emailAddress"
        //keyboardType="email-address"
        style={styles.button}
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        style={styles.button}
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button 
      mode="contained" 
      onPress={onLoginPressed}
      style={styles.button}
      >
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}