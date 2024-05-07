import React, { useState } from 'react'
import {
  Modal,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Text,
  Alert,
} from 'react-native'
import { Button } from 'react-native-paper'

import { handleData } from '@_services/searchRestaurantApi'
import { DefaultFlatList } from '@_components/layout/component/defaultFlatList'
import { RestaurantTypes } from '@_types/restaurant'

interface SearchRestaurantModalProps {
  visible: boolean
  onClose: () => void
  listItems: RestaurantTypes[]
  setListItems: React.Dispatch<React.SetStateAction<RestaurantTypes[]>>
}
const SearchRestaurantModal = ({
  visible,
  onClose,
  listItems,
  setListItems,
}: SearchRestaurantModalProps) => {
  const [dataList, setDataList] = useState<RestaurantTypes[]>([])
  const [inputRestaurant, setInputRestaurant] = useState('')

  // 검색 버튼 클릭
  const handlePressSearchButton = async () => {
    if (inputRestaurant.trim() === '') {
      Alert.alert('식당 또는 메뉴 이름을 입력하세요.')
      return
    }

    try {
      const data = await handleData(inputRestaurant)
      data && setDataList(data)
    } catch (error) {
      console.error('Error occurred:', error)
    }
  }

  // 추가 버튼 클릭
  const handlePressAddButton = (newItem: RestaurantTypes) => {
    // 이미 리스트에 있는 식당 이름을 추가한 경우 경고창을 띄움
    if (listItems.some(item => item.place_name === newItem.place_name)) {
      Alert.alert('이미 추가된 식당입니다.')
      return
    }
    setListItems([...listItems, newItem])

    setInputRestaurant('')
    setDataList([])
    onClose()
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.restaurantInputContainer}>
            <TextInput
              style={styles.restaurantNameField}
              placeholder="식당 또는 메뉴 이름을 입력하세요."
              onChangeText={setInputRestaurant}
              value={inputRestaurant}
              testID="restaurantNameField"
            />
            <Button
              mode="contained"
              style={styles.searchButton}
              buttonColor="#337AB7"
              onPress={handlePressSearchButton}
              testID="searchButton">
              검색
            </Button>
          </View>
          <DefaultFlatList
            data={dataList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={item => (
              <View style={styles.renderItem}>
                <Text
                  style={styles.listText}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.place_name}
                </Text>
                <Button
                  style={{ width: 50 }}
                  onPress={() => handlePressAddButton(item)}>
                  추가
                </Button>
              </View>
            )}
          />
          <Button
            mode="contained"
            style={{ marginTop: 10 }}
            buttonColor="gray"
            onPress={onClose}>
            닫기
          </Button>
        </View>
      </View>
    </Modal>
  )
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  modalView: {
    width: width * 0.9,
    height: height * 0.7,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  restaurantInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  renderItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantNameField: {
    width: width * 0.6,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
  },
  searchButton: {
    borderRadius: 10,
  },
  listText: {
    width: '80%',
    fontSize: 16,
    textAlign: 'left',
  },
})

export default SearchRestaurantModal
