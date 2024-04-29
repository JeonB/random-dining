import React from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import { Map } from './map'
import { RestaurantDetail } from './restaurantDetail'
import { RootStackParamList } from '@_types/navigation'
import { StackScreenProps } from '@react-navigation/stack'
import { Restaurant } from '@_types/restaurant'

export const SelectedRestaurantInfo = ({
  route,
}: StackScreenProps<RootStackParamList, 'RestaurantInfo'>) => {
  const restaurant: Restaurant | undefined = route.params?.restaurant
  return (
    <View>
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

      {restaurant && <RestaurantDetail info={restaurant} />}
    </View>
  )
}

const styles = StyleSheet.create({
  mediaContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 0.7,
    position: 'relative',
    alignItems: 'center',
    padding: 0,
    margin: 10,
  },
})
