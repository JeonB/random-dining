import React, { createContext, useContext } from 'react'
import { Restaurant } from '@_types/restaurant'

interface ContextType {
  selectedCategories: string[]
  setSelectedCategories: (categories: string[]) => void
  distance: number
  setDistance: (distance: number) => void
  restaurantItems: Restaurant[]
  setRestaurantItems: (items: Restaurant[]) => void
  modalVisible: boolean
  setModalVisible: (visible: boolean) => void
  restaurant: Restaurant | undefined
  setRestaurant: (restaurant: Restaurant) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  handleRandomPickClick: () => void
  handleCategoryChange: (categories: string[]) => void
  handleDistanceRangeChange: (distance: number) => void
  handleRestaurantChange: (index: number) => void
}
export const RestaurantContext = createContext<ContextType | undefined>(
  undefined,
)

export const useRestaurantContext = (): ContextType => {
  const context = useContext(RestaurantContext)
  if (!context) {
    throw new Error('프로바이더 내부에서 생성해야 합니다')
  }
  return context
}
