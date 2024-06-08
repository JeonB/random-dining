import React from 'react'
import FilterSetting from '@_3Rpages/FilterSettings/filterSetting'
import DetailView from '@_3Rpages/RestaurantView/detailView'
import SelectedRestaurantInfo from '@_3Rpages/RestaurantView/selectedRestaurantInfo'
import PositionSelector from '@_3Rpages/positionSelector'
import MapSearch from '@_3Rpages/RestaurantView/mapSearch'
import { createStackNavigator } from '@react-navigation/stack'
import { RestaurantParamList } from '@_types/restaurantParamList'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import InlineAd from '@_3Rpages/inlinedAd'
import { useStore } from '@_common/utils/zustandStore'

const RestaurantStackScreen = () => {
  const Stack = createStackNavigator<RestaurantParamList>()
  const { showAd } = useStore()
  return (
    <>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={PositionSelector}
          options={{
            title: '',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="MapSearch"
          component={MapSearch}
          options={{
            title: '지도에서 선택한 위치로 추천 받기',
            headerBackTitleVisible: false,
            headerBackImage: () => (
              <AntDesign
                name="back"
                size={30}
                color="midnightblue"
                style={{ marginLeft: 10 }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="FilterSetting"
          component={FilterSetting}
          options={{
            title: '필터 설정',
            headerBackTitleVisible: false,
            headerBackImage: () => (
              <AntDesign
                name="back"
                size={30}
                color="midnightblue"
                style={{ marginLeft: 10 }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="SelectedRestaurantInfo"
          component={SelectedRestaurantInfo}
          options={{
            title: '',
            headerBackTitleVisible: false,
            headerBackImage: () => (
              <AntDesign
                name="back"
                size={30}
                color="midnightblue"
                style={{ marginLeft: 10 }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailView}
          options={{
            title: '상세 화면',
            headerBackTitleVisible: false,
            headerBackImage: () => (
              <AntDesign
                name="back"
                size={30}
                color="midnightblue"
                style={{ marginLeft: 10 }}
              />
            ),
          }}
        />
      </Stack.Navigator>
      {showAd && <InlineAd />}
    </>
  )
}
export default RestaurantStackScreen
