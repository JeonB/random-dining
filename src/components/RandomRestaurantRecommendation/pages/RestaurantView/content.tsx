import React from 'react'
import { Dimensions, LayoutChangeEvent, View } from 'react-native'
import { RestaurantParamList } from '@_types'
import { StackNavigationProp } from '@react-navigation/stack'
import RestaurantActionButtons from '@_3Rpages/RestaurantView/restaurantActionButtons'
import RestaurantDetail from '@_common/ui/restaurantDetail'

interface Props {
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
  const { onLayout, handleReselectClick, isLoading, navigation } = props
  return (
    <View onLayout={onLayout} style={{ width: Dimensions.get('window').width }}>
      <RestaurantDetail />
      <RestaurantActionButtons
        handleRandomPickClick={handleReselectClick}
        isLoading={isLoading}
        navigation={navigation}
      />
    </View>
  )
}
export default Content
