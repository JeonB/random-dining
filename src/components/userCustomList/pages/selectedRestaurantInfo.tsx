import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'

import { StackScreenProps } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { RootStackParamList } from '@_types/navigation'
import { Restaurant } from '@_types/restaurant'
import { Map } from '@_components/RandomRestaurantRecommendation/pages/RestaurantView/map'
import { RestaurantDetail } from '@_components/RandomRestaurantRecommendation/pages/RestaurantView/restaurantDetail'
import RestaurantActionButtons from '@_components/RandomRestaurantRecommendation/pages/RestaurantView/restaurantActionButtons'
import { RandomItemModal } from '@_components/RandomRestaurantRecommendation/pages/RestaurantView/randomItemModal'

export const SelectedRestaurantInfo = ({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, 'UserSelectedRestaurantInfo'>) => {
  const restaurant: Restaurant | undefined = route.params?.restaurant
  const listName: string | undefined = route.params?.listname

  const [modalVisible, setModalVisible] = useState(false)
  const [restaurantItems, setRestaurantItems] = useState<Restaurant[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleRestaurantChange = (index: number) => {
    const selectedRestaurant = restaurantItems[index]

    if (selectedRestaurant) {
      navigation.navigate('UserSelectedRestaurantInfo', {
        restaurant: selectedRestaurant,
        listname: listName,
      })
    }
  }

  const handleRandomPickClick = async () => {
    try {
      const savedListData = await AsyncStorage.getItem(listName)
      // 리스트에 저장된 데이터가 있을 경우 random picker modal 호출
      if (savedListData !== null && JSON.parse(savedListData).length > 0) {
        setRestaurantItems(JSON.parse(savedListData))
        setModalVisible(true)
      }
    } catch (error) {
      console.error('Error loading list data:', error)
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.mediaContainer}>
        {restaurant.x ? (
          <Map info={restaurant} />
        ) : (
          <Image
            source={require('../../../../assets/splash.png')}
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
