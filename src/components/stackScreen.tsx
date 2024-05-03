import React from 'react'
import FilterSetting from '@_3Rpages/FilterSettings/filterSetting'
import DetailView from '@_3Rpages/RestaurantView/detailView'
import SelectedRestaurantInfo from '@_3Rpages/RestaurantView/selectedRestaurantInfo'
import PositionSelector from '@_3Rpages/positionSelector'
import { AddUserList } from './userCustomList/pages/addUserList'
import { EditUserList } from './userCustomList/pages/editUserList'
import { SelectEditList } from './userCustomList/pages/selectEditList'
import { UserCustomList } from './userCustomList/pages/userCustomList'
import { createStackNavigator } from '@react-navigation/stack'
import { RootStackParamList } from '@_types/navigation'
import { Ionicons, AntDesign } from '@expo/vector-icons'
const MainStack = () => {
  const Stack = createStackNavigator<RootStackParamList>()
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={PositionSelector}
        options={{ title: '홈 화면', headerBackTitleVisible: false }}
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
        name="CurrentPosition"
        component={FilterSetting}
        options={{
          title: '현재 화면에서 찾기',
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
      <Stack.Screen name="UserCustomList" component={UserCustomList} />
      <Stack.Screen name="SelectEditList" component={SelectEditList} />
      <Stack.Screen name="EditUserList" component={EditUserList} />
      <Stack.Screen name="AddUserList" component={AddUserList} />
    </Stack.Navigator>
  )
}
export default MainStack
