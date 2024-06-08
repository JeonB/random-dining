import { Text } from '@rneui/themed'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Animated, View, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { LocationTypes } from '@_types/restaurant'

export interface Props {
  restaurantItems: LocationTypes[]
  onIndexChange: (index: number) => void
  itemHeight: number
  closeModal: () => void
  setTimeoutFunc?: (handler: any, timeout?: number) => void
}

export const AnimatedRandomSelector = (props: Props) => {
  const {
    restaurantItems,
    onIndexChange,
    itemHeight,
    closeModal,
    setTimeoutFunc = setTimeout,
  } = props

  const scrollY = useRef(new Animated.Value(0)).current
  const requiredItemsCount = 30

  const shuffleRestaurant = useCallback((restaurantItems: LocationTypes[]) => {
    for (let i = restaurantItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[restaurantItems[i], restaurantItems[j]] = [
        restaurantItems[j],
        restaurantItems[i],
      ]
    }
    return restaurantItems
  }, [])
  // 섞인 레스토랑 리스트가 30개보다 적으면 최대 30개까지 복사해서 붙여넣음
  const randomizedRestaurants = useMemo(() => {
    let tempRestaurantItems = Array.from({ length: 1 }, () =>
      shuffleRestaurant(restaurantItems),
    ).flat()
    while (tempRestaurantItems.length < requiredItemsCount) {
      tempRestaurantItems = [...tempRestaurantItems, ...tempRestaurantItems]
    }
    return tempRestaurantItems
  }, [restaurantItems, shuffleRestaurant])

  const startAnimation = useCallback(() => {
    Animated.sequence([
      Animated.timing(scrollY, {
        toValue: -(requiredItemsCount * itemHeight + itemHeight / 2),
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.decay(scrollY, {
        velocity: -7,
        deceleration: 0.6,
        useNativeDriver: true,
      }),
    ]).start(() => {
      const finalIndex =
        Math.round(-(scrollY as any)._value / itemHeight) %
        restaurantItems.length
      onIndexChange(finalIndex)
      closeModal()
    })
  }, [
    requiredItemsCount,
    itemHeight,
    restaurantItems,
    onIndexChange,
    closeModal,
  ])

  useEffect(() => {
    if (restaurantItems.length > 0) {
      setTimeoutFunc(startAnimation, 100)
    }
    return () => {
      scrollY.removeAllListeners()
    }
  }, [restaurantItems, itemHeight])

  return (
    <View
      style={{
        height: itemHeight * 3,
        overflow: 'hidden',
        width: '100%',
      }}>
      <Animated.View
        style={{
          transform: [{ translateY: scrollY }],
          height: itemHeight * randomizedRestaurants.length,
          justifyContent: 'center',
          paddingTop: itemHeight + itemHeight,
        }}>
        {randomizedRestaurants.map((item, index) => (
          <View
            key={index}
            style={{
              height: itemHeight,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.itemText}>{item?.place_name}</Text>
          </View>
        ))}
      </Animated.View>
      <View
        style={{
          position: 'absolute',
          top: itemHeight,
          left: 0,
          right: 0,
          height: itemHeight + 5,
          borderColor: 'black',
          borderWidth: 2,
          borderRadius: 5,
          marginHorizontal: 5,
        }}
      />

      {/* 배경 그라데이션 효과. 테스트 진행시에는 주석 처리 해야 함 */}
      <LinearGradient
        colors={[
          'rgba(255, 255, 255, 0.8)',
          'rgba(255, 255, 255, 0)',
          'rgba(255, 255, 255, 0.8)',
        ]}
        style={styles.gradient}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  itemText: {
    fontSize: 24,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})
