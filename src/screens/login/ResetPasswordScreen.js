import React, { useState } from 'react'
import Background from '../../components/custom/Background'
import BackButton from '../../components/custom/BackButton'
import Logo from '../../components/custom/Logo'
import Header from '../../components/custom/Header'
import TextInput from '../../components/custom/TextInput'
import Button from '../../components/custom/Button'
import { emailValidator } from '../../helpers/emailValidator'
import styles from '../../styles/starterstyles'

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })

  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }
    navigation.navigate('LoginScreen')
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Restore Password</Header>
      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive email with password reset link."

      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={styles.button}
      >
        Send Instructions
      </Button>
    </Background>
  )
}
