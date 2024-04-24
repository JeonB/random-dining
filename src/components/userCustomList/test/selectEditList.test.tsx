import React from 'react'
import { Alert } from 'react-native'

import { render, fireEvent, waitFor } from '@testing-library/react-native'
import { act } from 'react-test-renderer'

import { SelectEditList } from '@_components/userCustomList/component/selectEditList'

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(key => {
    if (key === 'listnames') {
      return Promise.resolve(JSON.stringify(['List 1', 'List 2'])) // listnames에 저장된 리스트 이름
    } else if (key === 'List 1') {
      return Promise.resolve(JSON.stringify(['Item 1', 'Item 2'])) // List 1에 저장된 아이템
    } else if (key === 'List 2') {
      return Promise.resolve(null) // List 2에 저장된 아이템 없음
    }
  }),
}))

const alertSpy = jest.spyOn(Alert, 'alert')

describe('<SelectEditList />', () => {
  test('AsyncStorage 리스트 렌더링', async () => {
    const { getByText } = render(<SelectEditList />)

    await waitFor(() => {
      expect(getByText('List 1')).toBeDefined()
      expect(getByText('List 2')).toBeDefined()
    })
  })

  test('리스트 선택 안내 메세지', async () => {
    const { getByText } = render(<SelectEditList />)

    expect(getByText('수정 할 리스트를 선택해주세요')).toBeDefined()
  })

  test('리스트 클릭시 네비게이션 호출', async () => {
    const { getByText } = render(<SelectEditList />)

    await Promise.resolve()

    act(() => {
      fireEvent.press(getByText('List 1'))
    })
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('수정 화면으로 이동')
    })
  })
})
