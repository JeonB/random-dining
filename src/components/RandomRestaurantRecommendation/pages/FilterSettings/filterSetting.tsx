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
import {
  DistanceSlider,
  CategorySwitch,
  RandomPickButton,
} from '@_3Rpages/FilterSettings'
import RandomItemModal from '@_common/ui/randomItemModal'
import { MyTheme } from 'theme'
import { useStore } from '@_common/utils/zustandStore'
import { RestaurantParamList } from '@_types'

interface DataType {
  [key: string]: string[]
}

const FilterSetting = () => {
  const route = useRoute<RouteProp<RestaurantParamList, 'FilterSetting'>>()
  const navigation = useNavigation<NavigationProp<RestaurantParamList>>()
  const { selectedCategories, setSelectedLocation } = useStore(state => ({
    selectedCategories: state.selectedCategories,
    setSelectedLocation: state.setSelectedLocation,
  }))

  const isMounted = useRef(true)
  const [isLoading, setIsLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [isChanging, setIsChanging] = useState(false)

  useEffect(() => {
    const location = route.params?.location
    if (location) {
      setSelectedLocation({
        longitude: location.longitude,
        latitude: location.latitude,
      })
    }
  }, [route.params?.location])

  const data: DataType = require('./data.json')
  const getSelectedData = (selectedCategories: string[]) => {
    return selectedCategories.map(category => data[category]).flat()
  }

  const selectedData = getSelectedData(selectedCategories)

  const handleMenuChange = useCallback(() => {
    if (isChanging) return // 이미 변경 중이면 무시
    setIsChanging(true) // 변경 시작
    navigation.navigate('SelectedMenu', { items: selectedData })

    setIsChanging(false) // 변경 완료
  }, [isChanging, selectedData])

  // 레스토랑 데이터를 가져오는 과정을 시작하고, 해당 과정이 완료되면 로딩 상태를 업데이트
  const handleRandomPickClick = useCallback(() => {
    setIsLoading(true)
    setModalVisible(true)
    if (isMounted.current) {
      setIsLoading(false)
    }
  }, [])

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
          style={
            (styles.filterOptions,
            { marginBottom: Dimensions.get('window').height * 0.2 })
          }>
          <Text h3 h3Style={styles.text}>
            카테고리
          </Text>
          <CategorySwitch />
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
        onItemChange={handleMenuChange}
        items={selectedData}
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
      ios: MyTheme.width * 40,
      android: MyTheme.width * 35,
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
