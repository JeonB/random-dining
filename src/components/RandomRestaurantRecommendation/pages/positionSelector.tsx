import { Button } from 'react-native-paper'
import React, { useCallback, useState } from 'react'
import { Image, StyleSheet, View, Platform } from 'react-native'
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native'
import { getPositionByGeolocation } from '@_services/api'
import { RestaurantParamList } from '@_types'
import mainImage from '@_assetImages/main.png'
import { MyTheme } from 'theme'
import { useStore } from '@_common/utils/zustandStore'

const PositionSelector = () => {
  const navigation = useNavigation<NavigationProp<RestaurantParamList>>()
  const [isMapSearcButtonDisabled, setMapSearchButtonDisabled] = useState(false)
  const { setCurrentLocation } = useStore()
  const [isCurrentSearchButtonDisabled, setCurrentSearchButtonDisabled] =
    useState(false)

  const handleGetCurrentLocation = async () => {
    try {
      const { longitude: currentLongitude, latitude: currentLatitude } =
        await getPositionByGeolocation()

      if (!currentLongitude || !currentLatitude) {
        console.error(
          '기기가 좌표를 불러오지 못 하고 있습니다. 위치 설정 옵션을 확인해주세요.',
        )
        setCurrentSearchButtonDisabled(false)
        return
      }
      setCurrentLocation({
        currentLongitude,
        currentLatitude,
      })
      navigation.navigate('FilterSetting', {
        location: {
          latitude: currentLatitude,
          longitude: currentLongitude,
        },
      })
    } catch (error) {
      console.error('위치 권한이 거부되었습니다.')
    }
  }

  const handleGetCurrentLocationForMap = async () => {
    try {
      const { latitude, longitude } = await getPositionByGeolocation()
      if (!latitude || !longitude) {
        console.error(
          '기기가 좌표를 불러오지 못 하고 있습니다. 위치 설정 옵션을 확인해주세요.',
        )
        setMapSearchButtonDisabled(false)
        return
      }
      navigation.navigate('MapSearch', {
        location: { latitude, longitude },
      })
    } catch (error) {
      console.error('위치 정보를 가져오는 중 오류가 발생했습니다:', error)
      setMapSearchButtonDisabled(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      setMapSearchButtonDisabled(false)
      setCurrentSearchButtonDisabled(false)
    }, []),
  )

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.mediaContainer} testID="mediaContainer">
        <Image
          source={mainImage}
          style={styles.image}
          onError={({ nativeEvent: { error } }) => console.warn(error)}
        />
        <Button
          icon="map-marker"
          mode={Platform.OS === 'ios' ? 'contained' : 'elevated'}
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
          mode={Platform.OS === 'ios' ? 'contained' : 'elevated'}
          textColor="#fff"
          buttonColor={MyTheme.colors.primary}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          disabled={isMapSearcButtonDisabled}
          onPress={() => {
            handleGetCurrentLocationForMap()
            setMapSearchButtonDisabled(true)
          }}>
          지도에서 선택한 위치로 추천 받기
        </Button>
      </View>
    </View>
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
    width: Platform.select({
      ios: MyTheme.width * 330,
      android: MyTheme.width * 320,
    }),
    height: MyTheme.width * 280,
    marginBottom: MyTheme.width * 10,
  },
  button: {
    marginTop: MyTheme.width * 10,
    width: Platform.select({
      ios: MyTheme.width * 320,
      android: MyTheme.width * 310,
    }),
    height: Platform.select({
      ios: MyTheme.width * 45,
      android: MyTheme.width * 40,
    }),
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
    fontSize: Platform.select({
      ios: MyTheme.width * 18,
      android: MyTheme.width * 16,
    }),
    lineHeight: MyTheme.width * 23,
  },
})

export default PositionSelector
