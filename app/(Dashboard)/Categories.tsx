import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants'

const Categories = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Categories Coming Soon!</Text>
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.secondary
  }
})