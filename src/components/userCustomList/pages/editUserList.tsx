import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Alert, TextInput, Dimensions } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { DefaultFlatList } from '@_components/layout/component/defaultFlatList'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import { Button } from 'react-native-paper'

import { useListNames } from '@_components/userCustomList/hook/useListNames'
import { RootStackParamList } from '@_types/navigation'
import { RestaurantTypes } from '@_types/restaurant'
import SearchRestaurantModal from '@_components/userCustomList/pages/searchRestaurantModal'
import { RestaurantNameInput } from '@_components/userCustomList/pages/restaurantNameInput'
import { RestaurantListItem } from '@_components/userCustomList/pages/restaurantListItem'

export const EditUserList = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<RootStackParamList>
  route: RouteProp<RootStackParamList, 'EditUserList'>
}) => {
  const [listItems, setListItems] = useState<RestaurantTypes[]>([]) // 리스트 아이템을 관리하는 상태
  const [listName, setListName] = useState<string>(route.params.listName) // 리스트 이름을 관리하는 상태
  const [newListName, setNewListName] = useState(listName) // 새로운 리스트 이름을 관리하는 상태

  const { listNames, saveListNames } = useListNames() // AsyncStorage에 저장된 리스트 이름들을 가져오는 커스텀 훅

  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    const loadListNames = async () => {
      try {
        const savedListItems = await AsyncStorage.getItem(listName) // 리스트 이름을 키로 저장된 데이터
        if (savedListItems !== null) {
          setListItems(JSON.parse(savedListItems))
        }
      } catch (error) {
        console.error('Error loading list items:', error)
      }
    }

    loadListNames()
  }, [])

  const handlePressSave = async () => {
    // 이미 같은 이름의 리스트가 있는지 확인
    if (listName !== newListName && listNames.includes(newListName)) {
      Alert.alert('같은 이름의 리스트가 있습니다.')
      return
    }
    Alert.alert(
      '저장 확인',
      '변경 사항을 저장하시겠습니까?',
      [
        {
          text: '아니오',
          style: 'cancel',
        },
        {
          text: '예',
          onPress: async () => {
            try {
              if (listItems !== null) {
                // 리스트 이름이 변경되었을 경우
                if (listName !== newListName) {
                  await AsyncStorage.setItem(
                    newListName,
                    JSON.stringify(listItems),
                  ) // 새 키(변경된 리스트 이름)에 데이터를 저장
                  if (listNames !== null) {
                    const index = listNames.indexOf(listName) // 변경 전 리스트 이름의 인덱스 찾음
                    if (index !== -1) {
                      listNames[index] = newListName // 변경 전 리스트 이름을 새 리스트 이름으로 교체
                      await saveListNames(listNames) // AsyncStorage의 리스트 이름을 업데이트
                    }
                  }
                  await AsyncStorage.removeItem(listName) // 변경 전 리스트 이름 삭제
                  setListName(newListName) // 상태를 업데이트하여 UI 갱신
                } else {
                  // 리스트 이름이 변경되지 않았을 경우
                  await AsyncStorage.setItem(
                    listName,
                    JSON.stringify(listItems),
                  ) // 기존 키(기존 리스트 이름)에 데이터를 저장
                }
                Alert.alert('저장되었습니다.')
                // 리스트 화면으로 이동
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'UserCustomList',
                      params: { screen: 'UserCustomList' },
                    },
                  ],
                })
              }
            } catch (error) {
              console.error('Error updating list name:', error)
            }
          },
        },
      ],
      { cancelable: false },
    )
  }

  const handlePressDeleteListButton = async (listName: string) => {
    Alert.alert(
      `${listName} 삭제`,
      '리스트를 삭제하시겠습니까?',
      [
        {
          text: '아니오',
          style: 'cancel',
        },
        {
          text: '예',
          onPress: async () => {
            try {
              if (listNames !== null) {
                // 리스트 이름 목록에서 삭제
                const newListNames = listNames.filter(
                  (name: string) => name !== listName,
                )
                await saveListNames(newListNames) // AsyncStorage에 업데이트
              }

              // 기존 리스트 삭제
              await AsyncStorage.removeItem(listName)
              Alert.alert('삭제되었습니다.')
              // 리스트 화면으로 이동
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
    <View style={styles.container}>
      <View style={styles.deleteListButton}>
        <Button
          onPress={() => handlePressDeleteListButton(listName)}
          testID="deleteListButton"
          textColor="red">
          리스트 삭제
        </Button>
      </View>
      <TextInput
        style={styles.listNameField}
        value={newListName}
        onChangeText={setNewListName}
        placeholder="List Name"
        testID="ListNameField"
      />
      <RestaurantNameInput listItems={listItems} setListItems={setListItems} />
      <Button
        style={{ marginVertical: 10 }}
        buttonColor="#337AB7"
        mode="contained"
        onPress={() => setModalVisible(true)}>
        식당 검색
      </Button>
      <DefaultFlatList
        data={listItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={item => (
          <RestaurantListItem item={item} setListItems={setListItems} />
        )}
        itemStyle={styles.renderItem}
      />
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          buttonColor="gray"
          onPress={handlePressSave}
          testID="saveListButton">
          저장
        </Button>
      </View>
      <SearchRestaurantModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        listItems={listItems}
        setListItems={setListItems}
      />
    </View>
  )
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.1,
  },
  deleteListButton: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginVertical: height * 0.01,
  },
  listNameField: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: height * 0.005,
    padding: 10,
    fontSize: 18,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginVertical: height * 0.05,
  },
  renderItem: {
    borderWidth: 0,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
})
