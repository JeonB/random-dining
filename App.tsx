import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { UserCustomList } from '@_components/userCustomList/pages/userCustomList'
import Constants from 'expo-constants'
import 'regenerator-runtime/runtime'
import { RootStackParamList } from '@_types/navigation'
import { RestaurantProvider } from '@_3Rpages/context/restaurantProvider'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MainStack, UserCustomListStack } from '@_components/stackScreen'
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
const Stack = createStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator()

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <RestaurantProvider>
        <Tab.Navigator initialRouteName="Main">
          <Tab.Screen
            name="Main"
            component={MainStack}
            options={{ headerShown: false, title: '홈' }}
          />
          <Tab.Screen
            name="UserCustomListTab"
            component={UserCustomListStack}
            options={{ headerShown: false, title: '사용자 리스트' }}
          />
          <Tab.Screen
            name="AD Info"
            component={UserCustomList}
            options={{ title: '광고 문의' }}
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
