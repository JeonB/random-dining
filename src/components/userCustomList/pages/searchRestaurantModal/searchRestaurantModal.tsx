import React, { useEffect, useState } from 'react'
import { Modal, View, StyleSheet, Dimensions, Text, Alert } from 'react-native'
import { Button } from 'react-native-paper'
import { MyTheme } from 'theme'
import { handleData } from '@_services/searchRestaurantApi'
import { LocationTypes } from '@_types/restaurant'
import { DefaultFlatList } from '@_userListPages/defaultFlatList'
import { ChangeSortButton } from '@_userListPages/searchRestaurantModal/changeSortButton'
import { SearchInput } from '@_userListPages/searchRestaurantModal/searchInput'

interface SearchRestaurantModalProps {
  visible: boolean
  onClose: () => void
  listItems: LocationTypes[]
  setListItems: React.Dispatch<React.SetStateAction<LocationTypes[]>>
}
const SearchRestaurantModal = ({
  visible,
  onClose,
  listItems,
  setListItems,
}: SearchRestaurantModalProps) => {
  const [dataList, setDataList] = useState<LocationTypes[]>([]) // 검색해서 가져온 식당 리스트
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
  const handlePressAddButton = (newItem: LocationTypes) => {
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
          <SearchInput
            inputRestaurant={inputRestaurant}
            setInputRestaurant={setInputRestaurant}
            handlePressSearchButton={handlePressSearchButton}
          />
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
                  <Button
                    textColor={MyTheme.colors.primary}
                    onPress={() => handlePressAddButton(item)}>
                    추가
                  </Button>
                </View>
              </View>
            )}
          />
          <Button mode="contained" buttonColor="gray" onPress={onClose}>
            닫기
          </Button>
        </View>
      </View>
    </Modal>
  )
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: width * 0.9,
    height: height * 0.7,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    position: 'absolute',
    top: height * 0.1,
  },
  renderItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listText: {
    fontSize: 17,
    textAlign: 'left',
  },
})

export default SearchRestaurantModal
