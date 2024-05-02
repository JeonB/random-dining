import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import { Text } from '@rneui/themed'
import { DistanceSlider } from './distanceSlider'
import { CategorySwitch } from './categorySwitch'
import { RandomItemModal } from '../RestaurantView/randomItemModal'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from 'src/types/navigation'
import RandomPickButton from './randomPickButton'
import { useRestaurantContext } from '../context/restaurantContext'

const FilterSetting = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const {
    handleRandomPickClick,
    // handleCategoryChange,
    // handleDistanceRangeChange,
    handleRestaurantChange,
    modalVisible,
    setModalVisible,
    restaurantItems,
    isLoading,
    distance,
    setDistance,
    selectedCategories,
    setSelectedCategories,
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
  //       navigation.navigate('SelectedRestaurantInfo', { restaurant: selectedRestaurant })
  //     }
  //   }

  return (
    <View style={styles.container} testID="test">
      <ScrollView>
        <View style={styles.filterOptions}>
          <Text h3 h3Style={styles.text}>
            거리
          </Text>
          <DistanceSlider
            distanceRange={distance}
            onDistanceChange={setDistance}
          />
        </View>
        <View style={(styles.filterOptions, { marginBottom: 60 })}>
          <Text h3 h3Style={styles.text}>
            카테고리
          </Text>
          <CategorySwitch onCategoryChange={setSelectedCategories} />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <RandomPickButton
          handleRandomPickClick={handleRandomPickClick}
          isLoading={isLoading}
          icon="chat-question-outline"
          text="뭐 먹지?"
          style={{ width: Dimensions.get('window').width * 0.5 }}
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
    // justifyContent: 'space-between',
  },
  filterOptions: { marginTop: 20 },
  text: { textAlign: 'left', alignSelf: 'flex-start', margin: 20 },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
})

export default FilterSetting
