import React, { useEffect } from 'react'
import { StyleSheet, TextInput, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Constants from 'expo-constants'
import 'regenerator-runtime/runtime'
import { RestaurantProvider } from '@_components/common/context/restaurantProvider'
import { useStore } from '@_components/common/utils/zustandStore'
import { UserCustomListStack } from '@_components/listStackScreen'
import RestaurantStackScreen from '@_components/restaurantStackScreen'
import { StatusBar } from 'expo-status-bar'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { MyTheme } from 'theme'
import { Support } from '@_components/support/pages/support'
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency'
import mobileAds from 'react-native-google-mobile-ads'
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
  const setTrackingGranted = useStore(state => state.setTrackingGranted)
  const trackingGranted = useStore(state => state.trackingGranted)
  useEffect(() => {
    ;(async () => {
      // 앱 설치 후 googleAdmob 앱 추적 권한 요청 출력
      const { status: trackingStatus } = await requestTrackingPermissionsAsync()
      setTrackingGranted(trackingStatus === 'denied')

      await mobileAds().initialize()
    })()
  }, [trackingGranted])
  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar style="dark" />
      <RestaurantProvider>
        <Tab.Navigator
          initialRouteName="Main"
          tabBar={props => (
            <>
              <BottomTabBar {...props} />
            </>
          )}
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
