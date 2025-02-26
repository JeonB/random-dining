import React, { useState } from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import { LocationTypes, RestaurantParamList } from '@_types'
import RenderItem from '@_userListPages/searchRestaurantModal/resultList'
import { AddUserListModal } from '@_userListPages/addUserListModal'
import { DefaultFlatList } from '@_userListPages/defaultFlatList'
import { MyTheme } from 'theme'
import { useStore } from '@_common/utils/zustandStore'
import { RouteProp } from '@react-navigation/native'

export const RestaurantViewList = ({
  route,
  onItemClick,
}: {
  route: RouteProp<RestaurantParamList, 'RestaurantView'>
  onItemClick: () => void
}) => {
  const restaurantList = route.params?.restaurantItems
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState<LocationTypes>()
  if (!restaurantList) {
    // selectedData가 undefined일 때 처리하는 로직
    throw new Error('데이터가 없습니다!')
  }
  const { setRestaurant } = useStore(state => ({
    setRestaurant: state.setRestaurant,
  }))
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <DefaultFlatList
          data={restaurantList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={item => (
            <TouchableOpacity
              onPress={() => {
                onItemClick()
                setRestaurant(item)
              }}>
              <RenderItem
                item={item}
                handlePressAddButton={() => {
                  setModalVisible(true)
                  setSelectedItem(item)
                }} // 선택된 아이템 설정
              />
            </TouchableOpacity>
          )}
        />
        {selectedItem && (
          <AddUserListModal
            selectedInfo={selectedItem}
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    width: MyTheme.width * 330,
    height: Dimensions.get('window').height * 10,
    padding: MyTheme.width * 20,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
})

export default RestaurantViewList
