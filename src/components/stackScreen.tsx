import React from 'react'
import FilterSetting from '@_3Rpages/FilterSettings/filterSetting'
import DetailView from '@_3Rpages/RestaurantView/detailView'
import SelectedRestaurantInfo from '@_3Rpages/RestaurantView/selectedRestaurantInfo'
import PositionSelector from '@_3Rpages/positionSelector'
import MapSearch from '@_3Rpages/RestaurantView/mapSearch'
import { AddUserList } from './userCustomList/pages/addUserList'
import { EditUserList } from './userCustomList/pages/editUserList'
import { SelectEditList } from './userCustomList/pages/selectEditList'
import { UserCustomList } from './userCustomList/pages/userCustomList'
import { createStackNavigator } from '@react-navigation/stack'
import { RootStackParamList } from '@_types/navigation'
import { RestaurantParamList } from '@_types/restaurantParamList'
import { Ionicons, AntDesign } from '@expo/vector-icons'

type CombinedParamList = RootStackParamList & RestaurantParamList
const MainStack = () => {
  const Stack = createStackNavigator<CombinedParamList>()
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={PositionSelector}
        options={{ title: '홈 화면', headerBackTitleVisible: false }}
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
      <Stack.Screen name="UserCustomList" component={UserCustomList} />
      <Stack.Screen name="SelectEditList" component={SelectEditList} />
      <Stack.Screen name="EditUserList" component={EditUserList} />
      <Stack.Screen name="AddUserList" component={AddUserList} />
    </Stack.Navigator>
  )
}
export default MainStack
