import React from 'react'
import ToggleSwitch from './toggleSwitch'
import { StyleSheet, View } from 'react-native'
import { Text } from '@rneui/themed'

export const CategorySwitch = () => {
  const CATEGORY = [
    { label: 'ALL', value: '맛집' },
    { label: '한식', value: '한식' },
    { label: '일식', value: '일식' },
    { label: '중식', value: '중식' },
    { label: '양식', value: '양식' },
    { label: '분식', value: '분식' },
    { label: '아시안', value: '아시안' },
    { label: '제육', value: '제육' },
  ]
  return (
    <View style={styles.container}>
      <Text h4>{CATEGORY[0].label}</Text>
      <ToggleSwitch />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    backgroundColor: 'gainsboro',
    borderRadius: 10,
    padding: 10,
    alignSelf: 'center',
  },
})
