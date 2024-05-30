import { render, fireEvent } from '@testing-library/react-native'
import FilterSetting from '../pages/FilterSettings/filterSetting'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { RestaurantProvider } from '@_components/common/context/restaurantProvider'

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
describe('FilterSetting component', () => {
  test('렌더링 테스트', () => {
    render(
      <NavigationContainer>
        <RestaurantProvider>
          <FilterSetting />
        </RestaurantProvider>
      </NavigationContainer>,
    )
  })

  test('슬라이딩에 최소 최댓값 테스트', () => {
    const { getByTestId, getByText } = render(
      <NavigationContainer>
        <RestaurantProvider>
          <FilterSetting />
        </RestaurantProvider>
      </NavigationContainer>,
    )
    const sliderContainer = getByTestId('RNE__Slider_Container')
    const { accessibilityValue } = sliderContainer.props

    expect(accessibilityValue.min).toBe(30)
    expect(accessibilityValue.max).toBe(300)
  })

  test('슬라이더의 값 변경에 따른 현재값 테스트', () => {
    const { getByTestId, rerender } = render(
      <NavigationContainer>
        <RestaurantProvider>
          <FilterSetting />
        </RestaurantProvider>
      </NavigationContainer>,
    )
    const distanceSlider = getByTestId('RNE__Slider_Container')
    fireEvent(distanceSlider, 'onValueChange', 130)

    // 업데이트된 값 리레런더링
    rerender(
      <NavigationContainer>
        <RestaurantProvider>
          <FilterSetting />
        </RestaurantProvider>
      </NavigationContainer>,
    )

    const sliderContainer = getByTestId('RNE__Slider_Container')
    const { accessibilityValue } = sliderContainer.props

    // 현재값 130인지 확인
    expect(accessibilityValue.now).toBe(130)
  })
})
