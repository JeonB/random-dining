import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Alert, TextInput, Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import { Button } from 'react-native-paper'
import { MyTheme } from 'theme'
import { useHideTabBar } from '@_components/useHideTabBar'
import { RootStackParamList, LocationTypes } from '@_types'
import { useListNames } from '@_userList/hook/useListNames'
import { DefaultFlatList } from '@_userListPages/defaultFlatList'
import SearchRestaurantModal from '@_userListPages/searchRestaurantModal/searchRestaurantModal'
import { RestaurantNameInput } from '@_userListPages/listManage/restaurantNameInput'
import { RestaurantListItem } from '@_userListPages/listManage/restaurantListItem'

export const EditUserList = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<RootStackParamList>
  route: RouteProp<RootStackParamList, 'EditUserList'>
}) => {
  useHideTabBar()

  const [listItems, setListItems] = useState<LocationTypes[]>([]) // 리스트 아이템을 관리하는 상태
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
          labelStyle={{ fontSize: 17 }}
          testID="deleteListButton"
          textColor="#FF3A54">
          리스트 삭제
        </Button>
      </View>
      <TextInput
        style={styles.listNameField}
        value={newListName}
        onChangeText={setNewListName}
        placeholder="리스트 이름을 입력하세요."
        returnKeyType="done"
        testID="ListNameField"
      />
      <RestaurantNameInput listItems={listItems} setListItems={setListItems} />
      <Button
        style={styles.button}
        buttonColor={MyTheme.colors.primary}
        labelStyle={styles.buttonLabel}
        mode={Platform.OS === 'ios' ? 'contained' : 'elevated'}
        onPress={() => setModalVisible(true)}
        testID="SearchButton">
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
          style={styles.button}
          mode={Platform.OS === 'ios' ? 'contained' : 'elevated'}
          labelStyle={styles.buttonLabel}
          buttonColor={MyTheme.colors.primary}
          onPress={handlePressSave}
          disabled={newListName.length === 0}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: MyTheme.width * 20,
  },
  deleteListButton: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginVertical: MyTheme.width * 5,
  },
  listNameField: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: MyTheme.width * 5,
    padding: MyTheme.width * 10,
    fontSize: MyTheme.width * 18,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: MyTheme.width * 50,
    marginTop: MyTheme.width * 2,
  },
  button: {
    marginVertical: MyTheme.width * 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonLabel: {
    color: 'white',
    fontSize: Platform.select({
      ios: MyTheme.width * 18,
      android: MyTheme.width * 16,
    }),
    paddingTop: MyTheme.width * 2,
  },
  renderItem: {
    borderWidth: 0,
    borderBottomWidth: 1,
  },
})
