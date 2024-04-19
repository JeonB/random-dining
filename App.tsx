import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Main } from 'Main'
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { DetailView } from '@_components/ui/detailView'
import Constants from 'expo-constants'
// Text 적용
;(Text as any).defaultProps = (Text as any).defaultProps || {}
;(Text as any).defaultProps.allowFontScaling = false
const Stack = createStackNavigator()
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Detail" component={DetailView} />
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
