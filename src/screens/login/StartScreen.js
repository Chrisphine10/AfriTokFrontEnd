import React from 'react'
import Background from '../../components/custom/Background'
import Logo from '../../components/custom/Logo'
import Header from '../../components/custom/Header'
import Button from '../../components/custom/Button'
import Paragraph from '../../components/custom/Paragraph'
import styles from '../../styles/starterstyles'

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Welcome to Afrotok!</Header>
      <Paragraph>
        A social media platform made by Africans for the world.
      </Paragraph>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        style={styles.button}
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
    </Background>
  )
}
