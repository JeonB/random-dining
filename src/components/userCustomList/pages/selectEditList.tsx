import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { NavigationProp, useFocusEffect } from '@react-navigation/native'

import { MyTheme } from 'theme'
import { RootStackParamList } from '@_types/listParamList'
import { DefaultFlatList } from '@_userListPages/defaultFlatList'
import { useListNames } from '@_userList/hook/useListNames'

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
      <View style={styles.infoArea}>
        <Text style={styles.infoText}>수정 할 리스트를 선택해주세요</Text>
      </View>
      <DefaultFlatList
        data={listNames}
        keyExtractor={(item, index) => index.toString()}
        renderItem={item => (
          <Text style={styles.listText} numberOfLines={1} ellipsizeMode="tail">
            {item}
          </Text>
        )}
        onPressItem={handlePressItem}
      />
    </View>
  )
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.1,
  },
  listText: {
    fontSize: 20,
    textAlign: 'center',
  },
  infoArea: {
    alignItems: 'center',
    marginBottom: 20,
    borderBlockColor: 'gray',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    borderRadius: 10,
    padding: 15,
    backgroundColor: 'gray',
  },
  infoText: {
    color: 'white',
    fontSize: 20,
  },
})
