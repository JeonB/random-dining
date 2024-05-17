import { Alert, Linking } from 'react-native'
import * as Location from 'expo-location'
import { QueryParamsType } from '@_types/queryParams'
import Constants from 'expo-constants'
import { AppConfig } from 'app.config'
import { LocationTypes } from '@_types/restaurant'

const { KAKAO_RESTAPI_KEY } = Constants.expoConfig?.extra as AppConfig
const baseUrl = 'https://dapi.kakao.com/v2/local/search/keyword'
const restAPIkey = KAKAO_RESTAPI_KEY

export const getPositionByGeolocation = async () => {
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
    return { latitude: 0, longitude: 0 }
  }
  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Lowest,
  })

  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  }
}

const createQueryString = (params: QueryParamsType) => {
  return Object.keys(params)
    .map(key => {
      const value = params[key]
      if (value !== undefined) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      }
      return ''
    })
    .join('&')
}

const fetchData = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${restAPIkey}`,
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('에러 발생:', error)
    throw new Error('Response 실패')
  }
}

export async function fetchLocationData(
  query: string,
  x?: string,
  y?: string,
  category_group_code?: string,
  radius?: number,
) {
  const allData: LocationTypes[] = []
  let page = 1
  while (page < 4) {
    const queryParams: QueryParamsType = {
      query,
      x,
      y,
      category_group_code,
      radius,
      size: 15,
      page,
    }
    const queryString = createQueryString(queryParams)
    const url = `${baseUrl}?${queryString}`
    const data = await fetchData(url)
    if (data.documents.length === 0) {
      Alert.alert('존재하지 않는 주소입니다.')
      return
    }
    allData.push(...data.documents)
    if (data.meta.is_end) {
      break
    }
    page++
  }
  return allData
}

export const fetchRestaurantData = async (
  categories: string[],
  distanceRange: number,
  longitude?: string,
  latitude?: string,
) => {
  let allData: LocationTypes[] | undefined = []
  const randomCategory =
    categories[Math.floor(Math.random() * categories.length)]

  try {
    allData = await fetchLocationData(
      randomCategory,
      longitude,
      latitude,
      'FD6',
      distanceRange,
    )
  } catch (error) {
    console.error('에러 발생:', error)
  }

  if (allData?.length === 0) {
    Alert.alert('주변에 식당이 없습니다. 거리 범위를 조정해주세요.')
    return
  }

  return allData
}

// export async function fetchData(
//   query: string,
//   page: number,
//   distanceRange: number,
// ) {
//   const { latitude, longitude } = await getLocationByGeolocation()

//   let results = []

//   if (latitude && longitude) {
//     results = await fetchSingleCategoryData(
//       query,
//       page,
//       latitude,
//       longitude,
//       distanceRange,
//     )
//   }

//   return results
// }

// async function fetchSingleCategoryData(
//   query: string,
//   page: number,
//   latitude: string,
//   longitude: string,
//   distanceRange: number,
// ) {
//   const queryParams: QueryParamsType = {
//     query,
//     x: longitude,
//     y: latitude,
//     category_group_code: 'FD6',
//     radius: distanceRange,
//     size: 15,
//     page,
//   }

//   const queryString = Object.keys(queryParams)
//     .map(
//       key =>
//         `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`,
//     )
//     .join('&')
//   const url = `${baseUrl}?${queryString}`
//   const response = await fetch(url, {
//     method: 'GET',
//     headers: {
//       Authorization: `KakaoAK ${restAPIkey}`,
//     },
//   })
//   if (!response.ok) {
//     throw new Error('Response 실패')
//   }

//   const data = await response.json()
//   return data
// }
