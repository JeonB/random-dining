import React from 'react'
import { View, StyleSheet } from 'react-native'
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack'
import { AntDesign } from '@expo/vector-icons'
import { useHideTabBar } from './useHideTabBar'
import { RootStackParamList } from '@_types/listParamList'
import InlineAd from '@_3Rpages/inlinedAd'
import DetailView from '@_3Rpages/RestaurantView/detailView'
import { AddUserList } from '@_userListPages/addUserList'
import { EditUserList } from '@_userListPages/editUserList'
import { SelectEditList } from '@_userListPages/selectEditList'
import { UserCustomList } from '@_userListPages/userCustomList'
import { SelectedRestaurantInfo } from '@_userListPages/selectedRestaurantInfo'
import { DeleteListButton } from '@_userListPages/deleteListButton'
const EditUserListScreen = ({
  navigation,
  route,
}: StackScreenProps<RootStackParamList, 'EditUserList'>) => {
  useHideTabBar()
  return <EditUserList navigation={navigation} route={route} />
}

const AddUserListScreen = ({
  navigation,
}: StackScreenProps<RootStackParamList, 'AddUserList'>) => {
  useHideTabBar()
  return <AddUserList navigation={navigation} />
}

export const UserCustomListStack = () => {
  const Stack = createStackNavigator<RootStackParamList>()

  return (
    <Stack.Navigator initialRouteName="UserCustomList">
      <Stack.Screen
        name="UserCustomList"
        component={UserCustomList}
        options={{
          headerBackTitleVisible: false,
          headerTitle: props => (
            <View style={styles.inlineAd}>
              <InlineAd />
            </View>
          ),
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
        component={EditUserListScreen}
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
        component={AddUserListScreen}
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
  )
}

const styles = StyleSheet.create({
  inlineAd: {
    alignItems: 'center',
  },
})
