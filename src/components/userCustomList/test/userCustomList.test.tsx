import React from 'react'
import { Alert } from 'react-native'

import { act } from 'react-test-renderer'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'

import { UserCustomList } from '@_components/userCustomList/component/userCustomList'

jest.mock('@_components/userCustomList/hook/useListNames', () => ({
  useListNames: () => ({
    listNames: ['List 1', 'List 2'], // 테스트용 가짜 데이터
    fetchListNames: jest.fn(), // fetchListNames 함수의 동작은 테스트 대상이 아니므로 가짜 함수로 대체합니다
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

const mockNavigate = jest.fn()

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  }
})

const alertSpy = jest.spyOn(Alert, 'alert')

describe('<UserCustomList />', () => {
  test('AsyncStorage.getItem 텍스트 렌더링', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <UserCustomList />
      </NavigationContainer>,
    )

    await waitFor(() => {
      expect(getByText('List 1')).toBeDefined()
      expect(getByText('List 2')).toBeDefined()
    })
  })

  test('데이터가 존재하는 리스트 클릭 시 handlePressItem 호출', async () => {
    const { getByText, queryByTestId } = render(
      <NavigationContainer>
        <UserCustomList />
      </NavigationContainer>,
    )
    await Promise.resolve()
    act(() => {
      fireEvent.press(getByText('List 1'))
    })
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'List 1 random picker modal opened.',
      )
    })
  })

  test('데이터가 존재하지 않는 리스트 클릭 시 handlePressItem 호출', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <UserCustomList />
      </NavigationContainer>,
    )

    await Promise.resolve()
    act(() => {
      fireEvent.press(getByText('List 2'))
    })
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'List 2에 저장된 데이터가 없습니다.',
      )
    })
  })
})
