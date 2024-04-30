import React, { useRef } from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import { Map } from './map'
import { RestaurantDetail } from './restaurantDetail'
import { RootStackParamList } from '@_types/navigation'
import { StackScreenProps } from '@react-navigation/stack'
import { Restaurant } from '@_types/restaurant'
import RestaurantActionButtons from './restaurantActionButtons'
import { useFilterSetting } from '../FilterSettings/hook/useFilterSetting'
import { handleData } from '@_services/api'
import { RandomItemModal } from './randomItemModal'
import { NavigationProp } from '@react-navigation/native'

export const SelectedRestaurantInfo = ({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, 'RestaurantInfo'>) => {
  const {
    modalVisible,
    setModalVisible,
    setRestaurant,
    distance,
    setDistance,
    selectedCategories,
    setSelectedCategories,
    restaurantItems,
    setRestaurantItems,
    isLoading,
    setIsLoading,
  } = useFilterSetting()
  const isMounted = useRef(true)
  const handleRandomPickClick = async () => {
    setIsLoading(true)
    try {
      console.log(selectedCategories, distance)
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
  const handleRestaurantChange = (index: number) => {
    const selectedRestaurant = restaurantItems[index]
    if (selectedRestaurant) {
      setRestaurant(selectedRestaurant)
      navigation.navigate('RestaurantInfo', { restaurant: selectedRestaurant })
    }
  }
  const restaurant: Restaurant | undefined = route.params?.restaurant
  return (
    <View style={styles.container}>
      <View style={styles.mediaContainer}>
        {restaurant ? (
          <Map info={restaurant} />
        ) : (
          <Image
            source={{ uri: 'https://i.postimg.cc/rpJGytmg/image.png' }}
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </View>

      {restaurant && (
        <View>
          <RestaurantDetail info={restaurant} />
          <RestaurantActionButtons
            selectedRestaurant={restaurant}
            handleRandomPickClick={handleRandomPickClick}
            isLoading={isLoading}
            text="다시 선택"
            navigation={navigation}
          />
        </View>
      )}

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
    alignItems: 'center',
  },
  mediaContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 0.7,
    position: 'relative',
    alignItems: 'center',
    padding: 0,
    margin: 10,
  },
  reselectButton: {
    borderColor: '#003366',
    margin: 15,
    borderRadius: 5,
  },
  detailButton: {
    backgroundColor: '#2E6FCF',
    borderRadius: 5,
    width: 200,
    margin: 15,
  },
})
