import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { Text } from 'react-native'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { UserCustomList } from '@_components/userCustomList/pages/userCustomList'
import Constants from 'expo-constants'
import 'regenerator-runtime/runtime'
import { RestaurantProvider } from '@_3Rpages/context/restaurantProvider'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MainStack from '@_components/stackScreen'
import { StatusBar } from 'expo-status-bar'
import { Ionicons, AntDesign } from '@expo/vector-icons'
;(Text as any).defaultProps = (Text as any).defaultProps || {}
;(Text as any).defaultProps.allowFontScaling = false
;(TextInput as any).defaultProps = (TextInput as any).defaultProps || {}
;(TextInput as any).defaultProps.allowFontScaling = false
// 'Support for defaultProps will be removed' 경고 제거
const error = console.error
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return
  error(...args)
}
// 메인 테마 설정
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
}
const Tab = createBottomTabNavigator()
const App: React.FC = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar style="dark" />
      <RestaurantProvider>
        <Tab.Navigator
          initialRouteName="Main"
          screenOptions={{
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          }}>
          <Tab.Screen
            name="Main"
            component={MainStack}
            options={{
              headerShown: false,
              title: '홈',
              tabBarIcon: ({ focused, color, size }) => (
                <Ionicons
                  name={focused ? 'home' : 'home-outline'}
                  size={size}
                  color={color}
                />
              ),
            }}
          />
          <Tab.Screen
            name="UserCustomList"
            component={UserCustomList}
            options={{
              title: '사용자 리스트',
              tabBarIcon: ({ focused, color, size }) => (
                <Ionicons
                  name={focused ? 'list' : 'list-outline'}
                  size={size}
                  color={color}
                />
              ),
            }}
          />
          <Tab.Screen
            name="AD Info"
            component={UserCustomList}
            options={{
              title: '광고 문의',
              tabBarIcon: ({ focused, color, size }) => (
                <Ionicons
                  name={
                    focused
                      ? 'information-circle'
                      : 'information-circle-outline'
                  }
                  size={size}
                  color={color}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </RestaurantProvider>
    </NavigationContainer>
  )
}

let AppEntryPoint = App

if (
  Constants.expoConfig &&
  Constants.expoConfig.extra?.storybookEnabled === 'true'
) {
  AppEntryPoint = require('./.storybook').default
}
const styles = StyleSheet.create({
  container: {},
})

export default AppEntryPoint
