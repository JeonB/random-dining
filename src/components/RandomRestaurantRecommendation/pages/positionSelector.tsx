import { Button } from 'react-native-paper'
import React, { useCallback, useEffect, useState } from 'react'
import { Image, StyleSheet, View, Platform, Alert, Linking } from 'react-native'
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native'
import { getPositionByGeolocation } from '@_services/api'
import { RestaurantParamList } from '@_types/restaurantParamList'
import mainImage from '@_assetImages/main.png'
import { MyTheme } from 'theme'
import { useStore } from 'src/components/common/utils/zustandStore'
const PositionSelector = () => {
  const navigation = useNavigation<NavigationProp<RestaurantParamList>>()
  const [isMapSearcButtonDisabled, setMapSearchButtonDisabled] = useState(false)
  const [isCurrentSearchButtonDisabled, setCurrentSearchButtonDisabled] =
    useState(false)
  const { setCurrentLocation } = useStore()
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
  const getCurrentLocation = async () => {
    try {
      const { longitude: currentLongitude, latitude: currentLatitude } =
        await getPositionByGeolocation()
      setCurrentLocation({
        currentLongitude,
        currentLatitude,
      })
    } catch (error) {
      console.error('위치 권한이 거부되었습니다.')
      // 사용자에게 알림을 표시하고 위치 권한 설정으로 이동
      Alert.alert(
        '위치 권한 필요',
        '이 기능을 사용하려면 위치 권한이 필요합니다. 설정으로 이동하시겠습니까?',
        [
          {
            text: '취소',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: '확인', onPress: () => Linking.openSettings() },
        ],
      )
    }
  }
  useEffect(() => {
    getCurrentLocation()
  }, [])
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
            setMapSearchButtonDisabled(true)
            navigation.navigate('MapSearch')
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
  },
})

export default PositionSelector
