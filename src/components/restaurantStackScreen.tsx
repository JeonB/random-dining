import React from 'react'
import DetailView from '@_3Rpages/RestaurantView/detailView'
import PositionSelector from '@_3Rpages/positionSelector'
import MapSearch from '@_3Rpages/MapSearch/mapSearch'
import FilterSetting from '@_3Rpages/FilterSettings/filterSetting'
import SelectedMenu from '@_3Rpages/FilterSettings/selectedMenu'
import SelectedRestaurantInfo from '@_3Rpages/RestaurantView/selectedRestaurantInfo'
import { createStackNavigator } from '@react-navigation/stack'
import { RestaurantParamList } from '@_types'
import { AntDesign } from '@expo/vector-icons'
import InlineAd from '@_common/ui/inlinedAd'
import { useStore } from '@_common/utils/zustandStore'
import RestaurantView from '@_3Rpages/RestaurantView/restaurantView'

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
        <Stack.Screen
          name="SelectedMenu"
          component={SelectedMenu}
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
          name="RestaurantView"
          component={RestaurantView}
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
      </Stack.Navigator>
      {showAd && <InlineAd />}
    </>
  )
}
export default RestaurantStackScreen
