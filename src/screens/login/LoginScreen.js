import React, { useState } from 'react';
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
export default function LoginScreen({ navigation }) {
  //const [email, setEmail] = useState({ value: '', error: '' });
  const [userName, setUserName] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const { signIn } = React.useContext(AuthContext);
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