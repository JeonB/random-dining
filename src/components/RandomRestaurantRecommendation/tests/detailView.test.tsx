import React from 'react'
import { render } from '@testing-library/react-native'
import { useRoute } from '@react-navigation/native'
import WebView from 'react-native-webview'
import DetailView from '../pages/RestaurantView/detailView'

jest.mock('react-native-webview', () => jest.fn())
jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
}))

describe('DetailView 컴포넌트 테스트', () => {
  test('webview렌더링 확인', () => {
    const testUrl = 'https://example.com'
    ;(useRoute as jest.Mock).mockReturnValue({ params: { url: testUrl } })

    render(<DetailView />)

    expect(WebView).toHaveBeenCalledWith(
      expect.objectContaining({
        source: { uri: testUrl },
      }),
      {},
    )
  })
})
