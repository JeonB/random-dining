import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { Main } from 'src/main'
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { DetailView } from '@_components/ui/detailView'
import { PositionSelector } from 'src/components/RandomRestaurantRecommendation/pages/positionSelector'
import Constants from 'expo-constants'
import 'regenerator-runtime/runtime'
import FilterSetting from '@_components/RandomRestaurantRecommendation/pages/FilterSettings/filterSetting'
import { RootStackParamList } from '@_types/navigation'
import { SelectedRestaurantInfo } from '@_components/RandomRestaurantRecommendation/pages/RestaurantView/selectedRestaurantInfo'
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
      <Stack.Navigator initialRouteName="홈">
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Detail" component={DetailView} />
        <Stack.Screen name="홈" component={PositionSelector} />
        <Stack.Screen name="CurrentPosition" component={FilterSetting} />
        <Stack.Screen
          name="RestaurantInfo"
          component={SelectedRestaurantInfo}
        />
      </Stack.Navigator>
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
