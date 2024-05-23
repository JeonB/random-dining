import { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

export const useHideTabBar = () => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    // 부모 네비게이션의 옵션 설정
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: 'none' },
    })

    // 컴포넌트가 언마운트 될 때 탭바를 다시 보이게 설정
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: 'flex' },
      })
    }
  }, [navigation])
}
