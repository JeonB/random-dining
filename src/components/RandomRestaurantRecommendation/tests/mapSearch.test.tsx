import React from 'react'
import { render } from '@testing-library/react-native'
import MapSearch from '../pages/MapSearch/mapSearch'
import { RestaurantProvider } from '@_components/common/context/restaurantProvider'
import { useNavigation } from '@react-navigation/native'
jest.mock('react-native-webview', () => {
  const { View } = require('react-native')
  return {
    WebView: (props: { testID: any; source: { html: any } }) => (
      <View testID={props.testID}>{props.source.html}</View>
    ),
  }
})
jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {
      KAKAO_JAVASCRIPT_KEY: '1234',
    },
  },
}))

jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(() =>
    Promise.resolve({ status: 'granted' }),
  ),
  getCurrentPositionAsync: jest.fn(() =>
    Promise.resolve({
      coords: {
        latitude: 37.7749,
        longitude: -122.4194,
      },
    }),
  ),
  Accuracy: {
    Lowest: 'lowest',
  },
}))

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
      // Add other navigation functions that you use
    }),
  }
})

describe('MapSearch 컴포넌트 테스트', () => {
  test('렌더링 테스트', () => {
    const { getByTestId } = render(
      <RestaurantProvider>
        <MapSearch />
      </RestaurantProvider>,
    )

    expect(getByTestId('map-search')).toBeTruthy()
  })
})
