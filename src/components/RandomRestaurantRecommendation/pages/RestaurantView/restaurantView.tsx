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
import { RestaurantParamList } from '@_types'
import { StackNavigationProp } from '@react-navigation/stack'
import { MyTheme } from 'theme'
import Map from '@_common/ui/map'
import { useStore } from '@_common/utils/zustandStore'

const windowHeight = Dimensions.get('window').height
const minBoxHeight = 50
const midBoxHeight = windowHeight / 3.5
const maxBoxHeight = windowHeight - MyTheme.width * 215

export default function RestaurantView() {
  const navigation =
    useNavigation<StackNavigationProp<RestaurantParamList, 'RestaurantView'>>()
  const route = useRoute<RouteProp<RestaurantParamList, 'RestaurantView'>>()
  const animatedHeight = useRef(new Animated.Value(midBoxHeight)).current
  const initialHeightRef = useRef(midBoxHeight)
  const { currentLocation } = useStore(state => ({
    currentLocation: state.currentLocation,
  }))

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

  return (
    <View style={styles.container}>
      <Map currentLocation={currentLocation} />
      <Animated.View style={[styles.box, { height: animatedHeight }]}>
        <View {...panResponder.panHandlers} style={styles.draggableContainer}>
          <MaterialIcons name="drag-handle" size={35} color="white" />
        </View>
        <View style={styles.contentContainer}>
          <RestaurantViewList navigation={navigation} route={route} />
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
