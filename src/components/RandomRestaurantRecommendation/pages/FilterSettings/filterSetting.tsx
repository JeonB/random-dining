import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { Text } from '@rneui/themed'
import DistanceSlider from '@_3Rpages/FilterSettings/distanceSlider'
import CategorySwitch from '@_3Rpages/FilterSettings/categorySwitch'
import RandomPickButton from '@_3Rpages/FilterSettings/randomPickButton'
import RandomItemModal from '@_3Rpages/RestaurantView/randomItemModal'
import { RestaurantParamList } from '@_types/restaurantParamList'
import { MyTheme } from 'theme'
import { useStore } from '@_common/utils/zustandStore'
import { fetchRestaurantData } from 'src/services/api'
import { LocationTypes } from 'src/types/restaurant'

const FilterSetting = () => {
  const route = useRoute<RouteProp<RestaurantParamList, 'FilterSetting'>>()
  const [modalVisible, setModalVisible] = useState(false)
  const {
    selectedCategories,
    setSelectedCategories,
    selectedLocation,
    setSelectedLocation,
    restaurantItems,
    setRestaurantItems,
    setRestaurant,
  } = useStore()
  useEffect(() => {
    const location = route.params?.location
    if (location) {
      setSelectedLocation({
        longitude: location.longitude,
        latitude: location.latitude,
      })
    }
  }, [route.params?.location])
  const isMounted = useRef(true)
  const [distance, setDistance] = useState(30)
  const [isLoading, setIsLoading] = useState(false)
  const [isChanging, setIsChanging] = useState(false)
  const navigation = useNavigation<NavigationProp<RestaurantParamList>>()
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
  const handleClose = useCallback(() => {
    setModalVisible(false)
  }, [])
  return (
    <View style={styles.container} testID="test">
      <ScrollView>
        <View style={styles.filterOptions}>
          <Text h3 h3Style={styles.text}>
            거리
          </Text>
          <DistanceSlider
            distanceRange={distance}
            onDistanceChange={setDistance}
          />
        </View>
        <View
          style={
            (styles.filterOptions,
            { marginBottom: Dimensions.get('window').height * 0.2 })
          }>
          <Text h3 h3Style={styles.text}>
            카테고리
          </Text>
          <CategorySwitch onCategoryChange={setSelectedCategories} />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <RandomPickButton
          handleRandomPickClick={handleRandomPickClick}
          isLoading={isLoading}
          icon="chat-question-outline"
          text="뭐 먹지?"
          style={styles.button}
          labelStyle={styles.buttonLabel}
        />
      </View>
      <RandomItemModal
        visible={modalVisible}
        onClose={handleClose}
        restaurantItems={restaurantItems}
        onRestaurantIndexChange={handleRestaurantChange}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterOptions: {
    marginTop: MyTheme.width * 18,
  },
  text: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    margin: MyTheme.width * 15,
    fontWeight: 'normal',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: Dimensions.get('window').height * 0.01,
    width: MyTheme.width * 300,
    height: MyTheme.width * 50,
    alignItems: 'center',
    alignSelf: 'center',
  },
  button: {
    width: MyTheme.width * 180,
    height: Platform.select({
      ios: MyTheme.width * 45,
      android: MyTheme.width * 40,
    }),
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: MyTheme.colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
  },
  buttonLabel: {
    fontSize: Platform.select({
      ios: MyTheme.width * 22,
      android: MyTheme.width * 20,
    }),
    lineHeight: MyTheme.width * 23,
  },
})

export default FilterSetting
