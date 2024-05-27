import { Button } from 'react-native-paper'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  View,
  PermissionsAndroid,
  Alert,
  Linking,
} from 'react-native'
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native'
import { getPositionByGeolocation } from '@_services/api'
import { RestaurantParamList } from '@_types/restaurantParamList'
import mainImage from '@_assetImages/main.png'
import { MyTheme } from 'theme'
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions'

const PositionSelector = () => {
  const navigation = useNavigation<NavigationProp<RestaurantParamList>>()
  const [isMapSearcButtonDisabled, setMapSearchButtonDisabled] = useState(false)
  const [isCurrentSearchButtonDisabled, setCurrentSearchButtonDisabled] =
    useState(false)
  const handleGetCurrentLocation = async () => {
    // 위치 권한 확인
    let permissionGranted = false
    if (Platform.OS === 'ios') {
      const res = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      if (res === RESULTS.GRANTED) {
        permissionGranted = true
      } else {
        const requestRes = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        if (requestRes === RESULTS.GRANTED) {
          permissionGranted = true
        }
      }
    } else {
      const res = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )
      if (res) {
        permissionGranted = true
      } else {
        const requestRes = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        )
        if (requestRes === PermissionsAndroid.RESULTS.GRANTED) {
          permissionGranted = true
        }
      }
    }

    // 권한이 허용된 경우에만 위치 정보를 가져옴
    if (permissionGranted) {
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
    } else {
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
})

export default PositionSelector
