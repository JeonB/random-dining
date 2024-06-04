import { create } from 'zustand'
import { LocationTypes } from '@_types/restaurant'
interface State {
  trackingDenied: boolean
  setTrackingDenied: (trackingDenied: boolean) => void
  showAd: boolean
  setShowAd: (showAd: boolean) => void
  selectedCategories: string[]
  setSelectedCategories: (categories: string[]) => void
  distance: number
  setDistance: (distance: number) => void
  restaurantItems: LocationTypes[]
  setRestaurantItems: (items: LocationTypes[]) => void
  modalVisible: boolean
  setModalVisible: (visible: boolean) => void
  restaurant: LocationTypes | undefined
  setRestaurant: (restaurant: LocationTypes | undefined) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  isChanging: boolean
  setIsChanging: (changing: boolean) => void
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
}

export const useStore = create<State>()(set => ({
  trackingDenied: false,
  setTrackingDenied: trackingDenied => set({ trackingDenied }),
  showAd: true,
  setShowAd: showAd => set({ showAd }),
  selectedCategories: [],
  setSelectedCategories: categories => set({ selectedCategories: categories }),
  distance: 30,
  setDistance: distance => set({ distance }),
  restaurantItems: [],
  setRestaurantItems: items => set({ restaurantItems: items }),
  modalVisible: false,
  setModalVisible: visible => set({ modalVisible: visible }),
  restaurant: undefined,
  setRestaurant: restaurant => set({ restaurant }),
  isLoading: false,
  setIsLoading: loading => set({ isLoading: loading }),
  isChanging: false,
  setIsChanging: changing => set({ isChanging: changing }),
  selectedLocation: { longitude: 0, latitude: 0 },
  setSelectedLocation: location => set({ selectedLocation: location }),
  currentLocation: { currentLongitude: 0, currentLatitude: 0 },
  setCurrentLocation: location => set({ currentLocation: location }),
}))
