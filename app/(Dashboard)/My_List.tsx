import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants'

const My_List = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>My List Coming Soon!</Text>
    </View>
  )
}

export default My_List

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