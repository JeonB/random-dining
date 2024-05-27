import { Button } from 'react-native-paper'
import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native'
import { getPositionByGeolocation } from '@_services/api'
import { RestaurantParamList } from '@_types/restaurantParamList'
import mainImage from '@_assetImages/main.png'
import { MyTheme } from 'theme'

const PositionSelector = () => {
  const navigation = useNavigation<NavigationProp<RestaurantParamList>>()
  const [isMapSearcButtonDisabled, setMapSearchButtonDisabled] = useState(false)
  const [isCurrentSearchButtonDisabled, setCurrentSearchButtonDisabled] =
    useState(false)
  const handleGetCurrentLocation = async () => {
    const { latitude, longitude } = await getPositionByGeolocation()
    if (!latitude || !longitude) {
      console.error('위도 또는 경도 값이 없습니다.')
      return
    }
    navigation.navigate('FilterSetting', {
      location: {
        latitude: latitude,
        longitude: longitude,
      },
    })
  }
  useFocusEffect(
    useCallback(() => {
      setMapSearchButtonDisabled(false)
      setCurrentSearchButtonDisabled(false)
    }, []),
  )
  return (
    <>
      <View style={styles.mediaContainer} testID="mediaContainer">
        <Image
          source={mainImage}
          style={{ width: '90%', height: '120%', marginBottom: 10 }}
          onError={({ nativeEvent: { error } }) => console.warn(error)}
        />
        <Button
          icon="map-marker"
          mode="contained"
          textColor="#fff"
          buttonColor={MyTheme.colors.primary}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          disabled={isCurrentSearchButtonDisabled}
          onPress={() => {
            handleGetCurrentLocation()
            setCurrentSearchButtonDisabled(true)
          }}>
          현재 위치에서 추천 받기
        </Button>
        <Button
          icon="map-search"
          mode="contained"
          textColor="#fff"
          buttonColor={MyTheme.colors.primary}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          disabled={isMapSearcButtonDisabled}
          onPress={() => {
            setMapSearchButtonDisabled(true)
            navigation.navigate('MapSearch')
          }}>
          지도에서 선택한 위치로 추천 받기
        </Button>
      </View>
    </>
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
    height: '20%',
    borderRadius: 10,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: MyTheme.colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
  },
  buttonLabel: {
    fontSize: 18,
  },
  inlineAd: {
    position: 'absolute',
    bottom: 10,
  },
})

export default PositionSelector
