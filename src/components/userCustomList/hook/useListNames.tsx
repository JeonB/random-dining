import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useListNames = () => {
  const [listNames, setListNames] = useState<string[]>([])

  const fetchListNames = async () => {
    try {
      const savedListNames = await AsyncStorage.getItem('listnames')
      if (savedListNames !== null) {
        setListNames(JSON.parse(savedListNames))
      }
    } catch (error) {
      console.error('Error loading list names:', error)
    }
  }

  const saveListNames = async (newListNames: string[]) => {
    try {
      await AsyncStorage.setItem('listnames', JSON.stringify(newListNames))
      setListNames(newListNames)
    } catch (error) {
      console.error('Error saving list names:', error)
    }
  }

  useEffect(() => {
    fetchListNames()
  }, [])

  return { listNames, fetchListNames, saveListNames }
}
