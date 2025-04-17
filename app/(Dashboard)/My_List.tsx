import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants'
import TimeSelector from "@/components/BottomSheet/TimeSelector";

const My_List = () => {
  return (
    <View style={styles.container}>
      <TimeSelector />
    </View>
  );
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