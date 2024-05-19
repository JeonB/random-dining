import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import Map from './map'
import PlaceSearchBar from './placeSearchBar'
import { useRestaurantContext } from '../context/restaurantContext'
import { LocationTypes } from '@_types/restaurant'
import { ListItem, Button, Icon } from '@rneui/themed'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RestaurantParamList } from '@_types/restaurantParamList'
import { MyTheme } from 'theme'

const MapSearch = () => {
  const { currentLocation, setCurrentLocation } = useRestaurantContext()
  const navigation = useNavigation<NavigationProp<RestaurantParamList>>()
  const [addressData, setAddressData] = useState<LocationTypes[]>([])
  useEffect(() => {}, [addressData])
  const [markerLocation, setMarkerLocation] = useState<{
    lat: number
    lng: number
  } | null>(null)
  const [markerVisible, setMarkerVisible] = useState<boolean>(false)
  const navigateToFilterSettingWithLocation = (
    longitude: string,
    latitude: string,
  ) => {
    navigation.navigate('FilterSetting', {
      location: {
        longitude: Number(longitude),
        latitude: Number(latitude),
      },
    })
  }
  return (
    <View style={styles.container} testID="map-search">
      <View style={styles.searchBarContainer}>
        <PlaceSearchBar setAddressData={setAddressData} />
      </View>
      <FlatList
        style={[
          styles.flatList,
          addressData.length === 0 ? { pointerEvents: 'none' } : {},
        ]}
        data={addressData}
        renderItem={({ item }) => (
          <ListItem
            onPress={event =>
              item.x &&
              item.y &&
              navigateToFilterSettingWithLocation(item.x, item.y)
            }>
            <ListItem.Content>
              <ListItem.Title>{item.place_name}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )}
      />
      <Map
        currentLocation={currentLocation}
        setMarkerLocation={setMarkerLocation}
        setMarkerVisible={setMarkerVisible}
      />
      {/* 위치 설정 버튼 */}
      {markerVisible && (
        <View style={styles.positionButton}>
          <Button
            radius={'sm'}
            type="solid"
            color={MyTheme.colors.primary}
            onPress={() => {
              setCurrentLocation({
                currentLongitude: Number(currentLocation?.currentLongitude),
                currentLatitude: Number(currentLocation?.currentLatitude),
              })
              navigation.navigate('FilterSetting', {
                location: {
                  longitude: Number(markerLocation?.lng),
                  latitude: Number(markerLocation?.lat),
                },
              })
            }}>
            <Icon name="search-location" color="white" type="font-awesome-5" />
            설정
          </Button>
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  searchBarContainer: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  flatList: {
    alignContent: 'center',
    position: 'absolute',
    top: Dimensions.get('window').height * 0.09,
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.2,
    zIndex: 1,
  },
  positionButton: {
    position: 'absolute',
    bottom: Dimensions.get('window').height * 0.2,
    right: 10,
    zIndex: 1,
    alignSelf: 'flex-end',
  },
})
export default MapSearch
