import { StackScreenProps } from '@react-navigation/stack'
import { RestaurantParamList } from '@_types'
import {
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import RenderItem from '@_userListPages/searchRestaurantModal/resultList'
import React from 'react'
import { DefaultFlatList } from '@_userListPages/defaultFlatList'
import { MyTheme } from 'theme'
import { useStore } from '@_common/utils/zustandStore'

export const RestaurantViewList = ({
  route,
  navigation,
}: StackScreenProps<RestaurantParamList, 'RestaurantView'>) => {
  const restaurantList = route.params?.restaurantItems
  if (!restaurantList) {
    // selectedData가 undefined일 때 처리하는 로직
    throw new Error('데이터가 없습니다!')
  }
  const { setRestaurant } = useStore(state => ({
    setRestaurant: state.setRestaurant,
  }))
  const handlePressAddButton = () => {
    Alert.alert('더보기!')
  }
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
                handlePressAddButton={handlePressAddButton}
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
    height: Dimensions.get('window').height * 0.7,
    padding: MyTheme.width * 20,
    backgroundColor: 'white',
    borderRadius: 20,
    position: 'absolute',
    top: Dimensions.get('window').height * 0.05,
  },
})

export default RestaurantViewList
