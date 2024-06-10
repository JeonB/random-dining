import React, { useEffect } from 'react'
import { StyleSheet, TextInput, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Constants from 'expo-constants'
import 'regenerator-runtime/runtime'
import { RestaurantProvider } from '@_components/common/context/restaurantProvider'
import { useStore } from '@_common/utils/zustandStore'
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
  // Zustand 상태 관리 라이브러리를 사용하여 글로벌 상태에서 setTrackingGranted 함수와 trackingGranted 값을 가져옴
  const setTrackingDenied = useStore(state => state.setTrackingDenied)
  const trackingDenied = useStore(state => state.trackingDenied)
  const { setShowAd } = useStore()
  useEffect(() => {
    ;(async () => {
      // requestTrackingPermissionsAsync : 사용자 또는 기기를 추적하는 데 사용할 수 있는
      // 앱 관련 데이터에 대한 액세스를 승인하거나 거부하도록 사용자에게 요청하는 함수
      const { status: trackingStatus } = await requestTrackingPermissionsAsync()
      // 사용자의 액세스 승인 여부를 trackingDenied에 저장
      setTrackingDenied(trackingStatus === 'denied')

      setShowAd(true)
      await mobileAds().initialize()
    })()
  }, [trackingDenied])
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
              title: '문의',
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
