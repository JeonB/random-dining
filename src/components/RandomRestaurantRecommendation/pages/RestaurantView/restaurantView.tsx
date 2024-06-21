import React, { useRef } from 'react'
import {
  Animated,
  PanResponder,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import RestaurantViewList from './restaurantViewList'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RestaurantParamList } from 'src/types'
import { StackNavigationProp } from '@react-navigation/stack'
import { MyTheme } from 'theme'
import Map from '@_common/ui/map'
import { useStore } from '@_common/utils/zustandStore'
const windowHeight = Dimensions.get('window').height
const minBoxHeight = 50 // MaterialIcons가 보일 수 있는 최소 높이를 설정합니다.
const maxBoxHeight = windowHeight - MyTheme.width * 215 // 상단 스크린 제목 바의 높이를 고려하여 최대 높이를 설정합니다.

export default function RestaurantView() {
  const navigation =
    useNavigation<StackNavigationProp<RestaurantParamList, 'RestaurantView'>>()
  const route = useRoute<RouteProp<RestaurantParamList, 'RestaurantView'>>()
  const animatedHeight = useRef(new Animated.Value(windowHeight / 2)).current
  const initialHeightRef = useRef(windowHeight / 2)
  const { currentLocation } = useStore(state => ({
    currentLocation: state.currentLocation,
  }))
  const { restaurantItems } = useStore(state => ({
    restaurantItems: state.restaurantItems,
  }))
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (event, gestureState) => {
      // Set pan responder only for vertical movements
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
      if (newHeight > maxBoxHeight) {
        newHeight = maxBoxHeight
      } else if (newHeight < minBoxHeight) {
        newHeight = minBoxHeight
      }
      Animated.spring(animatedHeight, {
        toValue: newHeight,
        useNativeDriver: false,
      }).start()
    },
  })

  return (
    <View style={styles.container}>
      <Map
        currentLocation={currentLocation}
        restaurantItems={restaurantItems}
      />
      <Animated.View style={[styles.box, { height: animatedHeight }]}>
        <View {...panResponder.panHandlers} style={styles.draggableContainer}>
          <MaterialIcons name="drag-handle" size={35} color="white" />
        </View>
        <RestaurantViewList navigation={navigation} route={route} />
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
})
