import React, { useEffect, useState } from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { useRestaurantContext } from '@_3Rpages/context/restaurantContext'
import { LocationTypes } from '@_types/restaurant'
import Map from './map'
import RestaurantDetail from './restaurantDetail'
import RestaurantActionButtons from './restaurantActionButtons'
import RandomItemModal from './randomItemModal'
import { RestaurantParamList } from '@_types/restaurantParamList'
import { getPositionByGeolocation } from '@_services/api'

const SelectedRestaurantInfo = ({
  route,
  navigation,
}: StackScreenProps<RestaurantParamList, 'SelectedRestaurantInfo'>) => {
  const {
    modalVisible,
    setModalVisible,
    restaurantItems,
    isLoading,
    handleRandomPickClick,
    handleRestaurantChange,
    currentLocation,
  } = useRestaurantContext()
  const restaurant: LocationTypes | undefined = route.params?.restaurant
  return (
    <View style={styles.container}>
      <View style={styles.mediaContainer}>
        {restaurant ? (
          <Map info={restaurant} currentLocation={currentLocation} />
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

export default SelectedRestaurantInfo
