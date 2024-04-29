import { useState } from 'react'
import { Restaurant } from '@_types/restaurant'

export const useFilterSetting = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [restaurant, setRestaurant] = useState<Restaurant>()
  const [distance, setDistance] = useState<number>(100)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [restaurantItems, setRestaurantItems] = useState<Restaurant[]>([])
  const [isLoading, setIsLoading] = useState(false)

  return {
    modalVisible,
    setModalVisible,
    restaurant,
    setRestaurant,
    distance,
    setDistance,
    selectedCategories,
    setSelectedCategories,
    restaurantItems,
    setRestaurantItems,
    isLoading,
    setIsLoading,
  }
}
