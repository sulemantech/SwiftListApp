import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants'

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Coming Soon!</Text>
    </View>
  )
}

export default Profile

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