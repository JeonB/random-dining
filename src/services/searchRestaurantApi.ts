import { Alert, Linking } from 'react-native'
import * as Location from 'expo-location'
import Constants from 'expo-constants'
import { AppConfig } from 'app.config'
import { LocationTypes } from '@_types/restaurant'
import { RestaurantSearchQueryParamsType } from '@_types/queryParams'

const { KAKAO_RESTAPI_KEY } = Constants.expoConfig?.extra as AppConfig
const baseUrl = 'https://dapi.kakao.com/v2/local/search/keyword'
const restAPIkey = KAKAO_RESTAPI_KEY

const getLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync()
  if (status !== 'granted') {
    Alert.alert(
      '위치 권한이 필요합니다.',
      '설정 화면으로 이동하시겠습니까?',
      [
        {
          text: '아니오',
          style: 'cancel',
        },
        { text: '예', onPress: () => Linking.openSettings() },
      ],
      { cancelable: false },
    )
    return { latitude: undefined, longitude: undefined }
  }
  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Lowest,
  })

  return {
    latitude: location.coords.latitude.toString(),
    longitude: location.coords.longitude.toString(),
  }
}

export const handleData = async (keyword: string, sort: string) => {
  const allData: LocationTypes[] = []
  let page = 1

  const { latitude, longitude } = await getLocation()
  if (latitude && longitude) {
    const fetchDataAndUpdatePage = async () => {
      const data = await fetchData(keyword, latitude, longitude, page, sort)
      allData.push(...data.documents)
      page++
      return data
    }

    try {
      let data = await fetchDataAndUpdatePage()
      while (!data.meta.is_end && page < 4) {
        data = await fetchDataAndUpdatePage()
      }
    } catch (error) {
      console.error('에러 발생:', error)
    }
  }

  if (allData.length === 0) {
    Alert.alert('검색된 식당이 없습니다.')
    return
  }

  return allData
}

async function fetchData(
  query: string,
  latitude: string,
  longitude: string,
  page: number,
  sort: string,
) {
  const queryParams: RestaurantSearchQueryParamsType = {
    query,
    category_group_code: 'FD6',
    size: 15,
    page,
    sort: sort,
    x: longitude,
    y: latitude,
  }

  const queryString = toQueryString(queryParams)
  const url = `${baseUrl}?${queryString}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `KakaoAK ${restAPIkey}`,
    },
  })
  if (!response.ok) {
    throw new Error('Response 실패')
  }

  const data = await response.json()
  return data
}

function toQueryString(queryParams: RestaurantSearchQueryParamsType) {
  return Object.keys(queryParams)
    .map(
      key =>
        `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`,
    )
    .join('&')
}
