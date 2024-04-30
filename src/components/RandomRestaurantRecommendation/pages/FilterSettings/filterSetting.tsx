import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '@rneui/themed'
import { DistanceSlider } from './distanceSlider'
import { CategorySwitch } from './categorySwitch'
import { RandomItemModal } from '../RestaurantView/randomItemModal'
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from 'src/types/navigation'
import RandomPickButton from './randomPickButton'
import { useRestaurantContext } from '../context/restaurantContext'

const FilterSetting = ({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList>
}) => {
  const {
    handleRandomPickClick,
    handleCategoryChange,
    handleDistanceRangeChange,
    handleRestaurantChange,
    modalVisible,
    setModalVisible,
    restaurantItems,
    setRestaurantItems,
    isLoading,
  } = useRestaurantContext()
  //   useEffect(() => {
  //     return () => {
  //       isMounted.current = false
  //     }
  //   }, [])

  //   const handleRandomPickClick = async () => {
  //     setIsLoading(true)
  //     try {
  //       const data = await handleData(selectedCategories, distance)
  //       if (isMounted.current && data) {
  //         setRestaurantItems(data)
  //         setModalVisible(true)
  //       }
  //     } catch (error) {
  //       if (isMounted.current) {
  //         console.error('Error occurred:', error)
  //       }
  //     }
  //     if (isMounted.current) {
  //       setIsLoading(false)
  //     }
  //   }
  //   const handleCategoryChange = (categories: string[]) => {
  //     setSelectedCategories(categories)
  //   }
  //   const handleDistanceRangeChange = (distance: number) => {
  //     setDistance(distance)
  //   }
  //   const handleRestaurantChange = (index: number) => {
  //     const selectedRestaurant = restaurantItems[index]
  //     if (selectedRestaurant) {
  //       setRestaurant(selectedRestaurant)
  //       navigation.navigate('RestaurantInfo', { restaurant: selectedRestaurant })
  //     }
  //   }

  return (
    <View style={styles.container}>
      <View style={styles.filterOptions}>
        <Text h3 h3Style={styles.text}>
          거리
        </Text>
        <DistanceSlider onDistanceChange={handleDistanceRangeChange} />
      </View>
      <View style={styles.filterOptions}>
        <Text h3 h3Style={styles.text}>
          카테고리
        </Text>
        <CategorySwitch onCategoryChange={handleCategoryChange} />
      </View>
      <View style={{ margin: 20 }}>
        <RandomPickButton
          handleRandomPickClick={handleRandomPickClick}
          isLoading={isLoading}
          text="뭐 먹지?"
        />
      </View>
      <RandomItemModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        restaurantItems={restaurantItems}
        onRestaurantIndexChange={handleRestaurantChange}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  filterOptions: { marginTop: 20 },
  text: { textAlign: 'left', alignSelf: 'flex-start', margin: 20 },
})

export default FilterSetting
