import { render, screen } from '@testing-library/react-native'
import React from 'react'
import { Map } from '../pages/map'
import { Restaurant } from 'src/types/restaurant'
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
// 초기 렌더링 테스트
const RestaurantInfo: Restaurant = {
  place_name: '봉이밥',
  distance: '1km',
  phone: '010-1234-5678',
  place_url: 'https://www.naver.com',
  x: '126.82597944995',
  y: '37.5676859104888',
  id: 0,
  category_name: '',
  created_at: '',
  updated_at: '',
}

describe('음식점 지도 렌더링 테스트', () => {
  test('Map 컴포넌트가 정상적으로 렌더링 되었는지 확인', () => {
    render(<Map info={RestaurantInfo} />)
    const map = screen.getByTestId('map')
    expect(map).toBeTruthy()
  })
  test('api키가 제대로 전달되었는지 확인', () => {
    const { getByTestId } = render(<Map info={RestaurantInfo} />)
    const webView = getByTestId('map')
    expect(webView.props.children).toContain(
      'https://dapi.kakao.com/v2/maps/sdk.js?appkey=1234',
    )
  })
  test('지도가 정상적으로 생성되었는지 확인', () => {
    const { getByTestId } = render(<Map info={RestaurantInfo} />)
    const webView = getByTestId('map')
    expect(webView.props.children).toContain(
      "const container = document.getElementById('map')",
    )
  })
})
