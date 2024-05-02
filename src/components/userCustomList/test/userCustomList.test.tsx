import React from 'react'
import { Alert } from 'react-native'

import {
  render,
  fireEvent,
  waitFor,
  RenderAPI,
} from '@testing-library/react-native'
import { NavigationContainer, NavigationProp } from '@react-navigation/native'

import { UserCustomList } from '@_components/userCustomList/pages/userCustomList'
import { RootStackParamList } from '@_types/navigation'

jest.mock('@_components/userCustomList/hook/useListNames', () => ({
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

const navigation = {
  navigate: jest.fn(),
} as unknown as NavigationProp<RootStackParamList>

describe('<UserCustomList />', () => {
  let alertSpy: jest.SpyInstance
  let utils: RenderAPI

  beforeEach(() => {
    alertSpy = jest.spyOn(Alert, 'alert')
    jest.clearAllMocks()
    utils = render(
      <NavigationContainer>
        <UserCustomList navigation={navigation} />
      </NavigationContainer>,
    )
  })

  test('AsyncStorage.getItem 텍스트 렌더링', async () => {
    expect(utils.getByText('List 1')).toBeDefined()
    expect(utils.getByText('List 2')).toBeDefined()
  })

  test('데이터가 존재하는 리스트 클릭 시 handlePressItem 호출', async () => {
    fireEvent.press(utils.getByText('List 1'))
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'List 1 random picker modal opened.',
      )
    })
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
