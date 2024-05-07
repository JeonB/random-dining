import { Alert } from 'react-native'
import { RestaurantSearchQueryParamsType } from '@_types/queryParams'
import Constants from 'expo-constants'
import { AppConfig } from 'app.config'
import { RestaurantTypes } from '@_types/restaurant'

const { KAKAO_RESTAPI_KEY } = Constants.expoConfig?.extra as AppConfig
const baseUrl = 'https://dapi.kakao.com/v2/local/search/keyword'
const restAPIkey = KAKAO_RESTAPI_KEY

export const handleData = async (keyword: string) => {
  const allData: RestaurantTypes[] = []
  let page = 1

  try {
    let data = await fetchData(keyword, page)

    while (!data.meta.is_end && page < 4) {
      allData.push(...data.documents)
      page++
      data = await fetchData(keyword, page)
    }
  } catch (error) {
    console.error('에러 발생:', error)
  }

  if (allData.length === 0) {
    Alert.alert('검색된 식당이 없습니다.')
    return
  }

  return allData
}

async function fetchData(query: string, page: number) {
  const queryParams: RestaurantSearchQueryParamsType = {
    query,
    category_group_code: 'FD6',
    size: 15,
    page,
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
