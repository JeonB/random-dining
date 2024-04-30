import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { DefaultFlatList } from '@_components/layout/component/defaultFlatList'
import { ListManageIcon } from '@_components/userCustomList/component/listManageIcon'
import { useListNames } from '@_components/userCustomList/hook/useListNames'
import { useFocusEffect } from '@react-navigation/native'
export const UserCustomList: React.FC = () => {
  const [selectedListData, setSelectedListData] = useState([])
  const [showRandomPicker, setShowRandomPicker] = useState(false)

  const { listNames, fetchListNames } = useListNames()

  useFocusEffect(
    React.useCallback(() => {
      fetchListNames()

      return () => {
        // 화면이 포커스를 잃을 때 실행할 코드를 작성합니다.
      }
    }, [fetchListNames]),
  )

  const handlePressItem = async (item: string) => {
    try {
      const savedListData = await AsyncStorage.getItem(item)
      // 리스트에 저장된 데이터가 있을 경우 random picker modal 호출
      if (savedListData !== null) {
        setSelectedListData(JSON.parse(savedListData))
        setShowRandomPicker(true)
        //test (navigation 추가 필요)
        Alert.alert(`${item} random picker modal opened.`)
      } else {
        setSelectedListData([])
        Alert.alert(`${item}에 저장된 데이터가 없습니다.`)
      }
    } catch (error) {
      console.error('Error loading list data:', error)
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
      <ListManageIcon />
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
})
