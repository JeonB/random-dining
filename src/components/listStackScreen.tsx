import React from 'react'
import DetailView from '@_3Rpages/RestaurantView/detailView'
import { AddUserList } from './userCustomList/pages/addUserList'
import { EditUserList } from './userCustomList/pages/editUserList'
import { SelectEditList } from './userCustomList/pages/selectEditList'
import { UserCustomList } from './userCustomList/pages/userCustomList'
import { SelectedRestaurantInfo } from './userCustomList/pages/selectedRestaurantInfo'
import { createStackNavigator } from '@react-navigation/stack'
import { RootStackParamList } from '@_types/navigation'
import { Ionicons, AntDesign } from '@expo/vector-icons'

export const UserCustomListStack = () => {
  const Stack = createStackNavigator<RootStackParamList>()
  return (
    <Stack.Navigator initialRouteName="UserCustomList">
      <Stack.Screen
        name="UserCustomList"
        component={UserCustomList}
        options={{
          title: '사용자 리스트',
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
        name="SelectEditList"
        component={SelectEditList}
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
        name="EditUserList"
        component={EditUserList}
        options={{
          title: '리스트 수정',
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
        name="AddUserList"
        component={AddUserList}
        options={{
          title: '리스트 추가',
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
        name="UserSelectedRestaurantInfo"
        component={SelectedRestaurantInfo}
        options={({ route }) => ({
          title: `리스트: ${route.params.listname}`,
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <AntDesign
              name="back"
              size={30}
              color="midnightblue"
              style={{ marginLeft: 10 }}
            />
          ),
        })}
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
  )
}
