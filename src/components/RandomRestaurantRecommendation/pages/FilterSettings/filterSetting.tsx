import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Alert,
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
import {
  DistanceSlider,
  CategorySwitch,
  RandomPickButton,
} from '@_3Rpages/FilterSettings'
import RandomItemModal from '@_common/ui/randomItemModal'
import { MyTheme } from 'theme'
import { useStore } from '@_common/utils/zustandStore'
import { RestaurantParamList } from '@_types'
import { fetchLocationData, fetchRestaurantData } from '@_services/api'
import { LocationTypes } from '@_types'

interface DataType {
  [key: string]: string[]
}

const FilterSetting = () => {
  const route = useRoute<RouteProp<RestaurantParamList, 'FilterSetting'>>()
  const navigation = useNavigation<NavigationProp<RestaurantParamList>>()

  const selectedCategories = useStore(state => state.selectedCategories)
  const setSelectedLocation = useStore(state => state.setSelectedLocation)
  const distance = useStore(state => state.distance)
  const restaurantItems = useStore(state => state.restaurantItems)
  const setRestaurantItems = useStore(state => state.setRestaurantItems)
  const selectedLocation = useStore(state => state.selectedLocation)

  const isMounted = useRef(true)
  const [isLoading, setIsLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [isChanging, setIsChanging] = useState(false)
  const [recommendationType, setRecommendationType] = useState<
    'restaurant' | 'menu'
  >()

  useEffect(() => {
    const location = route.params?.location
    if (location) {
      setSelectedLocation({
        longitude: location.longitude,
        latitude: location.latitude,
      })
    }
  }, [route.params?.location, setSelectedLocation])

  const data: DataType = require('./data.json')
  const getSelectedData = (selectedCategories: string[]) => {
    return selectedCategories.map(category => data[category]).flat()
  }
  const selectedData = getSelectedData(selectedCategories)

  // 레스토랑 데이터를 가져오는 과정을 시작하고, 해당 과정이 완료되면 로딩 상태를 업데이트
  const handleMenuRandomPickClick = useCallback(() => {
    setIsLoading(true)
    setModalVisible(true)
    setRecommendationType('menu')
    if (isMounted.current) {
      setIsLoading(false)
    }
  }, [])

  const handleRestaurantData = useCallback(async () => {
    try {
      if (selectedCategories.includes('야식')) {
        let notIncludeMidnightSnackData: LocationTypes[] = []
        // '야식' 카테고리를 제외한 데이터 가져오기
        const filteredCategories = selectedCategories.filter(
          category => category !== '야식',
        )
        if (filteredCategories.length > 0) {
          const notIncludeMidnightSnackResponse = await fetchRestaurantData(
            filteredCategories,
            distance,
            String(selectedLocation.longitude),
            String(selectedLocation.latitude),
          )
          if (
            !notIncludeMidnightSnackResponse ||
            notIncludeMidnightSnackResponse.length === 0
          ) {
            return
          }
          notIncludeMidnightSnackData =
            notIncludeMidnightSnackResponse?.filter(
              (item): item is LocationTypes => item !== undefined,
            ) || []
        }

        // '야식' 카테고리 데이터 가져오기
        const midnightSnack = getSelectedData(['야식'])
        const snackFetchPromises = midnightSnack.map(snack =>
          fetchLocationData(
            snack,
            String(selectedLocation.longitude),
            String(selectedLocation.latitude),
            'FD6',
            distance,
            'distance',
          ),
        )

        // 모든 '야식' 데이터 요청 완료
        const snackResults = await Promise.all(snackFetchPromises)
        const midnightSnackData = snackResults
          .flat()
          .filter((item): item is LocationTypes => item !== undefined)

        if (midnightSnackData.length === 0) {
          Alert.alert(
            '주변에 식당이 없습니다. 거리 범위 또는 카테고리를 조정해주세요.',
          )
          return
        }

        // 두 데이터 병합
        const combinedData = [
          ...notIncludeMidnightSnackData,
          ...midnightSnackData,
        ]
        if (isMounted.current && combinedData) {
          // 병합된 데이터를 상태로 설정
          setRestaurantItems(combinedData)
          setModalVisible(true)
        }
      } else {
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
      }
    } catch (error) {
      console.error('Error occurred:', error)
    }
  }, [selectedCategories, distance])

  const handleRestaurantRandomPickClick = useCallback(() => {
    setIsLoading(true)
    setRecommendationType('restaurant')
    handleRestaurantData().finally(() => {
      if (isMounted.current) {
        setIsLoading(false)
      }
    })
  }, [handleRestaurantData])

  const handleItemChange = useCallback(() => {
    if (isChanging) return // 이미 변경 중이면 무시
    setIsChanging(true) // 변경 시작
    if (recommendationType === 'menu') {
      navigation.navigate('SelectedMenu', { items: selectedData })
    } else if (recommendationType === 'restaurant') {
      navigation.navigate('SelectedRestaurantInfo')
    }
    setIsChanging(false) // 변경 완료
  }, [isChanging, selectedData, restaurantItems])

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
          <DistanceSlider />
        </View>
        <View
          style={[
            styles.filterOptions,
            { marginBottom: Dimensions.get('window').height * 0.2 },
          ]}>
          <Text h3 h3Style={styles.text}>
            카테고리
          </Text>
          <CategorySwitch />
          <View style={styles.buttonContainer}>
            <RandomPickButton
              handleRandomPickClick={handleRestaurantRandomPickClick}
              isLoading={isLoading}
              icon="map-marker-question-outline"
              text="어디가지?"
              style={[
                { backgroundColor: MyTheme.colors.secondary },
                styles.button,
              ]}
              labelStyle={styles.buttonLabel}
            />
            <RandomPickButton
              handleRandomPickClick={handleMenuRandomPickClick}
              isLoading={isLoading}
              icon="chat-question-outline"
              text="뭐 먹지?"
              style={[
                { backgroundColor: MyTheme.colors.primary },
                styles.button,
              ]}
              labelStyle={styles.buttonLabel}
            />
          </View>
        </View>
      </ScrollView>
      <RandomItemModal
        visible={modalVisible}
        onClose={handleClose}
        onItemChange={handleItemChange}
        items={recommendationType === 'menu' ? selectedData : restaurantItems}
        isRestaurantSelection={
          recommendationType === 'restaurant' ? true : false
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: MyTheme.width * 800,
    position: 'relative',
    alignItems: 'center',
    alignSelf: 'center',
  },
  filterOptions: {
    marginTop: MyTheme.width * 18,
    marginBottom: 0,
  },
  text: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    margin: MyTheme.width * 15,
    fontWeight: 'normal',
  },
  buttonContainer: {
    paddingHorizontal: MyTheme.width * 15,
    flexDirection: 'row',
    marginTop: MyTheme.width * 20,
    width: '100%',
    justifyContent: 'space-between',
    height: MyTheme.width * 50,
    alignItems: 'center',
    alignSelf: 'center',
  },
  button: {
    width: '49%',
    height: Platform.select({
      ios: MyTheme.width * 40,
      android: MyTheme.width * 38,
    }),
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    borderRadius: 10,
  },
  buttonLabel: {
    color: '#e6e6fA',
    fontSize: Platform.select({
      ios: MyTheme.width * 22,
      android: MyTheme.width * 20,
    }),
    lineHeight: MyTheme.width * 22,
  },
})

export default React.memo(FilterSetting)
