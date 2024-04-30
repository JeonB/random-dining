import React, { useEffect, useRef, useState } from 'react'
import { RestaurantContext } from './restaurantContext'
import { handleData } from '@_services/api'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Restaurant } from '@_types/restaurant'
import { RootStackParamList } from '@_types/navigation'

export const RestaurantProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [distance, setDistance] = useState<number>(0)
  const [restaurantItems, setRestaurantItems] = useState<Restaurant[]>([])
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const isMounted = useRef(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [restaurant, setRestaurant] = useState<Restaurant>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])
  const handleRandomPickClick = async () => {
    try {
      const data = await handleData(selectedCategories, distance)
      if (isMounted.current && data) {
        setRestaurantItems(data)
        setModalVisible(true)
      }
    } catch (error) {
      if (isMounted.current) {
        console.error('Error occurred:', error)
      }
    }
  }
  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories)
  }
  const handleDistanceRangeChange = (distance: number) => {
    setDistance(distance)
  }
  const handleRestaurantChange = (index: number) => {
    const selectedRestaurant = restaurantItems[index]
    if (selectedRestaurant) {
      setRestaurant(selectedRestaurant)
      navigation.navigate('RestaurantInfo', { restaurant: selectedRestaurant })
    }
  }

  return (
    <RestaurantContext.Provider
      value={{
        restaurant,
        setRestaurant,
        isLoading,
        setIsLoading,
        modalVisible,
        setModalVisible,
        selectedCategories,
        setSelectedCategories,
        distance,
        setDistance,
        restaurantItems,
        setRestaurantItems,
        handleRandomPickClick,
        handleCategoryChange,
        handleDistanceRangeChange,
        handleRestaurantChange,
      }}>
      {children}
    </RestaurantContext.Provider>
  )
}
