import { Button } from 'react-native-paper'
import React, { useCallback, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
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
          style={styles.image}
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
    width: MyTheme.width * 350,
    height: MyTheme.width * 800,
    position: 'relative',
    alignItems: 'center',
    alignSelf: 'center',
  },
  image: {
    width: '95%',
    height: MyTheme.width * 280,
    marginBottom: MyTheme.width * 10,
  },
  button: {
    marginTop: MyTheme.width * 10,
    width: MyTheme.width * 300,
    height: MyTheme.width * 40,
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
    fontSize: MyTheme.width * 16,
  },
  inlineAd: {
    position: 'absolute',
    bottom: 10,
  },
})

export default PositionSelector
