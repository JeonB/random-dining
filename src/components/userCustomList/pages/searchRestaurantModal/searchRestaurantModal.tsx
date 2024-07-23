import React, { useCallback, useEffect, useState } from 'react'
import {
  Modal,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native'
import { Button } from 'react-native-paper'
import { MyTheme } from 'theme'
import { fetchLocationData, getPositionByGeolocation } from '@_services/api'
import { LocationTypes } from '@_types'
import { DefaultFlatList } from '@_userListPages/defaultFlatList'
import { ChangeSortButton } from '@_userListPages/searchRestaurantModal/changeSortButton'
import { SearchInput } from '@_userListPages/searchRestaurantModal/searchInput'
import RenderItem from '@_userListPages/searchRestaurantModal/resultList'
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
  const [dataList, setDataList] = useState<LocationTypes[]>([])
  const [inputRestaurant, setInputRestaurant] = useState('')
  const [searchTerm, setSearchTerm] = useState('') // 실제 검색에 사용될 상태
  const [loading, setLoading] = useState(false)
  const [sort, setSort] = useState('accuracy')

  const handlePressSortButton = () => {
    setSort(prevSort => (prevSort === 'accuracy' ? 'distance' : 'accuracy'))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const { longitude, latitude } = await getPositionByGeolocation()
        const data = await fetchLocationData(
          searchTerm,
          String(longitude),
          String(latitude),
          'FD6',
          undefined,
          sort,
        )
        if (data) setDataList(data)
      } catch (error) {
        console.error('Error occurred:', error)
      } finally {
        setLoading(false)
      }
    }
    if (searchTerm) {
      fetchData()
    }
  }, [searchTerm, sort])

  const handlePressSearchButton = useCallback(() => {
    setSearchTerm(inputRestaurant)
  }, [inputRestaurant])

  const handlePressAddButton = (newItem: LocationTypes) => {
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
          {loading ? (
            <ActivityIndicator size="large" color={MyTheme.colors.primary} />
          ) : (
            <DefaultFlatList
              data={dataList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={item => (
                <RenderItem
                  item={item}
                  handlePressAddButton={handlePressAddButton}
                />
              )}
            />
          )}
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
    flex: 1,
    width: MyTheme.width * 330,
    height: height * 0.7,
    marginTop: MyTheme.width * 30,
    padding: MyTheme.width * 20,
    backgroundColor: 'white',
    borderRadius: 20,
    position: 'absolute',
    top: height * 0.1,
  },
})

export default SearchRestaurantModal
