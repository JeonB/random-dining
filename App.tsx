import React from 'react'
import { StyleSheet, TextInput, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { UserCustomList } from '@_components/userCustomList/pages/userCustomList'
import Constants from 'expo-constants'
import 'regenerator-runtime/runtime'
import { RestaurantProvider } from '@_3Rpages/context/restaurantProvider'
import { UserCustomListStack } from '@_components/listStackScreen'
import RestaurantStackScreen from '@_components/restaurantStackScreen'
import { StatusBar } from 'expo-status-bar'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { MyTheme } from 'theme'
import { Support } from '@_components/support/pages/support'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
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
const Tab = createBottomTabNavigator()
const App: React.FC = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar style="dark" />
      <RestaurantProvider>
        <Tab.Navigator
          initialRouteName="Main"
          screenOptions={{
            tabBarActiveTintColor: MyTheme.colors.primary,
            tabBarInactiveTintColor: 'gray',
          }}>
          <Tab.Screen
            name="Main"
            component={RestaurantStackScreen}
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
            name="UserCustomListTab"
            component={UserCustomListStack}
            options={{
              headerShown: false,
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
            component={Support}
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
