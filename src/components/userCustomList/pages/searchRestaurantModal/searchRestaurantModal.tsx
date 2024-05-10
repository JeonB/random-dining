import React, { useEffect, useState } from 'react'
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
import { Feather } from '@expo/vector-icons'

import { handleData } from '@_services/searchRestaurantApi'
import { DefaultFlatList } from '@_components/layout/component/defaultFlatList'
import { ChangeSortButton } from '@_components/userCustomList/pages/searchRestaurantModal/changeSortButton'
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
  const [dataList, setDataList] = useState<RestaurantTypes[]>([]) // 검색해서 가져온 식당 리스트
  const [inputRestaurant, setInputRestaurant] = useState('') // 검색창에 입력한 식당 이름

  const [sort, setSort] = useState('accuracy') // 정렬 방식

  // 정렬 스위치
  const handlePressSortButton = () => {
    setSort(prevSort => (prevSort === 'accuracy' ? 'distance' : 'accuracy'))
  }

  useEffect(() => {
    if (dataList.length > 0) {
      const fetchData = async () => {
        try {
          const data = await handleData(inputRestaurant, sort)
          data && setDataList(data)
        } catch (error) {
          console.error('Error occurred:', error)
        }
      }
      fetchData()
    }
  }, [sort]) // 정렬 방식이 바뀔 때마다 실행

  // 검색 버튼 클릭
  const handlePressSearchButton = async () => {
    try {
      const data = await handleData(inputRestaurant, sort)
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
      onRequestClose={onClose}
      testID="SearchModal">
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.searchFeild}>
            <Feather name="search" size={15} color="black" />
            <TextInput
              style={styles.restaurantNameField}
              placeholder="식당 또는 메뉴 이름을 입력하세요."
              onChangeText={setInputRestaurant}
              value={inputRestaurant}
              autoFocus={true}
              onSubmitEditing={handlePressSearchButton}
              returnKeyType="search"
              clearButtonMode="always"
              testID="restaurantNameField"
              enablesReturnKeyAutomatically={true}
            />
          </View>
          {dataList.length !== 0 && (
            <View style={{ alignItems: 'flex-end' }}>
              <ChangeSortButton
                handlePress={handlePressSortButton}
                sort={sort}
              />
            </View>
          )}
          <DefaultFlatList
            data={dataList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={item => (
              <View style={styles.renderItem}>
                <View style={{ flexShrink: 1 }}>
                  <Text
                    style={styles.listText}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.place_name}
                  </Text>
                  <Text
                    style={{ fontSize: 13 }}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    ({item.address_name})
                  </Text>
                </View>
                <View style={{ width: 50 }}>
                  <Button onPress={() => handlePressAddButton(item)}>
                    추가
                  </Button>
                </View>
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
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  renderItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchFeild: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
  },
  restaurantNameField: {
    marginLeft: 10,
    marginHorizontal: 5,
    width: '90%',
  },
  listText: {
    fontSize: 16,
    textAlign: 'left',
  },
})

export default SearchRestaurantModal
