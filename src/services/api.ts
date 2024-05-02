import { Alert, Linking } from 'react-native'
import * as Location from 'expo-location'
import { QueryParamsType } from '@_types/queryParams'
import Constants from 'expo-constants'
import { AppConfig } from 'app.config'
import { RestaurantTypes } from '@_types/restaurant'

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
export const handleData = async (
  categories: string[],
  distanceRange: number,
) => {
  const allData: RestaurantTypes[] = []
  const randomCategory =
    categories[Math.floor(Math.random() * categories.length)]
  let page = 1
  const fetchDataAndUpdatePage = async () => {
    const data = await fetchData(randomCategory, page, distanceRange)
    allData.push(...data.documents)
    page++
    return data
  }

  try {
    let data = await fetchDataAndUpdatePage()

    // Kakao Local API는 최대 3페이지까지(45개) 데이터 제공
    while (!data.meta.is_end && page < 4) {
      data = await fetchDataAndUpdatePage()
    }
  } catch (error) {
    console.error('에러 발생:', error)
  }

  if (allData.length === 0) {
    Alert.alert('주변에 식당이 없습니다. 거리 범위를 조정해주세요.')
    return
  }

  return allData
}

export async function fetchData(
  query: string,
  page: number,
  distanceRange: number,
) {
  const { latitude, longitude } = await getLocation()

  let results = []

  if (latitude && longitude) {
    results = await fetchSingleCategoryData(
      query,
      page,
      latitude,
      longitude,
      distanceRange,
    )
  }

  return results
}

async function fetchSingleCategoryData(
  query: string,
  page: number,
  latitude: string,
  longitude: string,
  distanceRange: number,
) {
  const queryParams: QueryParamsType = {
    query,
    x: longitude,
    y: latitude,
    category_group_code: 'FD6',
    radius: distanceRange,
    size: 15,
    page,
  }

  const queryString = Object.keys(queryParams)
    .map(
      key =>
        `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`,
    )
    .join('&')
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
