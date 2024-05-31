import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { Text } from '@rneui/themed'
import DistanceSlider from '@_3Rpages/FilterSettings/distanceSlider'
import CategorySwitch from '@_3Rpages/FilterSettings/categorySwitch'
import RandomPickButton from '@_3Rpages/FilterSettings/randomPickButton'
import RandomItemModal from '@_3Rpages/RestaurantView/randomItemModal'
import { useRestaurantContext } from '@_components/common/context/restaurantContext'
import { RestaurantParamList } from '@_types/restaurantParamList'
import { MyTheme } from 'theme'

const FilterSetting = () => {
  const route = useRoute<RouteProp<RestaurantParamList, 'FilterSetting'>>()
  const {
    handleRandomPickClick,
    handleRestaurantChange,
    modalVisible,
    setModalVisible,
    restaurantItems,
    isLoading,
    distance,
    setDistance,
    setSelectedCategories,
    setSelectedLocation,
  } = useRestaurantContext()

  useEffect(() => {
    const location = route.params?.location
    if (location) {
      setSelectedLocation({
        longitude: location.longitude,
        latitude: location.latitude,
      })
    }
  }, [route.params?.location])

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
    height: MyTheme.width * 40,
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
    fontSize: MyTheme.width * 20,
    textAlignVertical: 'center', // Android
    lineHeight: MyTheme.width * 23, // iOS
    paddingTop: MyTheme.width * 2,
  },
})

export default FilterSetting
