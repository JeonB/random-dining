import React from 'react'
import { Alert } from 'react-native'
import {
  render,
  fireEvent,
  waitFor,
  RenderAPI,
  act,
} from '@testing-library/react-native'
import { NavigationContainer, NavigationProp } from '@react-navigation/native'

import { UserCustomList } from '@_userListPages/userCustomList'
import { RootStackParamList } from '@_types/listParamList'

jest.mock('@_userListPages/listManageIcon', () => {
  return {
    __esModule: true,
    ListManageIcon: () => {
      return null
    },
  }
})

jest.mock(
  '@_components/RandomRestaurantRecommendation/pages/RestaurantView/randomItemModal',
  () => {
    return jest.fn(() => null)
  },
)

jest.mock('@_userList/hook/useListNames', () => ({
  useListNames: () => ({
    listNames: ['List 1', 'List 2'],
    fetchListNames: jest.fn(),
  }),
}))

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(key => {
    if (key === 'listnames') {
      return Promise.resolve(JSON.stringify(['List 1', 'List 2']))
    } else if (key === 'List 1') {
      return Promise.resolve(JSON.stringify(['Item 1', 'Item 2']))
    } else if (key === 'List 2') {
      return Promise.resolve(null)
    }
  }),
}))

jest.mock('expo-linear-gradient', () => {
  return {
    LinearGradient: 'LinearGradient',
  }
})

const mockNavigation = {
  navigate: jest.fn(),
} as unknown as NavigationProp<RootStackParamList>
const navigation = {
  navigate: jest.fn(),
} as unknown as NavigationProp<RestaurantParamList>
describe('<UserCustomList />', () => {
  let alertSpy: jest.SpyInstance
  let utils: RenderAPI

  beforeEach(() => {
    alertSpy = jest.spyOn(Alert, 'alert')
    jest.clearAllMocks()
    utils = render(
      <NavigationContainer>
        <UserCustomList
          // restaurantNavigation={navigation}
          navigation={mockNavigation}
        />
      </NavigationContainer>,
    )
  })
  afterEach(() => {
    jest.clearAllTimers()
  })

  test('AsyncStorage.getItem 텍스트 렌더링', async () => {
    expect(utils.getByText('List 1')).toBeDefined()
    expect(utils.getByText('List 2')).toBeDefined()
  })

  test('데이터가 존재하는 리스트 클릭 시 handlePressItem 호출', async () => {
    act(() => {
      fireEvent.press(utils.getByText('List 1'))
    })
    // Alert.alert 호출되지 않았는지 확인
    await waitFor(() => expect(Alert.alert).not.toHaveBeenCalled())
  })

  test('데이터가 존재하지 않는 리스트 클릭 시 handlePressItem 호출', async () => {
    fireEvent.press(utils.getByText('List 2'))
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'List 2에 저장된 데이터가 없습니다.',
      )
    })
  })
})
