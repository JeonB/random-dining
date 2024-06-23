import React, { useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import { RestaurantParamList } from '@_types'
import RenderItem from '@_userListPages/searchRestaurantModal/resultList'
import { AddUserListModal } from '@_userListPages/addUserListModal'
import { DefaultFlatList } from '@_userListPages/defaultFlatList'
import { MyTheme } from 'theme'
import { useStore } from '@_common/utils/zustandStore'

export const RestaurantViewList = ({
  route,
}: StackScreenProps<RestaurantParamList, 'RestaurantView'>) => {
  const restaurantList = route.params?.restaurantItems
  const [modalVisible, setModalVisible] = useState(false)
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
                setRestaurant(item)
              }}>
              <RenderItem
                item={item}
                handlePressAddButton={() => setModalVisible(true)}
              />
              <AddUserListModal
                selectedInfo={item}
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
              />
            </TouchableOpacity>
          )}
        />
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
