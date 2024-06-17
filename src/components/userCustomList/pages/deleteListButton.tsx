import React from 'react'
import { View, Alert } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RootStackParamList } from '@_types'
import { useListNames } from '@_userList/hook/useListNames'

export const DeleteListButton = ({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList>
}) => {
  const { listNames, saveListNames } = useListNames()

  const handlePressDeleteListButton = async () => {
    Alert.alert(
      `모든 리스트를 삭제하시겠습니까?`,
      '',
      [
        {
          text: '아니오',
          style: 'cancel',
        },
        {
          text: '예',
          onPress: async () => {
            try {
              if (listNames !== null && listNames.length > 0) {
                for (const listName of listNames) {
                  await AsyncStorage.removeItem(listName)
                }
                await AsyncStorage.removeItem('listnames')
                await saveListNames([])
              }
              Alert.alert('삭제되었습니다.')
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'UserCustomList',
                    params: { screen: 'UserCustomList' },
                  },
                ],
              })
            } catch (error) {
              console.error('Error deleting list:', error)
            }
          },
        },
      ],
      { cancelable: false },
    )
  }

  return (
    <View style={{ marginRight: 15 }}>
      <Button
        onPress={() => handlePressDeleteListButton()}
        labelStyle={{ fontSize: 16 }}
        textColor="#FF3A54">
        전체 삭제
      </Button>
    </View>
  )
}
