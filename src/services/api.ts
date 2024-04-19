import { KAKAO_RESTAPI_KEY } from '@env';
import { Alert, Linking } from 'react-native';
import * as Location from 'expo-location';
import { QueryParamsType } from 'types/queryParams';

const baseUrl = 'https://dapi.kakao.com/v2/local/search/keyword';
const restAPIkey = KAKAO_RESTAPI_KEY;

async function getLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();
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
    );
    return { latitude: undefined, longitude: undefined };
  }
  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Lowest,
  });

  return {
    latitude: location.coords.latitude.toString(),
    longitude: location.coords.longitude.toString(),
  };
}

export async function fetchData(
  query: string,
  page: number,
  distanceRange: number,
) {
  const { latitude, longitude } = await getLocation();

  const defaultCategories = ['한식', '중식', '일식', '양식', '분식'];
  let results = [];

  if (!query && latitude && longitude) {
    for (let category of defaultCategories) {
      const result = await fetchSingleCategoryData(
        category,
        page,
        latitude,
        longitude,
        distanceRange,
      );
      results.push(result);
    }
  } else if (query && latitude && longitude) {
    results = await fetchSingleCategoryData(
      query,
      page,
      latitude,
      longitude,
      distanceRange,
    );
  }

  return results;
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
  };

  const queryString = Object.keys(queryParams)
    .map(
      key =>
        `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`,
    )
    .join('&');
  const url = `${baseUrl}?${queryString}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `KakaoAK ${restAPIkey}`,
    },
  });
  if (!response.ok) {
    throw new Error('Response 실패');
  }

  const data = await response.json();
  return data;
}
