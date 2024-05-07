import { Button } from 'react-native-paper'
import React, { useEffect } from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { getLocation } from '@_services/api'
import { RestaurantParamList } from '@_types/restaurantParamList'
import mainImage from '@_assetImages/main.png'
const PositionSelector = () => {
  const navigation = useNavigation<NavigationProp<RestaurantParamList>>()
  const handleGetCurrentLocation = async () => {
    const { latitude, longitude } = await getLocation()
    navigation.navigate('FilterSetting', {
      location: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
    })
  }
  return (
    <View style={styles.mediaContainer} testID="mediaContainer">
      <Image
        source={mainImage}
        style={{ width: '100%', height: '100%', marginBottom: 10 }}
        onError={({ nativeEvent: { error } }) => console.warn(error)}
      />
      <Button
        icon="map-marker"
        mode="contained"
        textColor="#272729"
        buttonColor="gainsboro"
        style={styles.button}
        onPress={handleGetCurrentLocation}>
        내 위치에서 찾기
      </Button>
      <Button
        icon="map-search"
        mode="contained"
        textColor="#272729"
        buttonColor="gainsboro"
        style={styles.button}
        onPress={() => navigation.navigate('MapSearch')}>
        지도에서 찾기
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  mediaContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 0.7,
    position: 'relative',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  button: {
    marginTop: 10,
    width: '90%',
    borderRadius: 10,
    color: 'rgb(108, 109, 115)',
  },
})

export default PositionSelector
