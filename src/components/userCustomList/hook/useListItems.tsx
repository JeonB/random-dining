import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { RestaurantTypes } from '@_types/restaurant'
export const useListItems = (listName: string) => {
  const [listItemsT, setListItems] = useState<RestaurantTypes[]>([])

  const fetchListItems = async () => {
    try {
      const savedListItems = await AsyncStorage.getItem(listName)
      if (savedListItems !== null) {
        setListItems(JSON.parse(savedListItems))
      }
    } catch (error) {
      console.error(`Error loading list items for ${listName}:`, error)
    }
  }

  const updateListItems = (newListItems: RestaurantTypes[]) => {
    setListItems(newListItems)
  }

  const saveListItems = async (newListItems: RestaurantTypes[]) => {
    try {
      await AsyncStorage.setItem(listName, JSON.stringify(newListItems))
      setListItems(newListItems)
    } catch (error) {
      console.error(`Error saving list items for ${listName}:`, error)
    }
  }

  useEffect(() => {
    fetchListItems()
  }, [listName])

  return { listItemsT, fetchListItems, saveListItems, updateListItems }
}
