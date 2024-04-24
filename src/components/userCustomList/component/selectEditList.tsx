import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { DefaultFlatList } from '@_components/layout/component/defaultFlatList'

export const SelectEditList: React.FC = () => {
  const [listNames, setListNames] = useState([])

  useEffect(() => {
    const loadListNames = async () => {
      try {
        // AsyncStorage에 저장된 listnames
        const savedListNames = await AsyncStorage.getItem('listnames')
        if (savedListNames !== null) {
          setListNames(JSON.parse(savedListNames))
        }
      } catch (error) {
        console.error('Error loading list names:', error)
      }
    }

    loadListNames()
  }, [])

  const handlePressItem = async (item: string) => {
    try {
      //test (수정 화면으로 이동 navigation 추가 필요)
      Alert.alert('수정 화면으로 이동')
    } catch (error) {
      console.error('Error :', error)
    }
  }

  return (
    <View style={styles.container}>
      <DefaultFlatList
        data={listNames}
        keyExtractor={(item, index) => index.toString()}
        renderItem={item => <Text style={styles.listText}>{item}</Text>}
        onPressItem={handlePressItem}
      />
      <View style={styles.infoArea}>
        <Text style={styles.infoText}>수정 할 리스트를 선택해주세요</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  listText: {
    fontSize: 20,
    textAlign: 'center',
  },
  infoArea: {
    alignItems: 'center',
  },
  infoText: {
    fontSize: 20,
    padding: 10,
    backgroundColor: 'lightgray',
  },
})
