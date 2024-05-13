import { Button } from 'react-native-paper'
import React, { useEffect } from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { getPositionByGeolocation } from '@_services/api'
import { RestaurantParamList } from '@_types/restaurantParamList'
import mainImage from '@_assetImages/main.png'
const PositionSelector = () => {
  const navigation = useNavigation<NavigationProp<RestaurantParamList>>()
  const handleGetCurrentLocation = async () => {
    const { latitude, longitude } = await getPositionByGeolocation()
    navigation.navigate('FilterSetting', {
      location: {
        latitude: latitude,
        longitude: longitude,
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
        현재 위치에서 추천 받기
      </Button>
      <Button
        icon="map-search"
        mode="contained"
        textColor="#272729"
        buttonColor="gainsboro"
        style={styles.button}
        onPress={() => navigation.navigate('MapSearch')}>
        지도에서 선택한 위치로 추천 받기
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
  },
  button: {
    marginTop: 10,
    width: '80%',
    borderRadius: 10,
    color: 'rgb(108, 109, 115)',
  },
})

export default PositionSelector
