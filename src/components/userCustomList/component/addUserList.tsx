import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TextInput,
  Dimensions,
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { DefaultFlatList } from '@_components/layout/component/defaultFlatList'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { Icon } from '@rneui/themed'
import { Button } from 'react-native-paper'

import { useListNames } from '@_components/userCustomList/hook/useListNames'
import { RootStackParamList } from '@_types/navigation'
import { Restaurant } from '@_types/restaurant'

const { width, height } = Dimensions.get('window')
export const AddUserList: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const [listItems, setListItems] = useState<Restaurant[]>([]) // 리스트 아이템을 관리하는 상태

  const [inputRestaurant, setInputRestaurant] = useState('') // 식당 또는 메뉴 이름을 입력하는 상태

  const [newListName, setNewListName] = useState('') // 새로운 리스트 이름을 관리하는 상태

  const { listNames, saveListNames } = useListNames()

  const handlePressDeleteButton = async (item: string) => {
    setListItems(
      prevItems => prevItems.filter(listItem => listItem.place_name !== item), // 삭제할 아이템을 제외한 나머지 아이템들로 리스트를 갱신
    )
  }

  const handlePressRestaurantAddButton = () => {
    // 입력 필드가 비어있을 경우 경고창을 띄움
    if (inputRestaurant.trim() === '') {
      Alert.alert('식당 또는 메뉴 이름을 입력하세요.')
      return
    }
    // 입력 필드에 입력된 값을 리스트에 추가
    setListItems(prevItems => [
      ...prevItems,
      {
        place_name: inputRestaurant,
      },
    ])
    setInputRestaurant('') // 입력 필드를 초기화
  }

  const handlePressSave = async () => {
    if (newListName.length === 0) {
      Alert.alert('리스트 이름을 입력해주세요.')
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
                    { name: 'Main', params: { screen: 'UserCustomList' } },
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
        placeholder="List Name"
        testID="ListNameField"
      />
      <View style={styles.restaurantInputContainer}>
        <TextInput
          style={styles.restaurantNameField}
          placeholder="식당 또는 메뉴 이름을 입력하세요."
          onChangeText={setInputRestaurant}
          testID="restaurantNameField"
        />
        <Icon
          name="add"
          size={22}
          onPress={handlePressRestaurantAddButton}
          testID="restaurantAddButton"
          style={styles.addIcon}
        />
      </View>
      <DefaultFlatList
        data={listItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={item => (
          <View style={styles.listItemContainer}>
            <Text>{item.place_name}</Text>
            <Icon
              name="delete"
              size={22}
              color="red"
              testID={`restaurantDeleteButton-${item.place_name}`}
              onPress={() => handlePressDeleteButton(item.place_name)}
            />
          </View>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.1,
    paddingVertical: height * 0.05,
  },
  listNameField: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 5,
    padding: 10,
    fontSize: 18,
  },
  restaurantInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  restaurantNameField: {
    width: '85%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  addIcon: {
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 7,
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  renderItem: {
    borderWidth: 0,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
})
