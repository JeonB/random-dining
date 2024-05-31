import { create } from 'zustand'

interface State {
  selectedCategories: string[]
  setSelectedCategories: (categories: string[]) => void
  trackingGranted: boolean
  setTrackingGranted: (trackingGranted: boolean) => void
}

export const useStore = create<State>()(set => ({
  selectedCategories: [],
  setSelectedCategories: categories => set({ selectedCategories: categories }),
  trackingGranted: false,
  setTrackingGranted: trackingGranted => set({ trackingGranted }),
}))
