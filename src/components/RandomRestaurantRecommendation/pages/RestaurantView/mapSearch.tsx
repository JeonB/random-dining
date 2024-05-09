import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import Map from './map'
import PlaceSearchBar from './placeSearchBar'
import { fetchLocationData } from '@_services/api'
import { useRestaurantContext } from '../context/restaurantContext'
import { LocationTypes } from '@_types/restaurant'
import { ListItem } from '@rneui/themed'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RestaurantParamList } from 'src/types/restaurantParamList'
const MapSearch = () => {
  const { currentLocation } = useRestaurantContext()
  const navigation = useNavigation<NavigationProp<RestaurantParamList>>()
  const [addressData, setAddressData] = useState<LocationTypes[]>([])
  useEffect(() => {}, [addressData])

  return (
    <>
      <View
        style={{
          position: 'absolute',
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height * 0.1,
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}>
        <PlaceSearchBar setAddressData={setAddressData} />
      </View>

      <View style={styles.container}>
        <FlatList
          style={{
            alignContent: 'center',
            position: 'absolute',
            top: Dimensions.get('window').height * 0.09,
            width: Dimensions.get('window').width * 0.9,
            height: Dimensions.get('window').height * 0.2,
            zIndex: 1,
          }}
          data={addressData}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => {
                navigation.navigate('FilterSetting', {
                  location: {
                    longitude: Number(item.x),
                    latitude: Number(item.y),
                  },
                })
              }}>
              <ListItem.Content>
                <ListItem.Title>{item.place_name}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          )}
        />
        <Map currentLocation={currentLocation} />
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
})
export default MapSearch
