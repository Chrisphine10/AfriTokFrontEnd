import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('../../../assets/images/Afrotok.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    marginBottom: 8,
    resizeMode: "contain",
  },
})
