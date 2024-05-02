import { useRef, useEffect } from 'react'
import { Animated } from 'react-native'

export const useSequentialAnimation = (
  show: boolean,
  duration: number = 200,
) => {
  const firstValue = useRef(new Animated.Value(0)).current
  const secondValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    firstValue.stopAnimation()
    secondValue.stopAnimation()

    const firstAnimation = Animated.timing(firstValue, {
      toValue: show ? 1 : 0,
      duration,
      useNativeDriver: true,
    })

    const secondAnimation = Animated.timing(secondValue, {
      toValue: show ? 1 : 0,
      duration,
      useNativeDriver: true,
    })

    Animated.sequence(
      show
        ? [firstAnimation, secondAnimation] // 첫 번째 애니메이션 먼저 실행
        : [secondAnimation, firstAnimation],
    ).start()
  }, [show, duration, firstValue, secondValue])

  return [firstValue, secondValue]
}
