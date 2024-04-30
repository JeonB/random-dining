import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { NavigationProp, useFocusEffect } from '@react-navigation/native'

import { DefaultFlatList } from '@_components/layout/component/defaultFlatList'
import { RootStackParamList } from '@_types/navigation'
import { useListNames } from '@_components/userCustomList/hook/useListNames'

export const SelectEditList = ({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList>
}) => {
  const { listNames, fetchListNames } = useListNames()

  useFocusEffect(
    React.useCallback(() => {
      fetchListNames()

      return () => {
        // 화면이 포커스를 잃을 때 실행할 코드
      }
    }, [fetchListNames]),
  )

  const handlePressItem = async (item: string) => {
    try {
      navigation.navigate('EditUserList', { listName: item })
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
