import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { PositionSelector } from 'src/components/RandomRestaurantRecommendation/pages/positionSelector'
import { UserCustomList } from '@_components/userCustomList/component/userCustomList'
import { SelectEditList } from '@_components/userCustomList/component/selectEditList'
import { EditUserList } from '@_components/userCustomList/component/editUserList'
import { AddUserList } from '@_components/userCustomList/component/addUserList'
import { DetailView } from 'src/components/RandomRestaurantRecommendation/pages/RestaurantView/detailView'
import Constants from 'expo-constants'
import 'regenerator-runtime/runtime'
import FilterSetting from '@_components/RandomRestaurantRecommendation/pages/FilterSettings/filterSetting'
import { RootStackParamList } from '@_types/navigation'
import { SelectedRestaurantInfo } from '@_components/RandomRestaurantRecommendation/pages/RestaurantView/selectedRestaurantInfo'
import { MainTab } from 'src/components/RandomRestaurantRecommendation/pages/mainTab'
import { RestaurantProvider } from 'src/components/RandomRestaurantRecommendation/pages/context/restaurantProvider'
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
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <RestaurantProvider>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={MainTab}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Detail" component={DetailView} />
          <Stack.Screen name="홈" component={PositionSelector} />
          <Stack.Screen name="CurrentPosition" component={FilterSetting} />
          <Stack.Screen
            name="RestaurantInfo"
            component={SelectedRestaurantInfo}
          />
          <Stack.Screen name="UserCustomList" component={UserCustomList} />
          <Stack.Screen name="SelectEditList" component={SelectEditList} />
          <Stack.Screen name="EditUserList" component={EditUserList} />
          <Stack.Screen name="AddUserList" component={AddUserList} />
        </Stack.Navigator>
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
