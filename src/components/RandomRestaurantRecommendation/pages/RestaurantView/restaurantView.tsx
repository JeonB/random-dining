import React, { useEffect, useRef } from 'react'
import {
  Animated,
  PanResponder,
  View,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import RestaurantViewList from './restaurantViewList'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RestaurantParamList } from '@_types'
import { MyTheme } from 'theme'
import Map from '@_common/ui/map'
import { useStore } from '@_common/utils/zustandStore'
import { useHeaderHeight } from '@react-navigation/elements'

export default function RestaurantView() {
  const headerHeight = useHeaderHeight()
  const { width, height } = useWindowDimensions()
  const minBoxHeight = 45
  const midBoxHeight = Platform.OS === 'ios' ? height / 3.5 : height / 3
  const maxBoxHeight =
    Platform.OS === 'ios'
      ? height -
        (width < 380
          ? headerHeight * MyTheme.width * 2.3
          : headerHeight * MyTheme.width * 2.15)
      : height -
        (width < 440
          ? headerHeight * MyTheme.width * 1.7
          : headerHeight * MyTheme.width * 1.9)
  const route = useRoute<RouteProp<RestaurantParamList, 'RestaurantView'>>()
  const animatedHeight = useRef(new Animated.Value(midBoxHeight)).current
  const initialHeightRef = useRef(midBoxHeight)
  const { currentLocation } = useStore(state => ({
    currentLocation: state.currentLocation,
  }))

  // 아이템 클릭 핸들러 함수 정의
  const handleItemClick = () => {
    Animated.spring(animatedHeight, {
      toValue: midBoxHeight,
      useNativeDriver: false,
    }).start(() => {
      initialHeightRef.current = midBoxHeight
    })
  }

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (event, gestureState) => {
      return Math.abs(gestureState.dy) > Math.abs(gestureState.dx)
    },
    onPanResponderGrant: () => {
      initialHeightRef.current = (animatedHeight as any)._value
    },
    onPanResponderMove: (event, gestureState) => {
      let newHeight = initialHeightRef.current - gestureState.dy
      if (newHeight > maxBoxHeight) {
        newHeight = maxBoxHeight
      } else if (newHeight < minBoxHeight) {
        newHeight = minBoxHeight
      }
      animatedHeight.setValue(newHeight)
    },
    onPanResponderRelease: (event, gestureState) => {
      let newHeight = initialHeightRef.current - gestureState.dy
      if (initialHeightRef.current === minBoxHeight) {
        if (gestureState.dy < 0) {
          newHeight = midBoxHeight
        } else {
          newHeight = minBoxHeight
        }
      } else if (initialHeightRef.current === midBoxHeight) {
        if (gestureState.dy < 0) {
          newHeight = maxBoxHeight
        } else {
          newHeight = minBoxHeight
        }
      } else if (initialHeightRef.current === maxBoxHeight) {
        if (gestureState.dy > 0) {
          newHeight = midBoxHeight
        } else {
          newHeight = maxBoxHeight
        }
      }

      Animated.spring(animatedHeight, {
        toValue: newHeight,
        useNativeDriver: false,
      }).start(() => {
        initialHeightRef.current = newHeight
      })
    },
  })
  useEffect(() => {
    // 컴포넌트가 언마운트될 때 실행될 클린업 함수
    return () => {
      animatedHeight.stopAnimation() // 진행 중인 애니메이션 정지
    }
  }, [animatedHeight])
  return (
    <View style={styles.container}>
      <Map currentLocation={currentLocation} />
      <Animated.View style={[styles.box, { height: animatedHeight }]}>
        <View {...panResponder.panHandlers} style={styles.draggableContainer}>
          <MaterialIcons name="drag-handle" size={35} color="white" />
        </View>
        <View style={styles.contentContainer}>
          <RestaurantViewList route={route} onItemClick={handleItemClick} />
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: '100%',
    backgroundColor: MyTheme.colors.secondary,
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
  draggableContainer: {
    width: '100%',
    alignItems: 'center',
    padding: 10,
  },
  contentContainer: {
    flex: 1,
    overflow: 'hidden',
  },
})
