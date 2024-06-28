import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { AntDesign } from '@expo/vector-icons'
import { RootStackParamList } from '@_types'
import DetailView from '@_3Rpages/RestaurantView/detailView'
import { AddUserList } from '@_userListPages/listManage/addUserList'
import { EditUserList } from '@_userListPages/listManage/editUserList'
import { SelectEditList } from '@_userListPages/listManage/selectEditList'
import { UserCustomList } from '@_userListPages/userCustomList'
import { SelectedRestaurantInfo } from '@_userListPages/restaurantInfo/selectedRestaurantInfo'
import { DeleteListButton } from '@_userListPages/listManage/deleteListButton'

export const UserCustomListStack = () => {
  const Stack = createStackNavigator<RootStackParamList>()

  return (
    <>
      <Stack.Navigator initialRouteName="UserCustomList">
        <Stack.Screen
          name="UserCustomList"
          component={UserCustomList}
          options={{
            headerBackTitleVisible: false,
            title: '',
          }}
        />
        <Stack.Screen
          name="SelectEditList"
          component={SelectEditList}
          options={({ navigation }) => ({
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
            headerRight: props => <DeleteListButton navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="EditUserList"
          component={EditUserList}
          options={{
            title: '리스트 수정',
            headerTitleAlign: 'center',
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
            headerTitleAlign: 'center',
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
            headerTitleAlign: 'center',
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
            headerTitleAlign: 'center',
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
    </>
  )
}
