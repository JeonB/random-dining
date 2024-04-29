import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Main } from 'src/main'
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { DetailView } from '@_components/ui/detailView'
import { UserCustomList } from '@_components/userCustomList/component/userCustomList'
import { SelectEditList } from '@_components/userCustomList/component/selectEditList'
import { EditUserList } from '@_components/userCustomList/component/editUserList'
import { MainTab } from '@_components/ui/mainTab'
import Constants from 'expo-constants'
import 'regenerator-runtime/runtime'
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
          component={MainTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Detail" component={DetailView} />
        <Stack.Screen name="UserCustomList" component={UserCustomList} />
        <Stack.Screen name="SelectEditList" component={SelectEditList} />
        <Stack.Screen name="EditUserList" component={EditUserList} />
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
