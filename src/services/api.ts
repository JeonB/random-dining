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
  const location = await Location.getLastKnownPositionAsync({})

  return {
    latitude: location ? location.coords.latitude : 0,
    longitude: location ? location.coords.longitude : 0,
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
    if (!response.ok) {
      console.error(`데이터를 불러오는데 실패했습니다: ${response.statusText}`)
      return null
    }
    const data = await response.json()
    if (!data || data.length === 0) {
      return null
    }
    return data
  } catch (error) {
    console.error('에러 발생:', error)
    return null
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
    if (data === null) {
      return null
    }
    allData.push(...data.documents)
    if (data.meta.is_end) {
      break
    }
    page++
  }

  return allData
}

// export const fetchRestaurantData = async (
//   categories: string[],
//   distanceRange: number,
//   longitude?: string,
//   latitude?: string,
// ) => {
//   let allData: LocationTypes[] | undefined = []
//   const randomCategory =
//     categories[Math.floor(Math.random() * categories.length)]

//   try {
//     allData = await fetchLocationData(
//       randomCategory,
//       longitude,
//       latitude,
//       'FD6',
//       distanceRange,
//     )
//   } catch (error) {
//     console.error('에러 발생:', error)
//   }

//   if (allData?.length === 0) {
//     Alert.alert('주변에 식당이 없습니다. 거리 범위를 조정해주세요.')
//     return
//   }

//   return allData
// }
export const fetchRestaurantData = async (
  categories: string[],
  distanceRange: number,
  longitude?: string,
  latitude?: string,
) => {
  try {
    const allDataPromises = categories.map(category =>
      fetchLocationData(category, longitude, latitude, 'FD6', distanceRange),
    )

    let allData = (await Promise.all(allDataPromises)).flat()
    allData = allData.filter((item): item is LocationTypes => item !== null)

    if (allData.length === 0) {
      Alert.alert(
        '주변에 식당이 없습니다. 거리 범위 또는 카테고리를 조정해주세요.',
      )
      return
    }

    return allData
  } catch (error) {
    console.error('에러 발생:', error)
  }
}
