import React from 'react'
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Text } from '@rneui/themed'
import DistanceSlider from '@_3Rpages/FilterSettings/distanceSlider'
import CategorySwitch from '@_3Rpages/FilterSettings/categorySwitch'
import RandomPickButton from '@_3Rpages/FilterSettings/randomPickButton'
import RandomItemModal from '@_3Rpages/RestaurantView/randomItemModal'
import { useRestaurantContext } from '@_3Rpages/context/restaurantContext'
import { RootStackParamList } from '@_types/navigation'

const FilterSetting = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
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
  } = useRestaurantContext()

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
        <View style={(styles.filterOptions, { marginBottom: 60 })}>
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
          style={{ width: Dimensions.get('window').width * 0.5 }}
        />
      </View>
      <RandomItemModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
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
  filterOptions: { marginTop: 20 },
  text: { textAlign: 'left', alignSelf: 'flex-start', margin: 20 },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
})

export default FilterSetting
