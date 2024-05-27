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
import mainImage from '@_assetImages/main.png'

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
  const { setShowAd } = useRestaurantContext()
  useEffect(() => {
    setShowAd(false)

    return () => {
      setShowAd(true)
    }
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.mediaContainer}>
        {restaurant ? (
          <Map info={restaurant} currentLocation={currentLocation} />
        ) : (
          <Image
            source={mainImage}
            style={{ width: '100%', height: '100%' }}
            onError={({ nativeEvent: { error } }) => console.warn(error)}
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
    height: Dimensions.get('window').width * 0.6,
    position: 'relative',
    alignItems: 'center',
    padding: 0,
    marginBottom: 10,
  },
  reselectButton: {
    borderColor: '#003366',
    margin: 15,
    borderRadius: 5,
  },
})

export default SelectedRestaurantInfo
