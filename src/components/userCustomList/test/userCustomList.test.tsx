import React from 'react'
import { Alert } from 'react-native'

import { act } from 'react-test-renderer'
import { render, fireEvent, waitFor } from '@testing-library/react-native'

import { UserCustomList } from '@_components/userCustomList/component/userCustomList'

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

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  }
})

const alertSpy = jest.spyOn(Alert, 'alert')

describe('<UserCustomList />', () => {
  it('AsyncStorage.getItem 텍스트 렌더링', async () => {
    const { getByText } = render(<UserCustomList />)

    await waitFor(() => {
      expect(getByText('List 1')).toBeDefined()
      expect(getByText('List 2')).toBeDefined()
    })
  })

  it('데이터가 존재하는 리스트 클릭 시 handlePressItem 호출', async () => {
    const { getByText, queryByTestId } = render(<UserCustomList />)

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

  it('데이터가 존재하지 않는 리스트 클릭 시 handlePressItem 호출', async () => {
    const { getByText } = render(<UserCustomList />)

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
