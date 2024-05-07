import React from 'react'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { RestaurantParamList } from '@_types/restaurantParamList'
import { StyleSheet, View } from 'react-native'
import Map from './map'
const MapSearch = () => {
  const navigation = useNavigation<NavigationProp<RestaurantParamList>>()
  return (
    //검색창

    //지도
    <View style={styles.container}>
      <Map />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
})
export default MapSearch
