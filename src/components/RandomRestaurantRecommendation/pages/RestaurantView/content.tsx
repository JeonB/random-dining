import React from 'react'
import RestaurantActionButtons from './restaurantActionButtons'
import RestaurantDetail from './restaurantDetail'
import { Dimensions, LayoutChangeEvent, View } from 'react-native'
import { LocationTypes } from 'src/types/restaurant'
import { StackNavigationProp } from '@react-navigation/stack'
import { RestaurantParamList } from 'src/types/restaurantParamList'

interface Props {
  restaurant: LocationTypes
  onLayout: (event: LayoutChangeEvent) => void
  handleReselectClick: () => void
  isLoading: boolean
  navigation: StackNavigationProp<
    RestaurantParamList,
    'SelectedRestaurantInfo',
    undefined
  >
}
const Content = (props: Props) => {
  const { onLayout, restaurant, handleReselectClick, isLoading, navigation } =
    props
  return (
    <View onLayout={onLayout} style={{ width: Dimensions.get('window').width }}>
      <RestaurantDetail info={restaurant} />
      <RestaurantActionButtons
        selectedRestaurant={restaurant}
        handleRandomPickClick={handleReselectClick}
        isLoading={isLoading}
        navigation={navigation}
      />
    </View>
  )
}
export default Content
