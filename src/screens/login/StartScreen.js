import React from 'react'
import Background from '../../components/custom/Background'
import Logo from '../../components/custom/Logo'
import Header from '../../components/custom/Header'
import Button from '../../components/custom/Button'
import Paragraph from '../../components/custom/Paragraph'

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
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
    </Background>
  )
}
