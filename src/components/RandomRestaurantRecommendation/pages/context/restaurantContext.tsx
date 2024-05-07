import React, { createContext, useContext } from 'react'
import { RestaurantTypes } from '@_types/restaurant'

interface ContextType {
  selectedCategories: string[]
  setSelectedCategories: (categories: string[]) => void
  distance: number
  setDistance: (distance: number) => void
  restaurantItems: RestaurantTypes[]
  setRestaurantItems: (items: RestaurantTypes[]) => void
  modalVisible: boolean
  setModalVisible: (visible: boolean) => void
  restaurant: RestaurantTypes | undefined
  setRestaurant: (restaurant: RestaurantTypes) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  handleRandomPickClick: () => void
  handleRestaurantChange: (index: number) => void
  selectedLocation: { latitude: number; longitude: number }
  setSelectedLocation: (location: {
    latitude: number
    longitude: number
  }) => void
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
