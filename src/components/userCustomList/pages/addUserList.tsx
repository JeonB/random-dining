import React, { useState } from 'react'
import { StyleSheet, View, Alert, TextInput, Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationProp } from '@react-navigation/native'
import { Button } from 'react-native-paper'
import { MyTheme } from 'theme'
import { useHideTabBar } from '@_components/useHideTabBar'
import { RootStackParamList, LocationTypes } from '@_types'
import { useListNames } from '@_userList/hook/useListNames'
import { DefaultFlatList } from '@_userListPages/defaultFlatList'
import SearchRestaurantModal from '@_userListPages/searchRestaurantModal/searchRestaurantModal'
import { RestaurantNameInput } from '@_userListPages/restaurantNameInput'
import { RestaurantListItem } from '@_userListPages/restaurantListItem'

export const AddUserList = ({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList>
}) => {
  useHideTabBar()

  const [listItems, setListItems] = useState<LocationTypes[]>([]) // 리스트 아이템을 관리하는 상태
  const [newListName, setNewListName] = useState('') // 새로운 리스트 이름을 관리하는 상태

  const { listNames, saveListNames } = useListNames() // AsyncStorage에 저장된 리스트 이름들을 가져오는 커스텀 훅

  const [modalVisible, setModalVisible] = useState(false)

  const handlePressSave = async () => {
    // 이미 같은 이름의 리스트가 있는지 확인
    if (listNames.includes(newListName)) {
      Alert.alert('같은 이름의 리스트가 있습니다.')
      return
    }
    Alert.alert(
      '리스트 추가',
      '리스트를 추가하시겠습니까?',
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
                await AsyncStorage.setItem(
                  newListName,
                  JSON.stringify(listItems),
                ) // 새 키(변경된 리스트 이름)에 데이터를 저장

                listNames.push(newListName)
                await saveListNames(listNames) // AsyncStorage의 리스트 이름을 업데이트

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

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.listNameField}
        value={newListName}
        onChangeText={setNewListName}
        placeholder="리스트 이름을 입력하세요."
        autoFocus={true}
        testID="ListNameField"
        returnKeyType="done"
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
  listNameField: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: MyTheme.width * 20,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: MyTheme.colors.primary,
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
