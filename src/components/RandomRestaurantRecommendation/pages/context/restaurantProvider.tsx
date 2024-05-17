import React, { useCallback, useEffect, useRef, useState } from 'react'
import { RestaurantContext } from '@_3Rpages/context/restaurantContext'
import { fetchRestaurantData, getPositionByGeolocation } from '@_services/api'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { LocationTypes } from '@_types/restaurant'
import { RestaurantParamList } from '@_types/restaurantParamList'

export const RestaurantProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [distance, setDistance] = useState<number>(30)
  const [restaurantItems, setRestaurantItems] = useState<LocationTypes[]>([])
  const navigation = useNavigation<NavigationProp<RestaurantParamList>>()
  const isMounted = useRef(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [restaurant, setRestaurant] = useState<LocationTypes>()
  const [isLoading, setIsLoading] = useState(false)
  const [isChanging, setIsChanging] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState({
    longitude: 0,
    latitude: 0,
  })
  const [currentLocation, setCurrentLocation] = useState({
    currentLongitude: 0,
    currentLatitude: 0,
  })
  const getCurrentLocation = async () => {
    const { longitude: currentLongitude, latitude: currentLatitude } =
      await getPositionByGeolocation()
    setCurrentLocation({
      currentLongitude,
      currentLatitude,
    })
  }

  useEffect(() => {
    getCurrentLocation()
    return () => {
      isMounted.current = false
    }
  }, [])

  // selectedLocation의 latitude와 longitude가 0이 아닐 때까지 기다린 후, 해당 값을 반환
  const getLocation = useCallback(() => {
    return new Promise<{ longitude: number; latitude: number }>(
      (resolve, reject) => {
        const checkLocation = setInterval(() => {
          if (
            selectedLocation.longitude !== 0 &&
            selectedLocation.latitude !== 0
          ) {
            clearInterval(checkLocation)
            resolve(selectedLocation)
          }
        }, 50)

        setTimeout(() => {
          clearInterval(checkLocation)
          reject(new Error('Timeout'))
        }, 3000)
      },
    )
  }, [selectedLocation])

  // getLocation 함수를 통해 위치 정보를 가져온 후, 해당 위치를 기반으로 레스토랑 데이터를 가져옴. useCallback 훅은 이 함수가 getLocation, distance, selectedCategories 중 하나가 변경될 때만 새로 생성
  const handleRestaurantData = useCallback(async () => {
    try {
      const location = await getLocation()
      const data = await fetchRestaurantData(
        selectedCategories,
        distance,
        String(location.longitude),
        String(location.latitude),
      )

      if (isMounted.current && data) {
        setRestaurantItems(data)
        setModalVisible(true)
      }
    } catch (error) {
      console.error('Error occurred:', error)
    }
  }, [getLocation, distance, selectedCategories])

  // 레스토랑 데이터를 가져오는 과정을 시작하고, 해당 과정이 완료되면 로딩 상태를 업데이트
  const handleRandomPickClick = useCallback(() => {
    setIsLoading(true)
    handleRestaurantData().finally(() => {
      if (isMounted.current) {
        setIsLoading(false)
      }
    })
  }, [handleRestaurantData])

  // 주어진 인덱스에 해당하는 레스토랑을 선택하고, 해당 식당의 정보를 보여주는 페이지로 이동
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
        handleRestaurantChange,
        selectedLocation,
        setSelectedLocation,
        currentLocation,
        setCurrentLocation,
      }}>
      {children}
    </RestaurantContext.Provider>
  )
}
