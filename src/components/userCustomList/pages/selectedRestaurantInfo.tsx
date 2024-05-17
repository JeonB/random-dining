import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'

import { StackScreenProps } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text } from '@rneui/themed'

import { RootStackParamList } from '@_types/listParamList'
import { LocationTypes } from '@_types/restaurant'
import Map from '@_3Rpages/RestaurantView/map'
import RestaurantDetail from '@_3Rpages/RestaurantView/restaurantDetail'
import RandomItemModal from '@_3Rpages/RestaurantView/randomItemModal'
import { useRestaurantContext } from '@_3Rpages/context/restaurantContext'
import RestaurantActionButtons from '@_userListPages/restaurantActionButtons'

export const SelectedRestaurantInfo = ({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, 'UserSelectedRestaurantInfo'>) => {
  const { currentLocation } = useRestaurantContext()

  const restaurant: LocationTypes | undefined = route.params?.restaurant
  const listName: string | undefined = route.params?.listname

  const [modalVisible, setModalVisible] = useState(false)
  const [restaurantItems, setRestaurantItems] = useState<LocationTypes[]>([])
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
          <Map info={restaurant} currentLocation={currentLocation} />
        ) : (
          <Image
            source={require('../../../../assets/splash.png')}
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </View>
      {restaurant.category_name ? (
        <RestaurantDetail info={restaurant} />
      ) : (
        <View style={styles.infoView}>
          <Text h4 h4Style={{ fontSize: 22, margin: 15 }}>
            {restaurant?.place_name || ''}
          </Text>
        </View>
      )}
      <RestaurantActionButtons
        selectedRestaurant={restaurant}
        handleRandomPickClick={handleRandomPickClick}
        isLoading={isLoading}
        navigation={navigation}
      />
      <RandomItemModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        restaurantItems={restaurantItems}
        onRestaurantIndexChange={handleRestaurantChange}
      />
    </View>
  )
}
const deviceWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  infoView: {
    width: deviceWidth > 430 ? 450 : 400,
    alignItems: 'center',
    margin: 5,
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
