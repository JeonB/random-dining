import { fetchRestaurantData, fetchLocationData } from './api'

jest.mock('./api')
jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(() => ({ status: 'granted' })),
  getCurrentPositionAsync: jest.fn(() => ({
    coords: {
      latitude: 37.5676859104888,
      longitude: 126.82597944995,
    },
  })),
  Accuracy: {
    Lowest: 'Lowest',
  },
}))
jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {
      KAKAO_JAVASCRIPT_KEY: '1234',
    },
  },
}))
describe('fetchRestaurantData', () => {
  it('fetches data for all categories', async () => {
    // Set up mock data
    const mockData = [
      { id: 1, name: 'Restaurant 1' },
      { id: 2, name: 'Restaurant 2' },
    ]

    // Mock the fetchLocationData function
    ;(fetchLocationData as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockData),
    )
    // Call the function with test data
    const categories = ['한식', '일식', '중식']
    const distanceRange = 50
    const longitude = '126.82597944995'
    const latitude = '37.5676859104888'
    const result = await fetchRestaurantData(
      categories,
      distanceRange,
      longitude,
      latitude,
    )

    // Check that the function was called once for each category
    expect(fetchLocationData).toHaveBeenCalledTimes(categories.length)

    // Check that the result is as expected
    expect(result).toEqual(mockData.concat(mockData, mockData))
  })
})
