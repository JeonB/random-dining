import React, { createContext, useContext } from 'react'
import { LocationTypes } from '@_types'

interface ContextType {
  selectedCategories: string[]
  setSelectedCategories: (categories: string[]) => void
  distance: number
  setDistance: (distance: number) => void
  restaurantItems: LocationTypes[]
  setRestaurantItems: (items: LocationTypes[]) => void
  modalVisible: boolean
  setModalVisible: (visible: boolean) => void
  restaurant: LocationTypes | undefined
  setRestaurant: (restaurant: LocationTypes) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  handleRandomPickClick: () => void
  handleRestaurantChange: (index: number) => void
  selectedLocation: { longitude: number; latitude: number }
  setSelectedLocation: (location: {
    longitude: number
    latitude: number
  }) => void
  currentLocation: { currentLongitude: number; currentLatitude: number }
  setCurrentLocation: (location: {
    currentLongitude: number
    currentLatitude: number
  }) => void
  showAd: boolean
  setShowAd: (showAd: boolean) => void
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
