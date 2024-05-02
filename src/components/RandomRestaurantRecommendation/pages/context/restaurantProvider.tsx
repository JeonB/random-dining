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
  const [distance, setDistance] = useState<number>(30)
  const [restaurantItems, setRestaurantItems] = useState<Restaurant[]>([])
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const isMounted = useRef(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [restaurant, setRestaurant] = useState<Restaurant>()
  const [isLoading, setIsLoading] = useState(false)
  const [isChanging, setIsChanging] = useState(false)

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  // 데이터 호출 함수
  const handleRandomPickClick = async () => {
    setIsLoading(true)
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
    if (isMounted.current) {
      setIsLoading(false)
    }
  }
  // 카테고리 변경 함수
  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories)
  }
  // 거리 변경 함수
  const handleDistanceRangeChange = (distance: number) => {
    setDistance(distance)
  }
  const handleRestaurantChange = (index: number) => {
    if (isChanging) return // 이미 변경 중이면 무시
    setIsChanging(true) // 변경 시작
    const selectedRestaurant = restaurantItems[index]
    if (selectedRestaurant) {
      setRestaurant(selectedRestaurant)
      navigation.navigate('SelectedRestaurantInfo', {
        restaurant: selectedRestaurant,
      })
    }

    setIsChanging(false) // 변경 완료
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
        // handleCategoryChange,
        // handleDistanceRangeChange,
        handleRestaurantChange,
      }}>
      {children}
    </RestaurantContext.Provider>
  )
}
