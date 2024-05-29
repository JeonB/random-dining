import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect } from 'react'

export const useHideTabBar = () => {
  const navigation = useNavigation()
  const route = useRoute()
  useEffect(() => {
    const parentNavigation = navigation.getParent()
    const hideTabBar = () => {
      if (parentNavigation) {
        parentNavigation.setOptions({
          tabBarStyle: { display: 'none' },
        })
      }
    }
    const showTabBar = () => {
      if (parentNavigation) {
        parentNavigation.setOptions({
          tabBarStyle: { display: 'flex' },
        })
      }
    }
    const focusListener = navigation.addListener('focus', hideTabBar)
    const blurListener = navigation.addListener('blur', showTabBar)
    hideTabBar()

    return () => {
      focusListener()
      blurListener()
      showTabBar()
    }
  }, [navigation, route])
}
