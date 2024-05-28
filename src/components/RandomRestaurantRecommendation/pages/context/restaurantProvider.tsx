import React, { useCallback, useEffect, useRef, useState } from 'react'
import { RestaurantContext } from '@_3Rpages/context/restaurantContext'
import { fetchRestaurantData, getPositionByGeolocation } from '@_services/api'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { LocationTypes } from '@_types/restaurant'
import { RestaurantParamList } from '@_types/restaurantParamList'
import { Alert, Linking } from 'react-native'

export const RestaurantProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [showAd, setShowAd] = useState(true)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [distance, setDistance] = useState(30)
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
    try {
      const { longitude: currentLongitude, latitude: currentLatitude } =
        await getPositionByGeolocation()
      setCurrentLocation({
        currentLongitude,
        currentLatitude,
      })
    } catch (error) {
      console.error('위치 권한이 거부되었습니다.')
      // 사용자에게 알림을 표시하고 위치 권한 설정으로 이동
      Alert.alert(
        '위치 권한 필요',
        '이 기능을 사용하려면 위치 권한이 필요합니다. 설정으로 이동하시겠습니까?',
        [
          {
            text: '취소',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: '확인', onPress: () => Linking.openSettings() },
        ],
      )
    }
  }
  useEffect(() => {
    getCurrentLocation()
    return () => {
      isMounted.current = false
    }
  }, [])

  // distance, selectedCategories 중 하나가 변경될 때만 새로 생성
  const handleRestaurantData = useCallback(async () => {
    try {
      const data = await fetchRestaurantData(
        selectedCategories,
        distance,
        String(selectedLocation.longitude),
        String(selectedLocation.latitude),
      )

      if (isMounted.current && data) {
        const filteredData = data.filter(
          (item): item is LocationTypes => item !== undefined,
        )
        setRestaurantItems(filteredData)
        setModalVisible(true)
      }
    } catch (error) {
      console.error('Error occurred:', error)
    }
  }, [distance, selectedCategories])

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
  const handleRestaurantChange = useCallback(
    (index: number) => {
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
    },
    [isChanging, restaurantItems],
  )

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
        showAd,
        setShowAd,
      }}>
      {children}
    </RestaurantContext.Provider>
  )
}
