import { Text } from '@rneui/themed'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { Animated, View, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useStore } from '@_common/utils/zustandStore'

export interface Props {
  items: string[]
  onItemChange?: () => void
  itemHeight: number
  closeModal: () => void
  setTimeoutFunc?: (handler: any, timeout?: number) => void
}

export const AnimatedRandomSelector = (props: Props) => {
  const {
    items,
    onItemChange = () => {},
    itemHeight,
    closeModal,
    setTimeoutFunc = setTimeout,
  } = props
  const scrollY = useRef(new Animated.Value(0)).current
  const requiredItemsCount = 30
  const { menu, setMenu } = useStore()
  const shuffleItems = useCallback((items: string[]) => {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[items[i], items[j]] = [items[j], items[i]]
    }
    return items
  }, [])

  const randomizedItems = useMemo(() => {
    const uniqueItems = Array.from(new Set(items))
    let tempItems = Array.from({ length: 1 }, () =>
      shuffleItems(uniqueItems),
    ).flat()
    while (tempItems.length < requiredItemsCount) {
      tempItems = [...tempItems, ...tempItems]
    }
    return tempItems
  }, [items, shuffleItems])

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
        Math.round(-(scrollY as any)._value / itemHeight) % items.length
      setMenu(items[finalIndex])
      onItemChange()
      closeModal()
    })
  }, [items])

  useEffect(() => {
    if (items.length > 0) {
      startAnimation()
    }
    return () => {
      scrollY.removeAllListeners()
    }
  }, [])

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
          height: itemHeight * randomizedItems.length,
          justifyContent: 'center',
          paddingTop: itemHeight + itemHeight,
        }}>
        {randomizedItems.map((item, index) => (
          <View
            key={index}
            style={{
              height: itemHeight,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.itemText}>{item}</Text>
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
